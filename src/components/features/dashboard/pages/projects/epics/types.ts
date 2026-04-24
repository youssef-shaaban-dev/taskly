export interface UserSummary {
  sub: string;
  name: string;
  email: string;
  department?: string;
  avatar_url?: string;
}

export interface Epic {
  id: string;
  epic_id: string;
  title: string;
  description?: string;
  deadline?: string;
  created_at: string;
  project_id: string;
  assignee_id?: string;
  created_by_id: string;
  status?: string;
  created_by: UserSummary;
  assignee?: UserSummary;
}

export interface ProjectEpicsResponse {
  data: Epic[];
}
