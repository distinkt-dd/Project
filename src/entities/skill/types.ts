export interface Skill {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SkillCreateRequest {
  name: string;
}

export interface SkillListParams {
  search?: string;
  ordering?: string;

  [key: string]: string | number | undefined;
}
