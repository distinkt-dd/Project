import { Api } from '@shared/api/api.class';
import { AuthService } from '@entities/auth/AuthService';

const baseUrl =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  'http://localhost:8000';

const api = new Api(baseUrl);
const auth = new AuthService(api);

export { api, auth };
export interface Services {
  api: Api;
  auth: AuthService;
}
