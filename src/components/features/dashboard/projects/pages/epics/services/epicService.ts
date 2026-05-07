import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";

export interface CreateEpicPayload {
  title: string;
  description?: string;
  assignee_id?: string;
  project_id: string;
  deadline?: string;
}

export const createEpicService = async (payload: CreateEpicPayload) => {
  const url = API_ENDPOINTS.EPICS;

  const response = await apiClient(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create epic. Please try again.");
  }

  return true;
};

