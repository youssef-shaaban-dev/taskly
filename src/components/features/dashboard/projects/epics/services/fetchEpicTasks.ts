import { API_ENDPOINTS } from "@/constant";
import { EpicTask } from "../types";
import { apiClient } from "@/utils/apiClient";

export const fetchEpicTasks = async (epicId: string): Promise<EpicTask[]> => {
  const url = `${API_ENDPOINTS.PROJECT_TASKS}?epic_id=eq.${epicId}`;

  const response = await apiClient(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to load tasks");
  }

  const data = await response.json();
  return data || [];
};
