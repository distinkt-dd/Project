import type { RootState } from '@app';

export const selectAccessToken = (state: RootState): string | null =>
  state.auth.accessToken;
export const selectRefreshToken = (state: RootState): string | null =>
  state.auth.refreshToken;

export const selectIsAuthenticated = (state: RootState) => {
  return !!state.auth.accessToken && !!state.auth.user;
};

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
