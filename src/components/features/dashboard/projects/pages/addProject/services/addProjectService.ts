import { ProjectFormValues } from "@/components/features/dashboard/projects/main/schemas/projectSchema";
import { API_ENDPOINTS } from "@/constant";
import { apiClient } from "@/utils/apiClient";

export const addProjectService = async (data: ProjectFormValues) => {
  const response = await apiClient(API_ENDPOINTS.CREATE_PROJECT, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create project");
  }

  return response;
};
