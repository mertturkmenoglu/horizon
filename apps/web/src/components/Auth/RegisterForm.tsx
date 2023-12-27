import { cn } from '@/lib/cn';
import Redirect from './Redirect';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input';

interface RegisterFormProps {
  className?: string;
}

const schema = z.object({
  name: z.string().min(1).max(64),
  email: z.string().email(),
  username: z.string().min(1).max(32),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

type RegisterFormInput = z.infer<typeof schema>;

function RegisterForm({ className }: RegisterFormProps): React.ReactElement {
  const { register, formState, handleSubmit } = useForm<RegisterFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormInput> = (
    values: RegisterFormInput
  ) => {
    console.log({ values });
  };

  return (
    <form
      className={cn('flex flex-col', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Name"
        type="text"
        placeholder="Name"
        autoComplete="name"
        error={formState.errors.name}
        {...register('name')}
      />

      <Input
        className="mt-4"
        label="Email"
        type="email"
        placeholder="Email"
        autoComplete="username"
        error={formState.errors.email}
        {...register('email')}
      />

      <Input
        className="mt-4"
        label="Username"
        type="text"
        placeholder="Username"
        error={formState.errors.username}
        {...register('username')}
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

      <Input
        className="mt-4"
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        autoComplete="current-password"
        error={formState.errors.confirmPassword}
        {...register('confirmPassword')}
      />

      <Redirect
        className="mt-8"
        href="/login"
        text="If you have an account"
        targetText="Login"
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
        Register
      </button>
    </form>
  );
}

export default RegisterForm;