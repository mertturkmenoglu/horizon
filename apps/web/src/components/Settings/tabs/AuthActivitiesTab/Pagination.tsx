import Button from '@/components/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

function Pagination({ page, setPage, totalPages }: Props): React.ReactElement {
  return (
    <div className="flex items-center justify-center space-x-4 my-16">
      <Button
        appearance="sky"
        className="max-w-48 flex items-center justify-center space-x-2"
        disabled={page === 1}
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
      >
        <ArrowLeftIcon className="size-6 text-white" />
        <span>Previous</span>
      </Button>
      <div>
        {page}/{totalPages}
      </div>
      <Button
        appearance="sky"
        className="max-w-48 flex items-center justify-center space-x-2"
        disabled={totalPages === page}
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      >
        <span>Next</span>
        <ArrowRightIcon className="size-6 text-white" />
      </Button>
    </div>
  );
}

export default Pagination;
