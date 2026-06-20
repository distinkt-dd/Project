export interface RoleInterestActionResponse {
  id: number;
  user_id: number;
  username: string;
  project_id: number;
  project_title: string;
  project_role_id: number;
  project_role_name: string | null;
  source: 'application' | 'invitation';
  status: 'pending' | 'accepted' | 'rejected';
  membership_id: number | null;
  membership_status: 'active' | 'left' | 'removed' | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}
