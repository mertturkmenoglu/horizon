import { cn } from '@/lib/cn';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Button from '../Button';

type Props = TProps & {
  page: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({
  className,
  page,
  setPage,
  total,
  ...props
}: Props): React.ReactElement {
  const { t } = useTranslation('common', { keyPrefix: 'pagination' });

  return (
    <div
      className={cn('flex items-center justify-center space-x-4', className)}
      {...props}
    >
      <Button
        appearance="midnight"
        className="flex w-min items-center justify-center px-4 py-2"
        disabled={page === 1}
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
      >
        <ArrowLeftIcon className="size-4 text-white" />
        <span className="sr-only">{t('prev')}</span>
      </Button>
      <div className="font-semibold">
        {page} / {total}
      </div>
      <Button
        appearance="midnight"
        className="flex w-min items-center justify-center px-4 py-2"
        disabled={total === page}
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      >
        <span className="sr-only">{t('next')}</span>
        <ArrowRightIcon className="size-4 text-white" />
      </Button>
    </div>
  );
}

export default Pagination;
