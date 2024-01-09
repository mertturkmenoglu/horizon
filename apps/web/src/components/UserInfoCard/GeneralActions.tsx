import { AtSymbolIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import { useTranslation } from 'react-i18next';

function GeneralActions(): React.ReactElement {
  const { t } = useTranslation('user');

  return (
    <Button
      appearance="midnight"
      className="flex min-w-64 items-center justify-center space-x-2 py-2"
    >
      <AtSymbolIcon className="size-5 text-white" />
      <span>{t('view-contact')}</span>
    </Button>
  );
}

export default GeneralActions;
