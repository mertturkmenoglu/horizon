import { GetMeResponse } from '@/lib/dto';
import { formatLocation } from '@/lib/location';
import { useEffect, useState } from 'react';
import { useSearch } from './useSearch';
import Input from '@/components/Input';
import SearchResults from './SearchResults';

type Props = {
  user: GetMeResponse;
};

let timeout: NodeJS.Timeout | null = null;

function Content({ user }: Props): React.ReactElement {
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

export default Content;
