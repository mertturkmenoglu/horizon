'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { UseSearchBoxProps, useSearchBox } from 'react-instantsearch';

type Props = {
  isSearchOnType?: boolean;
} & UseSearchBoxProps;

export default function CustomSearchBox({
  isSearchOnType = false,
  ...props
}: Props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const setQuery = useCallback(
    (newQuery: string) => {
      setInputValue(newQuery);
      if (isSearchOnType) {
        refine(newQuery);
      }
    },
    [isSearchOnType, refine]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.currentTarget.value);
    },
    [setQuery]
  );

  return (
    <div>
      <form
        role="search"
        className="relative flex gap-2 sm:gap-4 lg:gap-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (inputRef.current) {
            inputRef.current.blur();
          }

          if (!isSearchOnType) {
            refine(inputValue);
          }
        }}
        onReset={(e) => {
          e.preventDefault();
          e.stopPropagation();

          setQuery('');

          if (inputRef.current) {
            inputRef.current.focus();
          }

          if (!isSearchOnType) {
            refine('');
          }
        }}
      >
        <Input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search for a service"
          spellCheck={false}
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={onChange}
          className="h-10 rounded-full"
        />

        <Button
          type="submit"
          size="lg"
          className="absolute right-0 rounded-l-none rounded-r-full px-4"
        >
          <span className="hidden sm:block">Search</span>
          <SearchIcon className="ml-0 size-4 sm:ml-2" />
        </Button>
      </form>
    </div>
  );
}
