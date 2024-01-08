import { SearchLocationResponse } from '@/lib/dto';
import { MapPinIcon } from '@heroicons/react/24/outline';
import LocationResult from './LocationResults';
import { useTranslation } from 'react-i18next';

type Props = {
  items: SearchLocationResponse;
};

function SearchResults({ items }: Props): React.ReactElement {
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
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
