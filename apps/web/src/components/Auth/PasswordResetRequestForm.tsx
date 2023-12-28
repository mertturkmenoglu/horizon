import { cn } from '@/lib/cn';
import Redirect from './Redirect';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input';

interface PasswordResetRequestFormProps {
  className?: string;
}

const schema = z.object({
  email: z.string().email(),
});

type PasswordResetRequestFormInput = z.infer<typeof schema>;

function PasswordResetRequestForm({
  className,
}: PasswordResetRequestFormProps): React.ReactElement {
  const { register, formState, handleSubmit } =
    useForm<PasswordResetRequestFormInput>({
      resolver: zodResolver(schema),
    });

  const onSubmit: SubmitHandler<PasswordResetRequestFormInput> = (values) => {
    console.log({ values });
  };

  return (
    <form
      className={cn('flex flex-col', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        We will send you an email with instructions to reset your password.
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        autoComplete="username"
        className="mt-8"
        error={formState.errors.email}
        {...register('email')}
      />

      <Redirect
        className="mt-8"
        href="/login"
        text="If you have an account"
        targetText="Login"
      />

      <Redirect
        className="mt-1"
        href="/register"
        text="If you are new"
        targetText="Create Account"
      />

      <button
        className={cn(
          'bg-red-700 rounded text-white',
          'font-bold py-2 mt-8',
          'focus:ring focus:ring-red-700 focus:outline-none focus:ring-offset-2'
        )}
      >
        Send Email
      </button>
    </form>
  );
}

export default PasswordResetRequestForm;
