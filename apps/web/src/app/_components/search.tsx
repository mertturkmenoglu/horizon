'use client';

import { Autocomplete } from '@/components/blocks/autocomplete';
import { useSearchClient } from '@/hooks/use-search-client';
import { InstantSearch } from 'react-instantsearch';

export default function Search() {
  const searchClient = useSearchClient();
  return (
    <nav className="mx-auto my-8 flex max-w-4xl items-center justify-center space-x-4">
      <InstantSearch
        indexName="HService"
        searchClient={searchClient}
        routing={false}
        future={{
          preserveSharedStateOnUnmount: true,
        }}
      >
        <Autocomplete />
      </InstantSearch>
    </nav>
  );
}
