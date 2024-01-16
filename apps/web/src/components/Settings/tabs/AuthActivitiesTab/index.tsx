import Pagination from '@/components/Pagination';
import Spinner from '@/components/Spinner';
import { api } from '@/lib/api';
import { GetAuthActivitiesResponse, TPaginatedResponse } from '@/lib/dto';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './Card';

function AuthActivitiesTab(): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'auth-activity' });
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ['auth-activity', page],
    queryFn: async () => {
      return api<TPaginatedResponse<GetAuthActivitiesResponse>>(
        `/auth/activities?page=${page}&pageSize=10`
      );
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <hr className="h-[2px] w-full bg-black" />

      {query.isLoading && (
        <div className="my-16 flex items-center justify-center">
          <Spinner className="size-12" />
        </div>
      )}

      {query.data && (
        <div className="mt-4 space-y-4">
          {query.data.data.map((activity) => (
            <Card
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>
      )}

      <Pagination
        className="mt-16"
        page={page}
        setPage={setPage}
        total={query.data?.pagination.totalPages ?? 0}
      />
    </div>
  );
}

export default AuthActivitiesTab;
