import { Api } from '../../shared/api/api.class';
import type { Skill, SkillCreateRequest, SkillListParams } from './types';
import { SKILLS } from '@shared/api/constants';

export class SkillService {
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  list(params?: SkillListParams): Promise<Skill[]> {
    return this.api.get<Skill[]>(SKILLS, params);
  }

  create(data: SkillCreateRequest): Promise<Skill> {
    return this.api.post<Skill>(SKILLS, data);
  }
}
