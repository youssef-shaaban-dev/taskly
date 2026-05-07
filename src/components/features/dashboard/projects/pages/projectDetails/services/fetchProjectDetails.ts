import { API_ENDPOINTS } from "@/constant";
import { Project } from "@/components/features/dashboard/projects/main/types";
import { apiClient } from "@/utils/apiClient";

export const fetchProjectDetails = async (id: string): Promise<Project> => {
  const url = `${API_ENDPOINTS.UPDATE_PROJECT}?id=eq.${id}`;
  const response = await apiClient(url, { method: "GET" });

  if (!response.ok) throw new Error("Failed to fetch project details");

  const data = await response.json();

  if (!data || data.length === 0)
    throw new Error(data.error.message || "Project NOt Found");

  return data[0];
};
