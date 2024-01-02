import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';
import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { GetUserByUsernameResponse } from '@/lib/dto';
import {
  BuildingStorefrontIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  HomeIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

function UserPageContainer(): React.ReactElement {
  const { username } = useParams();

  const userQuery = useQuery({
    queryKey: ['user', username],
    enabled: username !== undefined,
    queryFn: async () => {
      const res = await api<{ data: GetUserByUsernameResponse }>(
        `/users/${username}`
      );
      return res.data;
    },
  });

  if (
    username === undefined ||
    userQuery.isError ||
    (!userQuery.isLoading && !userQuery.data)
  ) {
    return <Navigate to="/not-found" />;
  }

  if (userQuery.isLoading) {
    return (
      <MainLayout>
        <div>loading</div>
      </MainLayout>
    );
  }

  return <>{userQuery.data && <UserPage user={userQuery.data} />}</>;
}

interface UserPageProps {
  user: GetUserByUsernameResponse;
}

interface InfoProps {
  icon: TwIcon;
  text: string;
  className?: string;
  show: boolean;
}

function Info(props: InfoProps): React.ReactElement {
  if (!props.show) {
    return <></>;
  }

  return (
    <div className={cn('w-full flex items-start space-x-2', props.className)}>
      <props.icon className="size-6 min-w-6 min-h-6 text-sky-600" />
      <div className="text-sm text-wrap wrap break-all">{props.text}</div>
    </div>
  );
}

function UserPage({ user }: UserPageProps): React.ReactElement {
  const { user: authUser } = useAuth();
  const image = useMemo(() => {
    return user.profileImage !== '' ? user.profileImage : '/user.jpg';
  }, [user.profileImage]);

  const description = useMemo(() => {
    return user.description !== '' ? user.description : 'No description';
  }, [user.description]);

  const location = useMemo(() => {
    if (user.location.city === '' || user.location.city === '') {
      return '';
    }

    return `${user.location.city}, ${user.location.country}`;
  }, [user.location]);

  const isThisUser = useMemo(() => {
    return user.id === authUser?.id;
  }, [user, authUser]);

  return (
    <MainLayout>
      <div className="grid grid-cols-12 mt-8">
        <div className="col-span-12 lg:col-span-3 p-4 flex flex-col items-center">
          <img
            src={image}
            alt="Profile Image"
            className="size-32 rounded-full ring ring-offset-2 ring-sky-500 mt-8"
          />
          <div className="mt-4 text-midnight font-semibold text-xl w-full">
            {user.name}
          </div>
          <div className="text-midnight/70 font-semibold text-sm w-full">
            @{user.username}
          </div>
          <div className="border-y border-y-midnight/50 mt-2 py-2 w-full">
            <div className="text-sm">{description}</div>
          </div>

          <Info
            icon={BuildingStorefrontIcon}
            text="Business Account"
            className="mt-2"
            show={user.isBusinessAccount}
          />

          <Info
            icon={CheckBadgeIcon}
            text="Verified Account"
            className="mt-2"
            show={user.isVerifiedAccount}
          />

          <Info
            icon={MapPinIcon}
            text={location}
            className="mt-2"
            show={location !== ''}
          />

          <Info
            icon={EnvelopeIcon}
            text={user.contactInformation.email}
            className="mt-2"
            show={user.contactInformation.email !== ''}
          />

          <Info
            icon={PhoneIcon}
            text={user.contactInformation.phone}
            className="mt-2"
            show={user.contactInformation.phone !== ''}
          />

          <Info
            icon={HomeIcon}
            text={user.contactInformation.address}
            className="mt-2"
            show={user.contactInformation.address !== ''}
          />

          <Info
            icon={LinkIcon}
            text={user.contactInformation.other}
            className="mt-2"
            show={user.contactInformation.other !== ''}
          />

          <Info
            icon={SquaresPlusIcon}
            text="0 services"
            className="mt-2"
            show={true}
          />

          {isThisUser && (
            <Button
              appearance="sky"
              className="mt-4 py-1 flex space-x-2 justify-center items-center"
            >
              <PencilIcon className="size-5 text-white" />
              <span>Edit</span>
            </Button>
          )}

          {!isThisUser && (
            <Button
              appearance="sky"
              className="mt-4 py-1 flex space-x-2 justify-center items-center"
            >
              <EnvelopeIcon className="size-5 text-white" />
              <span>Message</span>
            </Button>
          )}
          <a
            href="/report"
            className="w-full text-sm mt-2 hover:underline text-midnight/70"
          >
            Block or report
          </a>
        </div>
        <div className="col-span-12 lg:col-span-9 border-l border-l-midnight p-4">
          <div className="flex flex-col justify-center items-center h-full">
            <SquaresPlusIcon className="size-12 text-sky-600" />
            <div className="mt-2 text-2xl text-midnight/70">
              Oops! It looks like there's nothing here.
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserPageContainer;
