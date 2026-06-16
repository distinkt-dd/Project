import { Api } from '../../shared/api/api.class'; // предполагаемый путь к классу Api
import type {
  TokenLoginRequest,
  TokenPairResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
} from './types';
import { AUTH } from '../../shared/api/constants';

export class AuthService {
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  login(data: TokenLoginRequest): Promise<TokenPairResponse> {
    return this.api.post<TokenPairResponse>(`${AUTH}login/`, data);
  }

  refresh(data: TokenRefreshRequest): Promise<TokenRefreshResponse> {
    return this.api.post<TokenRefreshResponse>(`${AUTH}refresh/`, data);
  }
}
