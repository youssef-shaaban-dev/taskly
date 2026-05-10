import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarStatsResponse, ProjectCountResponse } from "@/components/features/dashboard/statistics/types";
import { fetchCalendarStatsThunk, fetchTasksPerProjectThunk } from "./statisticsThunks";

export interface StatisticsState {
  calendarStats: CalendarStatsResponse | null;
  projectCounts: ProjectCountResponse[];
  isLoadingStats: boolean;
  isLoadingProjects: boolean;
  statsError: string | null;
  projectsError: string | null;
}

const initialState: StatisticsState = {
  calendarStats: null,
  projectCounts: [],
  isLoadingStats: false,
  isLoadingProjects: false,
  statsError: null,
  projectsError: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    clearStatisticsError: (state) => {
      state.statsError = null;
      state.projectsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Calendar Stats
      .addCase(fetchCalendarStatsThunk.pending, (state) => {
        state.isLoadingStats = true;
        state.statsError = null;
      })
      .addCase(fetchCalendarStatsThunk.fulfilled, (state, action: PayloadAction<CalendarStatsResponse>) => {
        state.isLoadingStats = false;
        state.calendarStats = action.payload;
      })
      .addCase(fetchCalendarStatsThunk.rejected, (state, action) => {
        state.isLoadingStats = false;
        state.statsError = action.payload as string;
      })
      // Project Counts
      .addCase(fetchTasksPerProjectThunk.pending, (state) => {
        state.isLoadingProjects = true;
        state.projectsError = null;
      })
      .addCase(fetchTasksPerProjectThunk.fulfilled, (state, action: PayloadAction<ProjectCountResponse[]>) => {
        state.isLoadingProjects = false;
        state.projectCounts = action.payload;
      })
      .addCase(fetchTasksPerProjectThunk.rejected, (state, action) => {
        state.isLoadingProjects = false;
        state.projectsError = action.payload as string;
      });
  },
});

export const { clearStatisticsError } = statisticsSlice.actions;
export default statisticsSlice.reducer;
