import { API_ENDPOINTS } from "@/constant";
import { UpdateProjectPayload } from "../types";
import { apiClient } from "@/utils/apiClient";

export const updateProjectService = async (
  id: string,
  payload: UpdateProjectPayload,
) => {
  const url = `${API_ENDPOINTS.UPDATE_PROJECT}?id=eq.${id}`;
  const response = await apiClient(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Failed to update project");
  return response.json();
};
