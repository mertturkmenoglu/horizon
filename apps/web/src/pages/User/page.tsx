import UserInfoCard from '@/components/UserInfoCard';
import MainLayout from '@/layouts/MainLayout';
import { GetUserByUsernameResponse } from '@/lib/dto';
import Services from './components/Services';

type Props = {
  user: GetUserByUsernameResponse;
};

function UserPage({ user }: Props): React.ReactElement {
  return (
    <MainLayout>
      <div className="">
        <div className="">
          <UserInfoCard
            user={user}
            className="mt-8"
          />
        </div>
        <Services username={user.username} />
      </div>
    </MainLayout>
  );
}

export default UserPage;
