import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjectEpics, fetchEpicById } from "@/components/features/dashboard/projects/pages/epics/services/fetchEpics";

interface FetchEpicsArgs {
  projectId: string;
  page: number;
  limit: number;
  isLoadMore?: boolean;
  search?: string;
}

export const fetchEpicsThunk = createAsyncThunk(
  "epics/fetch",
  async (
    { projectId, page, limit, isLoadMore = false, search }: FetchEpicsArgs,
    { rejectWithValue }
  ) => {
    try {
      const offset = (page - 1) * limit;

      const { data, totalCount } = await fetchProjectEpics({
        projectId,
        limit,
        offset,
        search,
      });

      return {
        data,
        totalCount,
        page,
        isLoadMore,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to load epics";
      return rejectWithValue(message);
    }
  }
);

export const fetchEpicDetailsThunk = createAsyncThunk(
  "epics/fetchDetails",
  async (
    { projectId, epicId }: { projectId: string; epicId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchEpicById(projectId, epicId);
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to load epic details";
      return rejectWithValue(message);
    }
  }
);
