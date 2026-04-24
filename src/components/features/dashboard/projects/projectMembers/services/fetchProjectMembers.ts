import { API_ENDPOINTS } from "@/constant";
import { apiClient } from "@/utils/apiClient";
import { ProjectMember } from "../types";

export const fetchProjectMembers = async (projectId: string): Promise<ProjectMember[]> => {
  const url = `${API_ENDPOINTS.PROJECT_MEMBERS}?project_id=eq.${projectId}`;
  const response = await apiClient(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load project members. Please try again.");
  }

  return response.json();
};
