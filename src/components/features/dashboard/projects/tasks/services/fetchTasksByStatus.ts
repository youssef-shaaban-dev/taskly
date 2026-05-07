import { API_ENDPOINTS } from "@/constant";
import { ProjectTask, TaskStatus } from "../types";
import { apiClient } from "@/utils/apiClient";

export const fetchTasksByStatus = async (
  projectId: string,
  status: TaskStatus,
  limit: number = 10,
  offset: number = 0,
  search?: string
): Promise<{ data: ProjectTask[]; totalCount: number }> => {
  const params: Record<string, string> = { 
    project_id: `eq.${projectId}`,
    status: `eq.${status}`,
    limit: limit.toString(),
    offset: offset.toString(),
  };

  if (search) {
    params.title = `ilike.%${search}%`;
  }

  const response = await apiClient(API_ENDPOINTS.PROJECT_TASKS, {
    headers: {
      "Prefer": "count=exact"
    },
    params,
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
