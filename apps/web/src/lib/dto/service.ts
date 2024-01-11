export type GetServiceByIdResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: ServiceUserDto;
  title: string;
  slug: string;
  description: string;
  category: number;
  price: string;
  priceUnit: string;
  priceTimespan: number;
  isOnline: boolean;
  location: string;
  deliveryTime: number;
  deliveryTimespan: number;
  status: number;
  visits: number;
  isNew: boolean;
  isPopular: boolean;
  photos: ServicePhotoDto[];
  videos: ServiceVideoDto[];
};

export type ServiceUserDto = {
  id: string;
  name: string;
  username: string;
  isBusinessAccount: boolean;
  isVerifiedAccount: boolean;
  accountStatus: number;
  profileImage: string;
};

export type CreateServiceRequest = {
  title: string;
  description: string;
  category: number;
  price: string;
  priceUnit: string;
  priceTimespan: number;
  isOnline: boolean;
  location: string;
  deliveryTime: number;
  deliveryTimespan: number;
};

export type UploadServicePhotosRequest = {
  photos: ServicePhotoDto[];
};

export type UploadServiceVideosRequest = {
  videos: ServiceVideoDto[];
};

export type ServicePhotoDto = {
  serviceId: string;
  url: string;
  alt: string;
};

export type ServiceVideoDto = {
  serviceId: string;
  url: string;
  alt: string;
};
