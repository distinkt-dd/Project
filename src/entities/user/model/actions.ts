import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@app';
import { UserService } from '@entities/user';
import type {
  CurrentUser,
  UserUpdateRequest,
  AvatarUpdateRequest,
  AvatarResponse,
  SetPasswordRequest,
} from '@entities/user/types';

const userService = new UserService(api);

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Неизвестная ошибка';

export const fetchCurrentUser = createAsyncThunk<
  CurrentUser,
  void,
  { rejectValue: string }
>('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    return await userService.getCurrent();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateCurrentUser = createAsyncThunk<
  CurrentUser,
  UserUpdateRequest,
  { rejectValue: string }
>('user/updateCurrentUser', async (data, { rejectWithValue }) => {
  try {
    return await userService.updateCurrent(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const uploadUserAvatar = createAsyncThunk<
  AvatarResponse,
  AvatarUpdateRequest,
  { rejectValue: string }
>('user/uploadAvatar', async (data, { rejectWithValue }) => {
  try {
    return await userService.uploadAvatar(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteUserAvatar = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('user/deleteAvatar', async (_, { rejectWithValue }) => {
  try {
    await userService.deleteAvatar();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const setUserPassword = createAsyncThunk<
  void,
  SetPasswordRequest,
  { rejectValue: string }
>('user/setPassword', async (data, { rejectWithValue }) => {
  try {
    await userService.setPassword(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
