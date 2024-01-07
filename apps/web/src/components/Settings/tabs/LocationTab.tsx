import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { cn } from '@/lib/cn';
import {
  GeoSearchResult,
  GetMeResponse,
  SearchLocationResponse,
} from '@/lib/dto';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const search = async (term: string) => {
  const res = await api<{ data: SearchLocationResponse }>('/location/', {
    params: {
      term,
    },
  });
  return res.data;
};

function formatLocation({
  city,
  country,
  admin,
}: GetMeResponse['location']): string {
  return city === '' || country === '' ? '' : [city, admin, country].join(', ');
}

function LocationResult({
  item: {
    entry: { name, admin, country, lat, long },
  },
}: {
  item: GeoSearchResult;
}): React.ReactElement {
  return (
    <button
      onClick={async () => {
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
          window.location.reload();
          return;
        } catch (err) {
          toast.error('Something went wrong');
        }
      }}
      className={cn(
        'hover:bg-neutral-400/10 rounded py-1 px-2 block w-full text-left text-neutral-600 text-sm'
      )}
    >{`${name}, ${admin.name}, ${country}`}</button>
  );
}

function LocationTabContainer(): React.ReactElement {
  const { user } = useAuth();
  return !user ? <></> : <LocationTab user={user} />;
}

function useSearch(text: string) {
  return useQuery({
    queryKey: ['location-search', text],
    queryFn: async () => search(text),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled: !!text,
  });
}

let timeout: NodeJS.Timeout | null = null;

function LocationTab({ user }: { user: GetMeResponse }): React.ReactElement {
  const [input, setInput] = useState(() => formatLocation(user.location));
  const [loc, setLoc] = useState('');
  const query = useSearch(loc);

  const showResults =
    !query.isLoading && !query.isError && query.data && query.data.length !== 0;

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
      <h2 className="text-2xl font-semibold">Location Settings</h2>
      <hr className="w-full h-[2px] bg-black" />

      <div className="max-w-lg mt-4">
        <Input
          label="Location"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          hint="Your location determines what we can offer to you."
          className=""
        />

        {showResults && <SearchResults items={query.data} />}
      </div>
    </div>
  );
}

function SearchResults({
  items,
}: {
  items: SearchLocationResponse;
}): React.ReactElement {
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

export default LocationTabContainer;
