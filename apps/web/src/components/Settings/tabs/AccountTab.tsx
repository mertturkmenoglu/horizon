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

        <div className="mt-8 space-y-2">
          <a
            href="/apply-business"
            className="block text-midnight font-semibold group"
          >
            Apply for a{' '}
            <span className="text-sky-500 group-hover:underline">
              business account
            </span>
            .
          </a>
          <a
            href="/apply-verified"
            className="block text-midnight font-semibold group"
          >
            Apply for a{' '}
            <span className="text-sky-500 group-hover:underline">
              verified account
            </span>
            .
          </a>
        </div>
      </div>
    </div>
  );
}

export default AccountTab;
