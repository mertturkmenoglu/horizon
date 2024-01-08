import { cn } from '@/lib/cn';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  searches: string[];
  setSearches: React.Dispatch<React.SetStateAction<string[]>>;
};

function RecentSearches({
  className,
  searches,
  setSearches,
}: Props): React.ReactElement {
  const { t } = useTranslation('appbar', { keyPrefix: 'search' });

  return (
    <div
      className={cn(
        'hidden group-focus-within:block border border-midnight/20 rounded p-4 space-y-2',
        className
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-midnight">
          <ClockIcon className="size-4" />
          <div className="font-bold text-xs uppercase">{t('recent')}</div>
        </div>

        <button
          className={cn(
            'font-bold text-xs uppercase text-neutral-600',
            'px-2 py-1 rounded bg-neutral-400/10 hover:bg-neutral-400/20'
          )}
          onClick={() => setSearches([])}
        >
          {t('clear')}
        </button>
      </div>

      {searches.length === 0 && <div className="text-sm">{t('no-recent')}</div>}

      {searches.map((search, i) => (
        <button
          key={search + i}
          className={cn(
            'hover:bg-neutral-400/10 text-neutral-600',
            'px-6 py-2 text-sm flex rounded w-full',
            'focus:outline-none focus:ring focus:ring-sky-500'
          )}
        >
          {search}
        </button>
      ))}
    </div>
  );
}

export default RecentSearches;
