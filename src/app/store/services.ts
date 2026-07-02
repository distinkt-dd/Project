import { Api } from '@shared/api/api.class';
import { AuthService } from '@entities/auth/AuthService';

const baseUrl =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  'http://localhost:8000';

export interface Services {
  auth: AuthService;
}

export const createServices = (): Services => {
  const api = new Api(baseUrl);
  return {
    auth: new AuthService(api),
  };
};
