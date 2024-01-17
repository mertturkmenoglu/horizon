import { SearchLocationResponse } from '@/lib/dto';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import LocationResult from './LocationResults';

type Props = {
  items: SearchLocationResponse;
  setTyped: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchResults({ items, setTyped }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'location' });

  return (
    <div className="mt-2 rounded-md border border-midnight/20 p-4">
      <div className="flex items-center space-x-2 text-xs font-semibold uppercase">
        <MapPinIcon className="size-4" />
        <div>{t('results')}:</div>
      </div>
      <div className="ml-4 mt-2 space-y-2">
        {items.map((item) => (
          <LocationResult
            item={item}
            key={item.entry.id}
            setTyped={setTyped}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
