import { ofetch } from 'ofetch';

export const API_URL = import.meta.env.VITE_API_URL;

export const api = ofetch.create({
  baseURL: API_URL,
  credentials: 'include',
});

export type ApiError = {
  data: {
    message: string;
  };
  message: string;
};

export function isApiError(err: unknown): err is ApiError {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err as any).data !== undefined
  );
}
