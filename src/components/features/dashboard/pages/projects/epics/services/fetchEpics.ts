import { API_ENDPOINTS } from "@/constant";
import { Epic } from "../types";
import { apiClient } from "@/utils/apiClient";

export const fetchProjectEpics = async (projectId: string): Promise<Epic[]> => {
  const response = await apiClient(`${API_ENDPOINTS.PROJECT_EPICS}?project_id=eq.${projectId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project epics");
  }

  return response.json();
};
