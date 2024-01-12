import { ServicePhotoDto } from './dto/service';

export function getUserImage(url?: string | null): string {
  if (url === undefined || url === null) {
    return '/user.jpg';
  }

  return url === '' ? '/user.jpg' : url;
}

export function getServiceImage(images: ServicePhotoDto[]): string {
  if (images.length === 0) {
    return '/wave.png';
  }

  return images[0].url;
}
