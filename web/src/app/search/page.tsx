'use client';

import { useSearchClient } from '@/hooks/use-search-client';
import 'instantsearch.css/themes/reset.css';
import { InstantSearch } from 'react-instantsearch';
import Container from './_components/container';

export default function Page() {
  const searchClient = useSearchClient();

  return (
    <div>
      <InstantSearch
        indexName="HService"
        searchClient={searchClient}
        routing={true}
        future={{
          preserveSharedStateOnUnmount: true,
        }}
      >
        <Container />
      </InstantSearch>
    </div>
  );
}
