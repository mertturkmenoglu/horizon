export type TResponse<T> = {
  data: T;
};

export type TPaginatedResponse<T> = {
  data: T;
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasPrevious: number;
  hasNext: number;
};
