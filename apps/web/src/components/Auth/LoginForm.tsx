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

interface LoginFormProps {
  className?: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormInput = z.infer<typeof schema>;

function LoginForm({ className }: LoginFormProps): React.ReactElement {
  const { t } = useTranslation('auth');
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
        label={t('email')}
        type="email"
        placeholder={t('email')}
        autoComplete="username"
        error={formState.errors.email}
        {...register('email')}
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

      <Redirect
        className="mt-8"
        href="/register"
        text={t('if-new')}
        targetText={t('create-account')}
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
        {t('login')}
      </Button>
    </form>
  );
}

export default LoginForm;
