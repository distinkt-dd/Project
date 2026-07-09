export interface Specialization {
  id: number;
  field_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SpecializationListParams {
  search?: string;
  field_id?: number;

  [key: string]: string | number | undefined;
}
