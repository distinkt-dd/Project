import { createSlice } from '@reduxjs/toolkit';
import type { AuthUser, TokenPairResponse } from '@entities/auth/types';
import { REHYDRATE } from 'redux-persist';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: { payload: TokenPairResponse }) => {
      const { access, refresh, user } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.user = user;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      state.loading = false;
      state.error = null;
    });
  },
});

export const { setAuthData, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
