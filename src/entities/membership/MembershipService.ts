import { Api } from '../../shared/api/api.class';
import { MEMBERSHIPS } from '../../shared/api/constants';
import type { ProjectMembershipActionResponse } from './types';

export class MembershipService {
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async leave(membershipId: number): Promise<ProjectMembershipActionResponse> {
    const uri = `${MEMBERSHIPS}${membershipId}/leave/`;
    return this.api.post<ProjectMembershipActionResponse>(uri, {});
  }

  async remove(membershipId: number): Promise<ProjectMembershipActionResponse> {
    const uri = `${MEMBERSHIPS}${membershipId}/remove/`;
    return this.api.post<ProjectMembershipActionResponse>(uri, {});
  }
}
