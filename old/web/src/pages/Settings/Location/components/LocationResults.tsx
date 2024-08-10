import { cn } from '@/lib/cn';
import { GeoSearchResult } from '@/lib/dto';
import { formatLocation } from '@/lib/location';

import { useLocation } from './useLocation';

type Props = {
  item: GeoSearchResult;
  setTyped: React.Dispatch<React.SetStateAction<boolean>>;
};

function LocationResult({ item, setTyped }: Props): React.ReactElement {
  const entry = item.entry;
  const { admin, country, name } = entry;

  const mutation = useLocation(entry, () => {
    setTyped(false);
  });

  const updateLocation = async () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={updateLocation}
      className={cn(
        'block w-full rounded px-2 py-1 text-left text-sm text-neutral-600 hover:bg-neutral-400/10'
      )}
    >
      {formatLocation({ admin: admin.name, country, city: name })}
    </button>
  );
}

export default LocationResult;
