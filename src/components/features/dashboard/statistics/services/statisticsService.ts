import { API_ENDPOINTS } from "@/constant";
import { apiClient } from "@/utils/apiClient";
import { CalendarStatsParams, CalendarStatsResponse, ProjectCountParams, ProjectCountResponse } from "../types";

export const fetchCalendarStatsService = async (params: CalendarStatsParams): Promise<CalendarStatsResponse> => {
  const response = await apiClient(API_ENDPOINTS.GET_TASKS_CALENDAR_STATS, {
    method: "POST",
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch statistics" }));
    throw new Error(error.message || "Failed to fetch statistics");
  }

  return response.json();
};

export const fetchTasksPerProjectService = async (params: ProjectCountParams): Promise<ProjectCountResponse[]> => {
  const response = await apiClient(API_ENDPOINTS.GET_TASKS_COUNT_PER_PROJECT, {
    method: "POST",
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch project counts" }));
    throw new Error(error.message || "Failed to fetch project counts");
  }

  return response.json();
};
