import { store } from '@app';
import { logout, setAuthData } from '@features/auth/model/authSlice';
import type { Api } from '@shared/api/api.class';
import { AUTH } from '@shared/api/constants';
import type { TokenManager } from './TokenManager';
import type { TokenLoginRequest, TokenPairResponse } from './types';

export class AuthService {
  private readonly api: Api;
  private readonly tokenManager: TokenManager;

  constructor(api: Api, tokenManager: TokenManager) {
    this.api = api;
    this.tokenManager = tokenManager;
  }

  async login(data: TokenLoginRequest): Promise<TokenPairResponse> {
    const response = await this.api.post<TokenPairResponse>(
      `${AUTH}login/`,
      data
    );
    store.dispatch(setAuthData(response));
    this.tokenManager.startAutoRefresh();
    return response;
  }

  async forceRefresh(): Promise<void> {
    await this.tokenManager.forceRefresh();
  }

  async refresh(): Promise<void> {
    await this.tokenManager.ensureValidToken();
  }

  logout(): void {
    this.tokenManager.stopAutoRefresh();
    store.dispatch(logout());
    window.location.href = '/login';
  }

  getAccessToken(): string | null {
    return this.tokenManager.getAccessToken();
  }

  async ensureValidToken(): Promise<string | null> {
    return this.tokenManager.ensureValidToken();
  }
}
