import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { api } from '@/lib/api';
import {
  AuthActivity,
  GetAuthActivitiesResponse,
  TPaginatedResponse,
} from '@/lib/dto';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

function Line({
  title,
  text,
}: {
  title: string;
  text: string;
}): React.ReactElement {
  return (
    <div className="grid grid-cols-12">
      <div className="font-bold col-span-2">{title}:</div>
      <span className="col-span-10">{text === '' ? '-' : text}</span>
    </div>
  );
}

function Card({ activity }: { activity: AuthActivity }): React.ReactElement {
  return (
    <div className="border border-midnight rounded px-4 py-2 text-midnight font-sans lining-nums text-sm flex space-x-8">
      <div className="flex items-center">
        {activity.success && <CheckIcon className="size-8 text-green-500" />}
        {!activity.success && <XMarkIcon className="size-8 text-red-500" />}
      </div>
      <div className="space-y-2 w-full">
        <Line
          title="Date"
          text={new Date(activity.createdAt).toLocaleString()}
        />

        <Line
          title="IP Address"
          text={activity.ipAddress}
        />

        <Line
          title="User Agent"
          text={activity.userAgent}
        />

        <Line
          title="Location"
          text={activity.location}
        />

        <Line
          title="Success"
          text={activity.success ? 'True' : 'False'}
        />

        <Line
          title="Activity ID"
          text={activity.id}
        />
      </div>
    </div>
  );
}

function AuthActivitiesTab(): React.ReactElement {
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
      <h2 className="text-2xl font-semibold">Auth Activities</h2>
      <hr className="w-full h-[2px] bg-black" />

      {query.isLoading && (
        <div className="flex justify-center items-center my-16">
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
      <div className="flex items-center justify-center space-x-4 my-16">
        <Button
          appearance="sky"
          className="max-w-48 flex items-center justify-center space-x-2"
          disabled={page === 1}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          <ArrowLeftIcon className="size-6 text-white" />
          <span>Previous</span>
        </Button>
        <Button
          appearance="sky"
          className="max-w-48 flex items-center justify-center space-x-2"
          disabled={query.data?.pagination.totalPages === page}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          <span>Next</span>
          <ArrowRightIcon className="size-6 text-white" />
        </Button>
      </div>
    </div>
  );
}

export default AuthActivitiesTab;
