import { API_ENDPOINTS } from "@/constant";
import { ProjectTask, TaskStatus } from "../types";
import { apiClient } from "@/utils/apiClient";

export const fetchTasksByStatus = async (
  projectId: string,
  status: TaskStatus | string,
  limit: number = 10,
  offset: number = 0
): Promise<{ data: ProjectTask[]; totalCount: number }> => {
  const response = await apiClient(API_ENDPOINTS.PROJECT_TASKS, {
    headers: {
      "Prefer": "count=exact"
    },
    params: { 
      project_id: `eq.${projectId}`,
      status: `eq.${status}`,
      limit: limit.toString(),
      offset: offset.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  const contentRange = response.headers.get("Content-Range");
  let totalCount = 0;
  
  if (contentRange) {
    const parts = contentRange.split("/");
    if (parts.length === 2) {
      totalCount = parseInt(parts[1], 10);
    }
  }

  return { data: data || [], totalCount };
};
