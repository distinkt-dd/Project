export type AccountType = 'participant' | 'owner';

export interface AuthUser {
  id: number;
  username: string;
  display_name: string;
  account_type: AccountType;
}

export interface TokenPairResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}

export interface TokenLoginRequest {
  username: string;
  password: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}
