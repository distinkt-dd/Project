import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CurrentUser } from '@entities/user/types';
import {
  fetchCurrentUser,
  updateCurrentUser,
  uploadUserAvatar,
  deleteUserAvatar,
} from './actions';

interface UserState {
  currentUser: CurrentUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch user';
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to update user';
      })
      .addCase(uploadUserAvatar.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.avatar = action.payload.avatar;
        }
      })
      .addCase(deleteUserAvatar.fulfilled, (state) => {
        if (state.currentUser) {
          state.currentUser.avatar = null;
        }
      });
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
