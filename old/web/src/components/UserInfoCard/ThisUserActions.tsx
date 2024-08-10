import { PencilIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function ThisUserActions(): React.ReactElement {
  const { t } = useTranslation('user');

  return (
    <>
      <Link
        className="mt-2 flex w-full min-w-80 items-center justify-center space-x-2 rounded bg-midnight py-2 font-bold text-white hover:bg-opacity-90"
        to="/settings?tab=profile"
      >
        <PencilIcon className="size-5 text-white" />
        <span>{t('edit')}</span>
      </Link>
    </>
  );
}

export default ThisUserActions;
