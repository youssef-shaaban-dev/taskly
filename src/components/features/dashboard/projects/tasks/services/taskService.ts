import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";
import { CreateTaskPayload } from "../types";

export const createTaskService = async (payload: CreateTaskPayload) => {
  const url = API_ENDPOINTS.TASKS;

  const response = await apiClient(url, {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create task. Please try again.");
  }

  return true;
};
