import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@app/store/services';
import { UserService } from '@entities/user';
import type {
  CurrentUser,
  UserUpdateRequest,
  AvatarUpdateRequest,
  AvatarResponse,
  SetPasswordRequest,
  ListUsersParams,
  PaginatedUsers,
  UserCreateRequest,
  UserPublic,
} from '@entities/user/types';

const userService = new UserService(api);

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  return 'Неизвестная ошибка';
};

//Получить список пользователей
export const fetchUsers = createAsyncThunk<
  PaginatedUsers,
  ListUsersParams | void,
  { rejectValue: string }
>('user/fetchUsers', async (params, { rejectWithValue }) => {
  try {
    return await userService.list(params ?? undefined);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

//Зарегать пользователя
export const registerUser = createAsyncThunk<
  CurrentUser,
  UserCreateRequest,
  { rejectValue: string }
>('user/registerUser', async (data, { rejectWithValue }) => {
  try {
    return await userService.create(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

//Получить инфу у пользователе с определенным id
export const fetchUserById = createAsyncThunk<
  UserPublic,
  number,
  { rejectValue: string }
>('user/fetchUserById', async (userId, { rejectWithValue }) => {
  try {
    return await userService.retrieve(userId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

//Получить пользователя
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

//Обновить пользователя
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

//Добавить аватарку
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

//Удалить аватарку
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

//Установить пароль
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
