import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";

export interface FetchProjectsParams {
  limit: number;
  offset: number;
}


export const fetchProjectsService = async ({
  limit,
  offset,
}: FetchProjectsParams) => {
  const url = `${API_ENDPOINTS.GET_PROJECTS}?limit=${limit}&offset=${offset}`;

  const response = await apiClient(url, {
    method: "GET",
    headers: {
      "Prefer": "count=exact"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects. Please try again later.");
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
