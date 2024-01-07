import { SearchLocationResponse } from '@/lib/dto';
import { MapPinIcon } from '@heroicons/react/24/outline';
import LocationResult from './LocationResults';

type Props = {
  items: SearchLocationResponse;
};

function SearchResults({ items }: Props): React.ReactElement {
  return (
    <div className="mt-2 border border-midnight/20 p-4 rounded-md">
      <div className="font-semibold text-xs uppercase flex space-x-2 items-center">
        <MapPinIcon className="size-4" />
        <div>Results:</div>
      </div>
      <div className="mt-2 space-y-2 ml-4">
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
