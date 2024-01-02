export type GetMeResponse = GetUserByUsernameResponse & {
  onboardingCompleted: boolean;
  emailVerified: boolean;
};

export type GetUserByUsernameResponse = {
  id: string;
  name: string;
  email: string;
  username: string;
  gender: string;
  contactInformation: UserContactInformationDto;
  location: UserLocationDto;
  isBusinessAccount: boolean;
  isVerifiedAccount: boolean;
  description: string;
  accountStatus: number;
  profileImage: string;
};

export type UserContactInformationDto = {
  email: string;
  phone: string;
  address: string;
  other: string;
};

export type UserLocationDto = {
  city: string;
  country: string;
  lat: string;
  long: string;
};
