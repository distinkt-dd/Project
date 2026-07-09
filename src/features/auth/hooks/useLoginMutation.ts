import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { setAuthData } from '@features/auth/model/authSlice';
import type {
  TokenLoginRequest,
  TokenPairResponse,
} from '@entities/auth/types';
import { createServices, store } from '@app';

const { auth } = createServices();

type LoginContext = string | undefined;

export const useLoginMutation = (): UseMutationResult<
  TokenPairResponse,
  Error,
  TokenLoginRequest,
  LoginContext
> => {
  return useMutation({
    mutationFn: (data: TokenLoginRequest) => auth.login(data),
    onSuccess: (response) => {
      store.dispatch(setAuthData(response));
    },
    onError: (error) => {
      throw error;
    },
  });
};
