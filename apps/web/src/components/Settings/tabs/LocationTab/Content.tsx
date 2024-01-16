import Input from '@/components/Input';
import { GetMeResponse } from '@/lib/dto';
import { formatLocation } from '@/lib/location';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchResults from './SearchResults';
import { useSearch } from './useSearch';

type Props = {
  user: GetMeResponse;
};

let timeout: NodeJS.Timeout | null = null;

function Content({ user }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'location' });
  const [input, setInput] = useState(() => formatLocation(user.location));
  const [loc, setLoc] = useState('');
  const [typed, setTyped] = useState(false);
  const query = useSearch(loc);
  const val = useMemo(() => {
    return typed ? input : formatLocation(user.location);
  }, [typed, user.location, input]);

  const showResults =
    !query.isLoading &&
    !query.isError &&
    query.data &&
    query.data.length !== 0 &&
    typed;

  useEffect(() => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setLoc(input);
    }, 1000);
  }, [input, setLoc]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('title')}</h2>
      <hr className="h-[2px] w-full bg-black" />

      <div className="mt-4 max-w-lg">
        <Input
          label={t('location')}
          value={val}
          onChange={(e) => {
            setInput(e.target.value);
            setTyped(true);
          }}
          hint={t('location-hint')}
        />

        {showResults && (
          <SearchResults
            items={query.data}
            setTyped={setTyped}
          />
        )}
      </div>
    </div>
  );
}

export default Content;
