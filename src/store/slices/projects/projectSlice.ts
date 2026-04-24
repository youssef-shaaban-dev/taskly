import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProjectsThunk } from "./projectThunks";
import { Project } from "@/components/features/dashboard/projects/types";

interface ProjectsState {
  projects: Project[];
  currentPage: number;
  limit: number;
  totalCount: number;
  isLoading: boolean;
  isLoadMoreLoading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  currentPage: 1,
  limit: 6,
  totalCount: 0,
  isLoading: true,
  isLoadMoreLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsThunk.pending, (state, action) => {
        state.error = null;
        if (action.meta.arg.isLoadMore) {
          state.isLoadMoreLoading = true;
        } else {
          state.isLoading = true;
        }
      })
      .addCase(fetchProjectsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadMoreLoading = false;

        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.page;

        if (action.payload.isLoadMore) {
          state.projects = [...state.projects, ...action.payload.data];
        } else {
          state.projects = action.payload.data;
        }
      })
      .addCase(fetchProjectsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadMoreLoading = false;
        state.error = action.payload as string || "Failed to load projects";
      });
  },
});

export const { setLimit } = projectSlice.actions;
export default projectSlice.reducer;