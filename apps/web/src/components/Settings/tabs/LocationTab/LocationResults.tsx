import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import { GeoSearchResult } from '@/lib/dto';
import { formatLocation } from '@/lib/location';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

type Props = {
  item: GeoSearchResult;
};

function LocationResult({ item }: Props): React.ReactElement {
  const { t } = useTranslation('settings', { keyPrefix: 'location' });
  const entry = item.entry;
  const { name, admin, country, lat, long } = entry;

  const updateLocation = async () => {
    try {
      await api('/users/profile/location', {
        method: 'PATCH',
        body: {
          city: name,
          admin: admin.name,
          country: country,
          lat,
          long,
        },
      });
      toast.success(t('update-ok'));
    } catch (err) {
      toast.error(t('update-err'));
    }
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
