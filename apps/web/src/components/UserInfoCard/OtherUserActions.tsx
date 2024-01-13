import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { GetUserByUsernameResponse } from '@/lib/dto';
import { Link } from 'react-router-dom';

type Props = {
  user: GetUserByUsernameResponse;
};

function OtherUserActions({ user }: Props): React.ReactElement {
  const { t } = useTranslation('user');

  return (
    <>
      <Button
        appearance="midnight"
        className="mt-2 flex min-w-80 items-center justify-center space-x-2 py-2"
      >
        <EnvelopeIcon className="size-5 text-white" />
        <span>{t('message')}</span>
      </Button>
      <Link
        to={`/report?u=${user.username}`}
        className="mt-2 block w-full text-center text-sm text-midnight/70 hover:underline"
      >
        {t('block-report')}
      </Link>
    </>
  );
}

export default OtherUserActions;
