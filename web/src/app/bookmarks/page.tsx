'use client';

import AppMessage from '@/components/blocks/app-message';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/api';
import { BookmarksResponseItemDto, Pagination } from '@/lib/dto';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import BookmarkCard from './_components/bookmark-card';

async function getBookmarks(page: number) {
  const res = await api.get(`bookmarks/?page=${page}`).json<{
    data: BookmarksResponseItemDto[];
    pagination: Pagination;
  }>();
  return res;
}

export default function Page() {
  const query = useInfiniteQuery({
    queryKey: ['bookmarks'],
    queryFn: ({ pageParam }) => getBookmarks(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : null,
  });

  const isEmpty = query.data?.pages[0]?.data.length === 0;

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton
            className="h-32 w-full"
            key={i}
          />
        ))}
      </div>
    );
  }

  if (query.isError) {
    throw query.error;
  }

  if (isEmpty) {
    return (
      <AppMessage
        emptyMessage="You haven't bookmarked any services yet."
        className="mx-auto my-16"
        showBackButton={false}
      />
    );
  }

  return (
    <div className="mt-8">
      {query.data && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {query.data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((bookmark) => (
                <Link
                  href={`/services/${bookmark.hserviceId}`}
                  key={bookmark.hserviceId}
                  className="block"
                >
                  <BookmarkCard bookmark={bookmark} />
                </Link>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
      {query.hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => query.fetchNextPage()}
            disabled={!query.hasNextPage || query.isFetchingNextPage}
          >
            {query.isFetchingNextPage
              ? 'Loading more...'
              : query.hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
          </Button>
        </div>
      )}
    </div>
  );
}
