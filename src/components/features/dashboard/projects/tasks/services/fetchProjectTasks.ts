import { API_ENDPOINTS } from "@/constant";
import { ProjectTask } from "../types";
import { apiClient } from "@/utils/apiClient";

interface FetchProjectTasksParams {
  projectId: string;
  limit: number;
  offset: number;
  search?: string;
  status?: string;
}

export const fetchProjectTasks = async ({
  projectId,
  limit,
  offset,
  search,
  status
}: FetchProjectTasksParams): Promise<{ data: ProjectTask[]; totalCount: number }> => {
  const params: Record<string, string> = {
    project_id: `eq.${projectId}`,
    limit: limit.toString(),
    offset: offset.toString(),
  };

  if (search) {
    params.title = `ilike.*${search}*`;
  }

  if (status) {
    params.status = `eq.${status}`;
  }

  const response = await apiClient(API_ENDPOINTS.PROJECT_TASKS, {
    method: "GET",
    headers: {
      Prefer: "count=exact",
    },
    params
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project tasks");
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
