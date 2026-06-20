import { Api } from '../../shared/api/api.class';
import { ROLE_INTERESTS } from '../../shared/api/constants';
import type { RoleInterestActionResponse } from './types';

export class RoleInterestService {
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async accept(interestId: number): Promise<RoleInterestActionResponse> {
    const uri = `${ROLE_INTERESTS}${interestId}/accept/`;
    return this.api.post<RoleInterestActionResponse>(uri, {});
  }

  async reject(interestId: number): Promise<RoleInterestActionResponse> {
    const uri = `${ROLE_INTERESTS}${interestId}/reject/`;
    return this.api.post<RoleInterestActionResponse>(uri, {});
  }
}
