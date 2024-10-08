export function getPreview(f: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        res(event.target.result as string);
      }
    };
    reader.onerror = () => {
      rej(new Error('Failed to get image preview'));
    };
    reader.readAsDataURL(f);
  });
}

export async function getDims(
  files: File[]
): Promise<Array<{ width: number; height: number }>> {
  const dims: Array<{ width: number; height: number }> = [];
  for (const f of files) {
    try {
      const dim = await getImageDims(f);
      dims.push(dim);
    } catch (e) {}
  }
  return dims;
}

export function getImageDims(
  f: File
): Promise<{ width: number; height: number }> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      res({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      rej(new Error('Failed to get image dimensions'));
    };
    img.src = URL.createObjectURL(f);
  });
}

export type CreateMediaDto = {
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export function mapImagesToMedia(
  urls: string[],
  files: File[],
  dims: Array<{ width: number; height: number }>
): CreateMediaDto[] {
  return urls.map((url, i) => {
    return {
      url,
      type: 'image',
      thumbnail: url,
      alt: files[i].name,
      caption: files[i].name,
      width: dims[i].width,
      height: dims[i].height,
    };
  });
}
