export type ProjectRole = "Owner" | "Admin" | "Member" | "Viewer";

export interface ProjectMember {
  member_id: string;
  project_id: string;
  user_id: string;
  role: ProjectRole;
  email: string;
  metadata: {
    sub: string;
    name: string;
    department: string;
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
  };
}
