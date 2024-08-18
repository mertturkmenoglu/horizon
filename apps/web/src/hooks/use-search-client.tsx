import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

export function useSearchClient() {
  const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: 'horizon' ?? '',
      nodes: [
        {
          host: 'localhost',
          port: 8108,
          protocol: 'http',
        },
      ],
      numRetries: 8,
      useServerSideSearchCache: true,
    },
    additionalSearchParameters: {
      query_by: 'title',
    },
  });
  const searchClient = typesenseInstantsearchAdapter.searchClient;

  return searchClient;
}
