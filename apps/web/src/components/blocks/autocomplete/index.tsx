'use client';

import CustomSearchBox from '@/components/blocks/custom-search-box';
import { Button } from '@/components/ui/button';
import {
  UseAutocompleteProps,
  useAutocomplete,
} from '@/hooks/use-autocomplete';
import { getCategoryTitle } from '@/lib/categories';
import Link from 'next/link';
import Card from './card';

export function Autocomplete(props: UseAutocompleteProps) {
  const { indices, currentRefinement } = useAutocomplete(props);
  const hits = indices[0].hits;

  const showDropdown = currentRefinement !== '';
  const isEmptyResult = hits.length === 0;

  return (
    <div className="w-full">
      <div className="text-sm leading-none tracking-tight">
        Need more power? Try our{' '}
        <Button
          variant="link"
          className="px-0 underline"
          asChild
        >
          <Link href="/search">Advanced Search</Link>
        </Button>
      </div>
      <CustomSearchBox isSearchOnType={true} />

      {showDropdown && (
        <div className="my-2 rounded-lg border border-border">
          {hits.slice(0, 5).map((hit) => (
            <Card
              key={hit.id}
              id={hit.id}
              image={hit.media.data[0].url}
              name={hit.title}
              categoryName={getCategoryTitle(hit.category)}
              user={{
                id: hit.user.id,
                fullName: hit.user.fullName,
                username: hit.user.username,
                profileImage: hit.user.profileImage,
              }}
            />
          ))}

          {!isEmptyResult && (
            <Button
              asChild
              variant="link"
            >
              <Link href={`/search?hservices%5Bquery%5D=${currentRefinement}`}>
                See all results
              </Link>
            </Button>
          )}

          {isEmptyResult && (
            <Button
              asChild
              variant="link"
            >
              <Link href="/search">
                No results found. Try our advanced search
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
