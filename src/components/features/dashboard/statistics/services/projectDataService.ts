import { API_ENDPOINTS } from "@/constant";
import { apiClient } from "@/utils/apiClient";

export interface SimpleProject {
  id: string;
  title: string;
}

export const fetchAllProjectsSimpleService = async (): Promise<SimpleProject[]> => {
  // Use a large limit to fetch all for dropdown
  const response = await apiClient(`${API_ENDPOINTS.GET_PROJECTS}?limit=1000&offset=0`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
};
