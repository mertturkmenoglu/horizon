export function getUserImage(url?: string | null): string {
  if (url === undefined || url === null) {
    return '/user.jpg';
  }

  return url === '' ? '/user.jpg' : url;
}
