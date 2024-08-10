import { GetServiceByIdResponse } from './service';

export type SearchResult = {
  hits: {
    hits: Array<{
      _id: string;
      _index: string;
      _score: number;
      _source: GetServiceByIdResponse;
    }>;
    max_score: number;
    total: {
      relation: string;
      value: number;
    };
  };
  _shards: {
    failed: number;
    skipped: number;
    sucessful: number;
    total: number;
  };
  timed_out: false;
  took: number;
};
