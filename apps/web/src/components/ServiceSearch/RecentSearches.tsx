import { cn } from '@/lib/cn';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'hidden space-y-2 rounded border border-midnight/20 p-4 group-focus-within:block',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-midnight">
          <ClockIcon className="size-4" />
          <div className="text-xs font-bold uppercase">{t('recent')}</div>
        </div>

        <button
          className={cn(
            'text-xs font-bold uppercase text-neutral-600',
            'rounded bg-neutral-400/10 px-2 py-1 hover:bg-neutral-400/20'
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
          onClick={() => {
            navigate(`/search?term=${encodeURIComponent(search)}`);
          }}
          className={cn(
            'text-neutral-600 hover:bg-neutral-400/10',
            'flex w-full rounded px-6 py-2 text-sm',
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
