export type LoginType = {
  id: string;
  password: string;
};

export type LoginResultType = {
  accessToken: string;
  refreshToken: string;
  needsPasswordChange: boolean;
};


export type RefreshTokenResponse = {
  accessToken: string;
};
