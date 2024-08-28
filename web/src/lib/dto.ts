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

export type UserDto = GetUserProfileByUsernameResponseDto;

export type HServiceResponseDto = {
  id: string;
  user: UserDto;
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
  createdAt: string;
  updatedAt: string;
};

export type HServiceWithoutUserResponseDto = {
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
  createdAt: string;
  updatedAt: string;
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

export type GetUserProfileByUsernameResponseDto = {
  id: string;
  username: string;
  fullName: string;
  gender: string | null;
  profileImage: string | null;
  createdAt: string | null;
};

export type GetNewUploadUrlResponseDto = {
  key: string;
  url: string;
};

export type GetHomeAggregationsResponseDto = {
  new: HServiceResponseDto[];
  popular: HServiceResponseDto[];
  featured: HServiceResponseDto[];
  favorites: HServiceResponseDto[];
};

export type HServiceMetadataDto = {
  isFavorite: boolean;
  isBookmarked: boolean;
};

export type SendForgotPasswordEmailRequestDto = {
  email: string;
};

export type ResetPasswordRequestDto = {
  email: string;
  code: string;
  newPassword: string;
};

export type BookmarksResponseItemDto = {
  id: string;
  userId: string;
  hserviceId: string;
  createdAt: string;
  hservice: HServiceWithoutUserResponseDto;
};

export type Pagination = {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type GetMyListsResponseDtoItem = {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type GetMyListsResponseDto = GetMyListsResponseDtoItem[];

export type CreateListRequestDto = {
  title: string;
};

export type GetListByIdResponseDto = {
  id: string;
  title: string;
  userId: string;
  user: UserDto;
  items: ListItemDto[];
  createdAt: string;
  updatedAt: string;
};

export type ListItemDto = {
  id: string;
  listId: string;
  hserviceId: string;
  hservice: HServiceResponseDto;
  itemOrder: number;
};
