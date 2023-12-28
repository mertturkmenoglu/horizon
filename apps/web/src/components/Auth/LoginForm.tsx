import { cn } from '@/lib/cn';
import Redirect from './Redirect';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input';
import { api, isApiError } from '@/lib/api';
import { toast } from 'sonner';

interface LoginFormProps {
  className?: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormInput = z.infer<typeof schema>;

function LoginForm({ className }: LoginFormProps): React.ReactElement {
  const { register, formState, handleSubmit } = useForm<LoginFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (
    values: LoginFormInput
  ) => {
    try {
      await api('/auth/login', {
        method: 'POST',
        body: values,
      });
      window.location.href = '/home';
    } catch (err) {
      if (isApiError(err)) {
        toast.error(err.data.message, { className: 'error' });
      }
    }
  };

  return (
    <form
      className={cn('flex flex-col', className)}
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

      <Input
        className="mt-4"
        label="Password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        error={formState.errors.password}
        {...register('password')}
      />

      <Redirect
        className="mt-8"
        href="/register"
        text="If you are new"
        targetText="Create Account"
      />

      <Redirect
        className="mt-1"
        href="/reset-password"
        text="Forgot password?"
        targetText="Reset"
      />

      <button
        className={cn(
          'bg-red-700 rounded text-white',
          'font-bold py-2 mt-8',
          'focus:ring focus:ring-red-700 focus:outline-none focus:ring-offset-2'
        )}
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
