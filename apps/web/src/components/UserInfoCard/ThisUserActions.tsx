import { PencilIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ThisUserActions(): React.ReactElement {
  const { t } = useTranslation('user');

  return (
    <>
      <a
        className="mt-2 flex min-w-64 items-center justify-center space-x-2 rounded bg-midnight py-2 font-bold text-white hover:bg-opacity-90"
        href="/settings?tab=profile"
      >
        <PencilIcon className="size-5 text-white" />
        <span>{t('edit')}</span>
      </a>
    </>
  );
}

export default ThisUserActions;
