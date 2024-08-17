export type GetMeResponseDto = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  googleId: string | null;
  isEmailVerified: boolean;
  isActive: boolean;
  role: string;
  gender: string | null;
  profileImage: string | null;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
};

export type UploadImageType = 'hservices' | 'profile' | 'reviews';

export type CreateHServiceRequestDto = {
  title: string;
  description: string;
  category: number;
  price: number;
  priceUnit: string;
  priceTimespan: string;
  isOnline: boolean;
  url: string;
  location: string;
  deliveryTime: number;
  deliveryTimespan: string;
  media: string;
};

export type HServiceResponseDto = {
  id: string;
  userId: string;
  title: string;
  slug: string;
  description: string;
  category: number;
  price: number;
  priceUnit: string;
  priceTimespan: string;
  isOnline: boolean;
  url: string | null;
  location: string;
  deliveryTime: number;
  deliveryTimespan: string;
  totalPoints: number;
  totalVotes: number;
  media: MediaResponseDto;
  createdAt: string | null;
  updatedAt: string | null;
};

export type MediaResponseDto = {
  data: Media[];
};

export type Media = {
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  alt: string;
  caption: string | null;
  width: number;
  height: number;
};
