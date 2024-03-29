import { cn } from '@/lib/cn';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import localforage from 'localforage';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import Button from '../Button';
import Input from '../Input';
import RecentSearches from './RecentSearches';
import { useRecentSearches } from './useRecentSearches';

const schema = z.object({
  term: z.string().min(1).max(128),
});

type ServiceSearchInput = z.infer<typeof schema>;

function ServiceSearch({ className }: TProps): React.ReactElement {
  const { t } = useTranslation('appbar', { keyPrefix: 'search' });
  const [recentSearches, setRecentSearches] = useRecentSearches();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === '/search';
  const defaultTerm = useMemo(() => {
    if (!isSearchPage) {
      return '';
    }

    return searchParams.get('term') ?? '';
  }, [isSearchPage, searchParams]);

  const { register, handleSubmit } = useForm<ServiceSearchInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      term: defaultTerm,
    },
  });

  const onSubmit: SubmitHandler<ServiceSearchInput> = async (values) => {
    const newArr = [values.term, ...recentSearches];
    const newRecent = newArr.slice(0, Math.min(newArr.length, 5));
    await localforage.setItem('recentSearches', newRecent);

    setRecentSearches(newRecent);
    navigate(`/search?term=${encodeURIComponent(values.term)}`);
  };

  return (
    <form
      className={cn('group rounded', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full items-stretch">
        <Input
          label=""
          className={cn(
            'w-full max-w-2xl group-focus-within:w-full group-focus-within:max-w-full',
            'transition-max-width duration-500 ease-in-out'
          )}
          inputClassName="rounded-r-none focus:ring-0 focus:border-none py-3 text-base placeholder:text-base"
          placeholder={t('placeholder')}
          {...register('term')}
        />
        <Button
          appearance="midnight"
          className="flex w-14 items-center justify-center rounded-l-none px-2 hover:bg-opacity-90"
        >
          <MagnifyingGlassIcon className="size-6 text-white" />
          <span className="sr-only">{t('search')}</span>
        </Button>
      </div>

      <RecentSearches
        className="mt-4"
        searches={recentSearches}
        setSearches={setRecentSearches}
      />
    </form>
  );
}

export default ServiceSearch;
