export type LoginType = {
  id: string;
  password: string;
};

export type LoginResultType = {
  access_token: string;
  refresh_token: string;
  needs_password_change: boolean;
};
