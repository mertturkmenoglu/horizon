import { api } from './api';

export async function logout() {
  try {
    await api('/auth/logout', {
      method: 'POST',
    });
    window.location.href = '/';
  } catch (err) {
    /* empty */
  }
}
