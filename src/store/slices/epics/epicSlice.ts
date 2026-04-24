import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEpicsThunk } from "./epicThunks";
import { Epic } from "@/components/features/dashboard/projects/epics/types";

interface EpicsState {
  epics: Epic[];
  currentPage: number;
  limit: number;
  totalCount: number;
  isLoading: boolean;
  isLoadMoreLoading: boolean;
  error: string | null;
}

const initialState: EpicsState = {
  epics: [],
  currentPage: 1,
  limit: 6,
  totalCount: 0,
  isLoading: true,
  isLoadMoreLoading: false,
  error: null,
};

const epicSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    resetEpics: (state) => {
      state.epics = [];
      state.currentPage = 1;
      state.totalCount = 0;
      state.isLoading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpicsThunk.pending, (state, action) => {
        state.error = null;
        if (action.meta.arg.isLoadMore) {
          state.isLoadMoreLoading = true;
        } else {
          state.isLoading = true;
        }
      })
      .addCase(fetchEpicsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadMoreLoading = false;

        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.page;

        if (action.payload.isLoadMore) {
          state.epics = [...state.epics, ...action.payload.data];
        } else {
          state.epics = action.payload.data;
        }
      })
      .addCase(fetchEpicsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadMoreLoading = false;
        state.error = (action.payload as string) || "Failed to load epics";
      });
  },
});

export const { setLimit, resetEpics } = epicSlice.actions;
export default epicSlice.reducer;
