export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  username: string;
};

export type PasswordStrengthRequest = {
  password: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type PasswordResetEmailRequest = {
  email: string;
};

export type VerifyEmailEmailRequest = {
  email: string;
};

export type PasswordResetRequest = {
  email: string;
  code: string;
  newPassword: string;
};

export type VerifyEmailRequest = {
  code: string;
  email: string;
};
