export interface IUserAction {
  type: string;
  isLoggedIn?: boolean;
  isRegistred?: boolean;
  failedAttempt?: boolean;
  data?: {
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
    image: string;
  };
}

export interface IUserState {
  isLoggedIn: boolean;
  isRegistred: boolean;
  failedAttempt: boolean;
  data: {
    userId: string;
    name: string;
    image: string;
    token: string;
    refreshToken: string;
  };
}
