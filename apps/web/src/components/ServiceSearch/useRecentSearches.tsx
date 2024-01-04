import { useEffect, useState } from 'react';
import { z } from 'zod';

const schema = z.array(z.string().min(1));

export function useLastSearches(): [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>,
] {
  const key = 'recentSearches';
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const ls = localStorage.getItem(key);

    if (ls === null) {
      localStorage.setItem(key, '[]');
      return [];
    }

    try {
      const data = JSON.parse(ls);
      const parseResult = schema.safeParse(data);

      if (parseResult.success) {
        return parseResult.data;
      }

      localStorage.setItem(key, '[]');
      return [];
    } catch (err) {
      localStorage.setItem(key, '[]');
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(recentSearches));
  }, [recentSearches]);

  return [recentSearches, setRecentSearches];
}
