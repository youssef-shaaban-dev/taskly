export type ProjectRole = "Owner" | "Admin" | "Member" | "Viewer";

export interface ProjectMember {
  id: string;
  user_id: string;
  project_id: string;
  role: ProjectRole;
  created_at: string;
  user_details: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}
