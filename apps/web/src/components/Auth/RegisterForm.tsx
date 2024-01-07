import { cn } from '@/lib/cn';
import Redirect from './Redirect';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input';
import { api, isApiError } from '@/lib/api';
import { toast } from 'sonner';
import Button from '../Button';
import { useTranslation } from 'react-i18next';

interface RegisterFormProps {
  className?: string;
}

const schema = z.object({
  name: z.string().min(1).max(64),
  email: z.string().email(),
  username: z.string().min(1).max(32),
  password: z.string().min(8).max(64),
  confirmPassword: z.string().min(8).max(64),
});

type RegisterFormInput = z.infer<typeof schema>;

function RegisterForm({ className }: RegisterFormProps): React.ReactElement {
  const { t } = useTranslation('auth');
  const { register, formState, handleSubmit } = useForm<RegisterFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormInput> = async (
    values: RegisterFormInput
  ) => {
    if (values.password !== values.confirmPassword) {
      toast.error(t('passwords-dont-match'));
      return;
    }

    try {
      await api('/auth/register', {
        method: 'POST',
        body: {
          email: values.email,
          username: values.username,
          name: values.name,
          password: values.password,
        },
      });

      toast.success(t('register-success'));

      setTimeout(() => {
        window.location.href = '/login';
        return;
      }, 2000);
    } catch (err) {
      if (isApiError(err)) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <form
      className={cn('flex flex-col', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label={t('name')}
        type="text"
        placeholder={t('name')}
        autoComplete="name"
        error={formState.errors.name}
        {...register('name')}
      />

      <Input
        className="mt-4"
        label={t('email')}
        type="email"
        placeholder={t('email')}
        autoComplete="username"
        error={formState.errors.email}
        {...register('email')}
      />

      <Input
        className="mt-4"
        label={t('username')}
        type="text"
        placeholder={t('username')}
        error={formState.errors.username}
        {...register('username')}
      />

      <Input
        className="mt-4"
        label={t('password')}
        type="password"
        placeholder={t('password')}
        autoComplete="current-password"
        error={formState.errors.password}
        {...register('password')}
      />

      <Input
        className="mt-4"
        label={t('confirm-password')}
        type="password"
        placeholder={t('confirm-password')}
        autoComplete="current-password"
        error={formState.errors.confirmPassword}
        {...register('confirmPassword')}
      />

      <Redirect
        className="mt-8"
        href="/login"
        text={t('if-account')}
        targetText={t('if-account-login')}
      />

      <Redirect
        className="mt-1"
        href="/reset-password"
        text={t('forgot')}
        targetText={t('reset')}
      />

      <Button
        appearance="red"
        className="mt-8"
      >
        {t('register')}
      </Button>
    </form>
  );
}

export default RegisterForm;
