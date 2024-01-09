import { BellIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Tooltip from '@/components/Tooltip';

function Actions(): React.ReactElement {
  const { t } = useTranslation('appbar');

  return (
    <>
      <Tooltip content={t('create-service')}>
        <a
          href="/services/new"
          className="rounded-full hover:bg-neutral-400/20"
        >
          <PlusIcon className="size-10 p-2" />
          <span className="sr-only">{t('create-service')}</span>
        </a>
      </Tooltip>

      <Tooltip content={t('notifications')}>
        <a
          href="/notifications"
          className="rounded-full hover:bg-neutral-400/20"
        >
          <BellIcon className="size-10 p-2" />
          <span className="sr-only">{t('notifications')}</span>
        </a>
      </Tooltip>

      <Tooltip content={t('messages')}>
        <a
          href="/messages"
          className="rounded-full hover:bg-neutral-400/20"
        >
          <EnvelopeIcon className="size-10 p-2" />
          <span className="sr-only">{t('messages')}</span>
        </a>
      </Tooltip>
    </>
  );
}

export default Actions;
