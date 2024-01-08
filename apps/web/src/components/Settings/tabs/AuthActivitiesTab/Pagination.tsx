import Button from '@/components/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

function Pagination({ page, setPage, totalPages }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'auth-activity' });
  return (
    <div className="my-16 flex items-center justify-center space-x-4">
      <Button
        appearance="sky"
        className="flex max-w-48 items-center justify-center space-x-2"
        disabled={page === 1}
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
      >
        <ArrowLeftIcon className="size-6 text-white" />
        <span>{t('prev')}</span>
      </Button>
      <div>
        {page}/{totalPages}
      </div>
      <Button
        appearance="sky"
        className="flex max-w-48 items-center justify-center space-x-2"
        disabled={totalPages === page}
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      >
        <span>{t('next')}</span>
        <ArrowRightIcon className="size-6 text-white" />
      </Button>
    </div>
  );
}

export default Pagination;
