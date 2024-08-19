import ky from 'ky';
import { GetNewUploadUrlResponseDto, UploadImageType } from './dto';

const api = ky.create({
  credentials: 'include',
  prefixUrl: process.env.NEXT_PUBLIC_API ?? '',
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
      .json<{ data: GetNewUploadUrlResponseDto[] }>();
    const url = res.data[0].Url;

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
