import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCalendarStatsService, fetchTasksPerProjectService } from "@/components/features/dashboard/statistics/services/statisticsService";
import { CalendarStatsParams, ProjectCountParams } from "@/components/features/dashboard/statistics/types";

export const fetchCalendarStatsThunk = createAsyncThunk(
  "statistics/fetchCalendarStats",
  async (params: CalendarStatsParams, { rejectWithValue }) => {
    try {
      const response = await fetchCalendarStatsService(params);
      return response;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch statistics";
      return rejectWithValue(message);
    }
  }
);

export const fetchTasksPerProjectThunk = createAsyncThunk(
  "statistics/fetchTasksPerProject",
  async (params: ProjectCountParams, { rejectWithValue }) => {
    try {
      const response = await fetchTasksPerProjectService(params);
      return response;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch task project counts";
      return rejectWithValue(message);
    }
  }
);
