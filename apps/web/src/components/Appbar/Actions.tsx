import Tooltip from '@/components/Tooltip';
import { BellIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Actions(): React.ReactElement {
  const { t } = useTranslation('appbar');

  return (
    <>
      <Tooltip content={t('create-service')}>
        <Link
          to="/services/new"
          className="rounded-full hover:bg-neutral-400/20"
        >
          <PlusIcon className="size-10 p-2" />
          <span className="sr-only">{t('create-service')}</span>
        </Link>
      </Tooltip>

      <Tooltip content={t('notifications')}>
        <Link
          to="/notifications"
          className="rounded-full hover:bg-neutral-400/20"
        >
          <BellIcon className="size-10 p-2" />
          <span className="sr-only">{t('notifications')}</span>
        </Link>
      </Tooltip>

      <Tooltip content={t('messages')}>
        <Link
          to="/messages"
          className="rounded-full hover:bg-neutral-400/20"
        >
          <EnvelopeIcon className="size-10 p-2" />
          <span className="sr-only">{t('messages')}</span>
        </Link>
      </Tooltip>
    </>
  );
}

export default Actions;
