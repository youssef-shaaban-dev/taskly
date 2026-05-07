import { fetchProjectsService } from "@/components/features/dashboard/projects/main/services/projectService";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchProjectsArgs {
  page: number;
  limit: number;
  isLoadMore?: boolean;
}

export const fetchProjectsThunk = createAsyncThunk(
  "projects/fetch",
  async (
    { page, limit, isLoadMore = false }: FetchProjectsArgs,
    { rejectWithValue },
  ) => {
    try {
      const offset = (page - 1) * limit;

      const { data, totalCount } = await fetchProjectsService({
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
        error instanceof Error ? error.message : "Failed to load projects";
      return rejectWithValue(message);
    }
  },
);
