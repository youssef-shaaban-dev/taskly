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


export interface UpdateTaskPayload {
  title?: string;
  description?: string | null;
  assignee_id?: string | null;
  epic_id?: string | null;
  due_date?: string | null;
  status?: TaskStatus;
}

export const updateTaskDetailsService = async (taskId: string, payload: UpdateTaskPayload) => {
  const url = `${API_ENDPOINTS.TASKS}?id=eq.${taskId}`;

  const response = await apiClient(url, {
    method: "PATCH",
    headers: {
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update task details.");
  }

  return true;
};