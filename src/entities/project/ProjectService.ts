import { Api } from '../../shared/api/api.class';
import type {
  PaginatedProjects,
  ProjectCreateRequest,
  ProjectDetail,
  ProjectUpdateRequest,
  GetProjectsParams,
  CurrentUserApplicationCard,
  ProjectInvitationCard,
  ProjectApplicationCard,
  ProjectInvitationCreateRequest,
  PaginationParams,
} from './types';
import { PROJECTS } from '../../shared/api/constants';

export class ProjectService {
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  list(params?: GetProjectsParams): Promise<PaginatedProjects> {
    return this.api.get<PaginatedProjects>(PROJECTS, params);
  }

  createProject(data: ProjectCreateRequest): Promise<ProjectDetail> {
    return this.api.post<ProjectDetail>(PROJECTS, data);
  }

  getFeaturedProjects(params?: PaginationParams): Promise<PaginatedProjects> {
    return this.api.get<PaginatedProjects>(`${PROJECTS}featured/`, params);
  }

  getProjectDetail(projectId: number): Promise<ProjectDetail> {
    return this.api.get<ProjectDetail>(`${PROJECTS}${projectId}/`);
  }

  updateProject(
    projectId: number,
    data: ProjectUpdateRequest
  ): Promise<ProjectDetail> {
    return this.api.patch<ProjectDetail>(`${PROJECTS}${projectId}/`, data);
  }

  getProjectApplications(
    projectId: number,
    params?: PaginationParams
  ): Promise<ProjectApplicationCard[]> {
    return this.api.get<ProjectApplicationCard[]>(
      `${PROJECTS}${projectId}/applications/`,
      params
    );
  }

  createProjectApplication(
    projectId: number
  ): Promise<CurrentUserApplicationCard> {
    return this.api.post<CurrentUserApplicationCard>(
      `${PROJECTS}${projectId}/applications/`
    );
  }

  getProjectInvitations(
    projectId: number,
    params?: PaginationParams
  ): Promise<ProjectInvitationCard[]> {
    return this.api.get<ProjectInvitationCard[]>(
      `${PROJECTS}${projectId}/invitations/`,
      params
    );
  }

  createProjectInvitation(
    projectId: number,
    data: ProjectInvitationCreateRequest
  ): Promise<ProjectInvitationCard> {
    return this.api.post<ProjectInvitationCard>(
      `${PROJECTS}${projectId}/invitations/`,
      data
    );
  }
}
