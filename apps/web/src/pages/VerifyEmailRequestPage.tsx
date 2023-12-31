import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { api, isApiError } from '@/lib/api';
import { cn } from '@/lib/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

type VerifyEmailFormInput = z.infer<typeof schema>;

function VerifyEmailPage(): React.ReactElement {
  const { user } = useAuth();
  const { register, formState, handleSubmit } = useForm<VerifyEmailFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<VerifyEmailFormInput> = async (values) => {
    try {
      await api('/auth/email/verify/send', {
        method: 'POST',
        body: values,
      });
      toast.success('Please check your inbox.');
    } catch (err) {
      if (isApiError(err)) {
        toast.error(err.data.message, { className: 'error' });
      }
    }
  };

  if (user && user.emailVerified) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <h1 className="text-2xl">Verify Your Email</h1>
      <div className="mt-8 max-w-sm text-center">
        Before you start using <span>Horizon</span>, you need to verify your
        email address.
      </div>

      <form
        className={cn('flex flex-col max-w-md w-full mt-8')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          autoComplete="username"
          error={formState.errors.email}
          {...register('email')}
        />

        <Button
          appearance="red"
          className="mt-8"
        >
          Send Verification Email
        </Button>
      </form>
    </div>
  );
}

export default VerifyEmailPage;
