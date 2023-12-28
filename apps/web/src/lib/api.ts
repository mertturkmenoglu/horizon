import { ofetch } from 'ofetch';

export const API_URL = import.meta.env.API_URL;

export const api = ofetch.create({
  baseURL: API_URL,
  credentials: 'include',
});
