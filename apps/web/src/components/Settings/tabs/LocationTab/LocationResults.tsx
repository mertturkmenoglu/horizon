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
        'hover:bg-neutral-400/10 rounded py-1 px-2 block w-full text-left text-neutral-600 text-sm'
      )}
    >
      {formatLocation({ admin: admin.name, country, city: name })}
    </button>
  );
}

export default LocationResult;
