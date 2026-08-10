import { AUTH } from '@shared/api/constants';
import type {
  AuthUser,
  TokenRefreshRequest,
  TokenRefreshResponse,
} from './types';

export class TokenManager {
  private readonly onLogout: () => void;
  private readonly accessTokenLifetimeMs: number;
  private readonly refreshSafetyMarginMs: number;

  private readonly setAuthData: (
    access: string,
    refresh: string,
    user: AuthUser
  ) => void;
  private readonly selectAccessToken: () => string | null;
  private readonly selectRefreshToken: () => string | null;

  private refreshInProgress: Promise<TokenRefreshResponse> | null = null;
  private maxConsecutiveFailures = 3;
  private consecutiveFailures = 0;
  private timerId: number | null = null;
  private baseApiUrl: string | null;

  constructor(
    onLogout: () => void,
    accessTokenLifetimeMs: number,
    refreshSafetyMarginMs: number,
    setAuthData: (access: string, refresh: string, user: AuthUser) => void,
    selectAccessToken: () => string | null,
    selectRefreshToken: () => string | null,
    baseApiUrl: string | null
  ) {
    this.onLogout = onLogout;
    this.accessTokenLifetimeMs = accessTokenLifetimeMs;
    this.refreshSafetyMarginMs = refreshSafetyMarginMs;

    this.setAuthData = setAuthData;
    this.selectAccessToken = selectAccessToken;
    this.selectRefreshToken = selectRefreshToken;
    this.baseApiUrl = baseApiUrl;
  }

  public getAccessToken(): string | null {
    return this.selectAccessToken();
  }

  public async ensureValidToken(): Promise<string | null> {
    const access = this.selectAccessToken();
    if (access) return access;

    const refresh = this.selectRefreshToken();
    if (!refresh) throw new Error('No refresh token available');

    if (this.refreshInProgress) {
      await this.refreshInProgress;
      return this.selectAccessToken();
    }

    try {
      this.refreshInProgress = this.doRefresh();
      const result = await this.refreshInProgress;
      this.setAuthData(result.access, result.refresh, result.user);

      const currentAccess = this.selectAccessToken();

      if (!currentAccess) {
        throw new Error('Failed to retrieve access token after refresh');
      }

      return currentAccess;
    } finally {
      this.refreshInProgress = null;
    }
  }

  public async doRefresh(): Promise<TokenRefreshResponse> {
    const refreshToken = this.selectRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const data: TokenRefreshRequest = { refresh: refreshToken };
    const response = await fetch(`${this.baseApiUrl}${AUTH}refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      this.consecutiveFailures += 1;
      if (this.consecutiveFailures >= this.maxConsecutiveFailures) {
        this.onLogout();
      }
      const err = await response.json().catch(() => ({}));
      const message = err.error ?? err.detail ?? response.statusText;
      throw new Error(
        `Refresh failed with status ${response.status}: ${message}`
      );
    }

    const result: TokenRefreshResponse = await response.json();
    this.consecutiveFailures = 0;
    return result;
  }

  public async forceRefresh(): Promise<string> {
    if (this.refreshInProgress) {
      await this.refreshInProgress;
      const newAccess = this.selectAccessToken();
      if (!newAccess) {
        throw new Error('Access token не активен после рефреша!');
      }
      return newAccess;
    }

    try {
      this.refreshInProgress = this.doRefresh();
      const result = await this.refreshInProgress;

      this.setAuthData(result.access, result.refresh, result.user);

      const newAccess = this.selectAccessToken();

      if (!newAccess) {
        throw new Error('Access token не изменился!');
      }
      return newAccess;
    } finally {
      this.refreshInProgress = null;
    }
  }

  public startAutoRefresh(): void {
    if (this.timerId !== null) return;

    const refresh = this.selectRefreshToken();
    if (!refresh) return;

    const delay = Math.max(
      0,
      this.accessTokenLifetimeMs - this.refreshSafetyMarginMs
    );

    this.timerId = window.setTimeout(async () => {
      const currentRefresh = this.selectRefreshToken();
      if (!currentRefresh) {
        this.stopAutoRefresh();
        return;
      }

      try {
        const result = await this.doRefresh();
        this.setAuthData(result.access, result.refresh, result.user);
        this.resetTimer();
      } catch (e) {
        if (this.consecutiveFailures >= this.maxConsecutiveFailures) {
          this.onLogout();
        } else {
          this.resetTimer();
        }
        console.error(e);
      }
    }, delay);
  }
  public stopAutoRefresh(): void {
    if (this.timerId !== null) {
      this.consecutiveFailures = 0;
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private resetTimer(): void {
    this.stopAutoRefresh();
    this.startAutoRefresh();
  }
}
