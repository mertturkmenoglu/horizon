type GetServiceByIdResponse = {
  id: number;
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

type ServiceUserDto = {
  id: string;
  name: string;
  username: string;
  isBusinessAccount: boolean;
  isVerifiedAccount: boolean;
  accountStatus: number;
  profileImage: string;
};

type CreateServiceRequest = {
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

type UploadServicePhotosRequest = {
  photos: ServicePhotoDto[];
};

type UploadServiceVideosRequest = {
  videos: ServiceVideoDto[];
};

type ServicePhotoDto = {
  serviceId: number;
  url: string;
  alt: string;
};

type ServiceVideoDto = {
  serviceId: number;
  url: string;
  alt: string;
};
