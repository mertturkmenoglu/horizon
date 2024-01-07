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
  const { t } = useTranslation('auth');

  const { register, formState, handleSubmit } =
    useForm<PasswordResetRequestFormInput>({
      resolver: zodResolver(schema),
    });

  const onSubmit: SubmitHandler<PasswordResetRequestFormInput> = async (
    values
  ) => {
    try {
      await api('/auth/password/reset/send', {
        method: 'POST',
        body: values,
      });
      toast.success(t('password-reset.success'));
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
      <div>{t('password-reset.info')}</div>
      <Input
        label={t('email')}
        type="email"
        placeholder={t('email')}
        autoComplete="username"
        className="mt-8"
        error={formState.errors.email}
        {...register('email')}
      />

      <Redirect
        className="mt-8"
        href="/login"
        text={t('if-account')}
        targetText={t('if-account-login')}
      />

      <Redirect
        className="mt-1"
        href="/register"
        text={t('if-new')}
        targetText={t('create-account')}
      />

      <Button
        appearance="red"
        className="mt-8"
      >
        {t('send-email')}
      </Button>
    </form>
  );
}

export default PasswordResetRequestForm;
