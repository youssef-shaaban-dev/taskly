import { API_ENDPOINTS } from "@/constant";
import { Epic } from "../types";
import { apiClient } from "@/utils/apiClient";

interface FetchEpicsParams {
  projectId: string;
  limit: number;
  offset: number;
}

export const fetchProjectEpics = async ({
  projectId,
  limit,
  offset,
}: FetchEpicsParams): Promise<{ data: Epic[]; totalCount: number }> => {
  const url = `${API_ENDPOINTS.PROJECT_EPICS}?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`;

  const response = await apiClient(url, {
    method: "GET",
    headers: {
      Prefer: "count=exact",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project epics");
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

export const fetchEpicById = async (projectId: string, epicId: string): Promise<Epic> => {
  const url = `${API_ENDPOINTS.PROJECT_EPICS}?project_id=eq.${projectId}&id=eq.${epicId}`;

  const response = await apiClient(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch epic details");
  }

  const data = await response.json();
  if (!data || data.length === 0) {
    throw new Error("Epic not found");
  }

  return data[0];
};
