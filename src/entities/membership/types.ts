export interface ProjectMembershipActionResponse {
  id: number;
  user_id: number;
  username: string;
  project_id: number;
  project_title: string;
  project_role_id: number;
  project_role_name: string | null;
  status: 'active' | 'left' | 'removed';
  joined_at: string;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
}
