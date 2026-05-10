import { useQuery } from "@tanstack/react-query";
import { fetchCalendarStatsService, fetchTasksPerProjectService } from "../services/statisticsService";
import { CalendarStatsParams, ProjectCountParams } from "../types";

export const useCalendarStats = (params: CalendarStatsParams) => {
  return useQuery({
    queryKey: ["calendarStats", params],
    queryFn: () => fetchCalendarStatsService(params),
    // Only fetch if parameters are set
    enabled: !!params.p_start_date && !!params.p_end_date,
  });
};

export const useTasksPerProject = (params: ProjectCountParams) => {
  return useQuery({
    queryKey: ["tasksPerProject", params],
    queryFn: () => fetchTasksPerProjectService(params),
    enabled: !!params.p_start_date && !!params.p_end_date,
  });
};
