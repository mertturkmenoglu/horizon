import { GetUserByUsernameResponse } from '@/lib/dto';
import { LinkedinIcon, Paperclip, TwitterIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import Tooltip from '../Tooltip';

type Props = {
  user: GetUserByUsernameResponse;
};

function ShareActions({ user }: Props): React.ReactElement {
  const { t } = useTranslation('user');
  const url = window.location.href;

  const onCopyLinkClick = async () => {
    await navigator.clipboard.writeText(url);
    toast.success(t('share.copy-ok'));
  };

  const twitterUrl = useMemo(() => {
    const base = 'https://twitter.com/intent/tweet?text=';
    const text = t('share.check', { name: user.name, url });
    return base + text;
  }, [url, user.name, t]);

  const linkedinUrl = useMemo(() => {
    const base = 'https://www.linkedin.com/sharing/share-offsite/?url=';
    const text = t('share.check', { name: user.name, url });
    return base + text;
  }, [url, user.name, t]);

  return (
    <div className="mt-4 flex w-full items-center justify-center space-x-4">
      <Tooltip content={t('share.copy')}>
        <button
          className="rounded-md bg-midnight p-1.5 hover:bg-opacity-90"
          onClick={onCopyLinkClick}
        >
          <Paperclip className="size-6 text-white" />
          <span className="sr-only">{t('share.copy')}</span>
        </button>
      </Tooltip>

      <Tooltip content={t('share.twitter')}>
        <a
          className="rounded-md bg-midnight p-1.5 hover:bg-opacity-90"
          href={twitterUrl}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
        >
          <TwitterIcon className="size-6 text-white" />
          <span className="sr-only">{t('share.twitter')}</span>
        </a>
      </Tooltip>

      <Tooltip content={t('share.linkedin')}>
        <a
          href={linkedinUrl}
          target="_blank"
          referrerPolicy="no-referrer"
          className="rounded-md bg-midnight p-1.5 hover:bg-opacity-90"
          rel="noopener noreferrer"
        >
          <LinkedinIcon className="size-6 text-white" />
          <span className="sr-only">{t('share.linkedin')}</span>
        </a>
      </Tooltip>
    </div>
  );
}

export default ShareActions;
