import AppMessage from '@/components/blocks/app-message';
import { Separator } from '@/components/ui/separator';
import api from '@/lib/api';
import { getAuthCookie } from '@/lib/auth';
import { GetUserProfileByUsernameResponseDto } from '@/lib/dto';
import Header from './_components/header';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: {
    username: string;
  };
};

async function getUserProfileByUsername(username: string) {
  const res = await api
    .get(`users/${username}`, {
      headers: {
        ...getAuthCookie(),
      },
    })
    .json<{ data: GetUserProfileByUsernameResponseDto }>();
  return res.data;
}

export default async function Page({ params: { username } }: Props) {
  const user = await getUserProfileByUsername(username);

  return (
    <div className="container my-16">
      <Header user={user} />
      <Separator className="my-4" />
      <AppMessage
        emptyMessage="Nothing here"
        className="my-16"
      />
    </div>
  );
}
