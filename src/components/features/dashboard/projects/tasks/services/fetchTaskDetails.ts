import { API_ENDPOINTS } from "@/constant";
import { ProjectTask } from "../types";
import { apiClient } from "@/utils/apiClient";

export const fetchTaskDetails = async (
  projectId: string,
  taskId: string
): Promise<ProjectTask | null> => {
  const response = await apiClient(API_ENDPOINTS.PROJECT_TASKS, {
    params: {
      project_id: `eq.${projectId}`,
      id: `eq.${taskId}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch task details");
  }

  const data = await response.json();
  
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  
  return null;
};
