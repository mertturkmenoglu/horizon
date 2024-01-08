import { useEffect, useState } from 'react';
import { z } from 'zod';
import localforage from 'localforage';

const schema = z.array(z.string().min(1));

type ReturnRecentSearches = [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>,
];

const key = 'recentSearches';

export function useRecentSearches(): ReturnRecentSearches {
  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    const fn = async () => {
      const data = await localforage.getItem<string[]>(key);

      if (data === null) {
        await localforage.setItem(key, []);
        return [];
      }

      try {
        const parseResult = schema.safeParse(data);

        if (parseResult.success) {
          return parseResult.data;
        }

        localforage.setItem(key, []);
        return [];
      } catch (err) {
        localforage.setItem(key, []);
        return [];
      }
    };

    fn().then((data) => {
      setState(data);
    });
  }, []);

  useEffect(() => {
    localforage.setItem(key, state);
  }, [state]);

  return [state, setState];
}
