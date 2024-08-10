import Input from '@/components/Input';
import { GetMeResponse } from '@/lib/dto';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = {
  user: GetMeResponse;
};

function Info({ user }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'account' });

  return (
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
  );
}

export default Info;
