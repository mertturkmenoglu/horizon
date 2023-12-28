import { ofetch } from 'ofetch';

export const API_URL = import.meta.env.VITE_API_URL;

export const api = ofetch.create({
  baseURL: API_URL,
  credentials: 'include',
});
