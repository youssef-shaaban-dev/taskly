import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjectEpics } from "@/components/features/dashboard/projects/epics/services/fetchEpics";

interface FetchEpicsArgs {
  projectId: string;
  page: number;
  limit: number;
  isLoadMore?: boolean;
}

export const fetchEpicsThunk = createAsyncThunk(
  "epics/fetch",
  async (
    { projectId, page, limit, isLoadMore = false }: FetchEpicsArgs,
    { rejectWithValue }
  ) => {
    try {
      const offset = (page - 1) * limit;

      const { data, totalCount } = await fetchProjectEpics({
        projectId,
        limit,
        offset,
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
