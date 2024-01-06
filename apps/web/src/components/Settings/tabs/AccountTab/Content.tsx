import Button from '@/components/Button';
import Input from '@/components/Input';
import { api, isApiError } from '@/lib/api';
import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
  user: GetMeResponse;
};

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(64),
  confirmPassword: z.string().min(8).max(64),
});

type ChangePasswordFormInput = z.infer<typeof schema>;

function Content({ user }: Props): React.ReactElement {
  const { register, formState, handleSubmit } =
    useForm<ChangePasswordFormInput>({
      resolver: zodResolver(schema),
    });

  const onSubmit: SubmitHandler<ChangePasswordFormInput> = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await api('/auth/password/change', {
        method: 'PUT',
        body: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      });
      toast.success('Password changed successfully!');
    } catch (err) {
      if (isApiError(err)) {
        toast.error(err.data.message);
      }
    }
  };

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

      <h2 className="text-2xl font-semibold mt-8">Change Password</h2>
      <hr className="w-full h-[2px] bg-black" />

      <form
        className="max-w-lg mt-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="mt-4"
          label="Current Password"
          type="password"
          placeholder="Current Password"
          autoComplete="current-password"
          error={formState.errors.currentPassword}
          {...register('currentPassword')}
        />

        <Input
          className="mt-4"
          label="New Password"
          type="password"
          placeholder="New Password"
          autoComplete="new-password"
          error={formState.errors.newPassword}
          {...register('newPassword')}
        />

        <Input
          className="mt-4"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          error={formState.errors.confirmPassword}
          {...register('confirmPassword')}
        />

        <Button
          appearance="sky"
          className="mt-4 max-w-64 self-end"
          type="submit"
        >
          Change Password
        </Button>
      </form>
    </div>
  );
}

export default Content;
