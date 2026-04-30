export interface UserSummary {
  sub: string | null;
  name: string | null;
  email: string | null;
  department?: string | null;
}

export interface Epic {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  created_at: string;
  deadline?: string;
  epic_id: string; 
  created_by: UserSummary;
  assignee?: UserSummary;
}

export interface ProjectEpicsResponse {
  data: Epic[];
}
