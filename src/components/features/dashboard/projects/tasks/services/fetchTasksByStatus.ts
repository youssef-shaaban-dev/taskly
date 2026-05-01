import { API_ENDPOINTS } from "@/constant";
import { ProjectTask, TaskStatus } from "../types";
import { apiClient } from "@/utils/apiClient";

export const fetchTasksByStatus = async (
  projectId: string,
  status: TaskStatus | string
): Promise<ProjectTask[]> => {
  const response = await apiClient(API_ENDPOINTS.PROJECT_TASKS, {
    params: { 
      project_id: `eq.${projectId}`,
      status: `eq.${status}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};
