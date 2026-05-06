import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";
import { CreateTaskPayload, TaskStatus } from "../types";

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


export const updateTaskStatusService = async (
  task_id: string,
  newStatus: TaskStatus
) => {
  const url = `${API_ENDPOINTS.TASKS}?id=eq.${task_id}`;

  const response = await apiClient(url, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify({status: newStatus}),
  });

  if (!response.ok) {
    throw new Error("Failed to update task status. Please try again.");
  }

  return true;
};