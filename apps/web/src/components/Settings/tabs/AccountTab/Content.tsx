import Button from '@/components/Button';
import Input from '@/components/Input';
import { api, isApiError } from '@/lib/api';
import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
  const { t } = useTranslation('settings', { keyPrefix: 'account' });
  const { register, formState, handleSubmit } =
    useForm<ChangePasswordFormInput>({
      resolver: zodResolver(schema),
    });

  const onSubmit: SubmitHandler<ChangePasswordFormInput> = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error(t('password-dont-match'));
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
      toast.success(t('password-change-success'));
    } catch (err) {
      if (isApiError(err)) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <hr className="h-[2px] w-full bg-black" />

      <div className="mt-4 max-w-lg">
        <Input
          label={t('account-id')}
          value={user.id}
          hint={t('account-id-hint')}
          disabled
        />

        <Input
          label={t('email')}
          value={user.email}
          className="mt-4"
          hint={t('email-hint')}
          disabled
        />

        <Input
          label={t('username')}
          value={user.username}
          className="mt-4"
          hint={t('username-hint')}
          disabled
        />

        <div className="mt-8 space-y-2">
          <Link
            to="/apply-business"
            className="group block font-semibold text-midnight"
          >
            <Trans
              i18nKey="apply-business"
              defaults={t('apply-business')}
              components={{
                span: <span className="text-sky-700 group-hover:underline" />,
              }}
            />
          </Link>
          <Link
            to="/apply-verified"
            className="group block font-semibold text-midnight"
          >
            <Trans
              i18nKey="apply-verified"
              defaults={t('apply-verified')}
              components={{
                span: <span className="text-sky-700 group-hover:underline" />,
              }}
            />
          </Link>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-semibold">
        {t('change-password-title')}
      </h2>
      <hr className="h-[2px] w-full bg-black" />

      <form
        className="mt-4 flex max-w-lg flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="mt-4"
          label={t('current-password')}
          type="password"
          placeholder={t('current-password')}
          autoComplete="current-password"
          error={formState.errors.currentPassword}
          {...register('currentPassword')}
        />

        <Input
          className="mt-4"
          label={t('new-password')}
          type="password"
          placeholder={t('new-password')}
          autoComplete="new-password"
          error={formState.errors.newPassword}
          {...register('newPassword')}
        />

        <Input
          className="mt-4"
          label={t('confirm-password')}
          type="password"
          placeholder={t('confirm-password')}
          autoComplete="new-password"
          error={formState.errors.confirmPassword}
          {...register('confirmPassword')}
        />

        <Button
          appearance="sky"
          className="mt-4 max-w-64 self-end"
          type="submit"
        >
          {t('change-password-button')}
        </Button>
      </form>
    </div>
  );
}

export default Content;
