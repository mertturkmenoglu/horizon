import ky from 'ky';
import { UploadImageType } from './dto';

const api = ky.create({
  credentials: 'include',
  prefixUrl: 'http://localhost:5000/api',
});

export default api;

export async function uploadImages(
  files: File[],
  type: UploadImageType
): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const res = await api
      .get(`uploads/new-url?type=${type}&count=1&mime=${file.type}`)
      .json<{ data: { key: string; url: string } }>();
    const url = res.data.url;

    try {
      const r = await fetch(url, {
        method: 'PUT',
        body: file,
      });
      if (r.ok) {
        urls.push(url);
      }
    } catch (err) {
      console.error('Failed to upload file', err);
    }
  }

  for (let i = 0; i < urls.length; i++) {
    urls[i] = urls[i].split('?')[0];
  }

  return urls;
}
