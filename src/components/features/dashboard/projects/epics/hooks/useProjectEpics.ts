"use client";

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchEpicsThunk } from "@/store/slices/epics/epicThunks";
import { resetEpics } from "@/store/slices/epics/epicSlice";

export const useProjectEpics = (projectId: string, limit: number = 6) => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    epics, 
    isLoading, 
    isLoadMoreLoading, 
    error, 
    totalCount, 
    currentPage 
  } = useSelector((state: RootState) => state.epics);

  const loadEpics = useCallback(
    (page: number, isLoadMore: boolean = false) => {
      dispatch(fetchEpicsThunk({ projectId, page, limit, isLoadMore }));
    },
    [projectId, limit, dispatch]
  );

  // Initial load or project change
  useEffect(() => {
    if (projectId) {
      dispatch(resetEpics());
      loadEpics(1, false);
    }
  }, [projectId, dispatch, loadEpics]);

  const fetchNextPage = useCallback(() => {
    if (!isLoadMoreLoading && epics.length < totalCount) {
      loadEpics(currentPage + 1, true);
    }
  }, [isLoadMoreLoading, epics.length, totalCount, currentPage, loadEpics]);

  const setPage = useCallback((page: number) => {
    loadEpics(page, false);
  }, [loadEpics]);

  const totalPages = Math.ceil(totalCount / limit);
  const hasMore = epics.length < totalCount;

  return {
    epics,
    isLoading,
    isLoadMoreLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    hasMore,
    fetchNextPage,
    setPage,
    refetch: () => loadEpics(currentPage, false),
  };
};
