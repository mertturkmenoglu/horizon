import Button from '@/components/Button';
import Input from '@/components/Input';
import { GetMeResponse } from '@/lib/dto';
import { useTranslation } from 'react-i18next';
import Info from './Info';
import { useAccountForm } from './useAccountForm';

type Props = {
  user: GetMeResponse;
};

function Content({ user }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'account' });
  const { register, formState, handleSubmit, onSubmit } = useAccountForm();

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <hr className="h-[2px] w-full bg-black" />

      <Info user={user} />

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
