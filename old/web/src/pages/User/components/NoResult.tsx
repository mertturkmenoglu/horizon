import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

function NoResult(): React.ReactElement {
  const { t } = useTranslation('user');

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <SquaresPlusIcon className="size-12 text-sky-600" />
      <div className="mt-2 text-2xl text-midnight/70">{t('empty-result')}</div>
    </div>
  );
}

export default NoResult;
