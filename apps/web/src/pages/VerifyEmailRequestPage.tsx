import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { api, isApiError } from '@/lib/api';
import { cn } from '@/lib/cn';
import { logout } from '@/lib/logout';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

type VerifyEmailFormInput = z.infer<typeof schema>;

function VerifyEmailPage(): React.ReactElement {
  const { t } = useTranslation('auth', { keyPrefix: 'verify-email' });
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
      toast.success(t('ok'));
    } catch (err) {
      if (isApiError(err)) {
        toast.error(err.data.message);
      }
    }
  };

  if (user && user.emailVerified) {
    return <Navigate to="/home" />;
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-2xl">{t('title')}</h1>
      <div className="mt-8 max-w-sm text-center">{t('info')}</div>

      <form
        className={cn('mt-8 flex w-full max-w-md flex-col')}
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

        <Button
          appearance="red"
          className="mt-8"
        >
          {t('btn')}
        </Button>

        <Button
          appearance="red"
          className="mt-2"
          type="button"
          onClick={() => logout()}
        >
          {t('logout')}
        </Button>
      </form>
    </main>
  );
}

export default VerifyEmailPage;
