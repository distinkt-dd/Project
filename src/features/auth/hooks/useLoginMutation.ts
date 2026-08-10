import { getServices } from '@app';
import type {
  TokenLoginRequest,
  TokenPairResponse,
} from '@entities/auth/types';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

type LoginContext = string | undefined;

export const useLoginMutation = (): UseMutationResult<
  TokenPairResponse,
  Error,
  TokenLoginRequest,
  LoginContext
> => {
  const { auth } = getServices();

  return useMutation({
    mutationFn: (data: TokenLoginRequest) => auth.login(data),
  });
};
