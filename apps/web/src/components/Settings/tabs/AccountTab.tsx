import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';

function AccountTab(): React.ReactElement {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Account Settings</h2>
      <hr className="w-full h-[2px] bg-black" />

      <div className="max-w-lg mt-4">
        <Input
          label="Account ID"
          value={user.id}
          hint="This is your unique account ID."
          disabled
        />

        <Input
          label="Email"
          value={user.email}
          className="mt-4"
          hint="You cannot change your email address."
          disabled
        />

        <Input
          label="Username"
          value={user.username}
          className="mt-4"
          hint="You cannot change your username."
          disabled
        />
      </div>
    </div>
  );
}

export default AccountTab;
