"use client";

import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchEpicsThunk } from "@/store/slices/epics/epicThunks";
import { resetEpics } from "@/store/slices/epics/epicSlice";

export const useProjectEpics = (projectId: string, limit: number = 6) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    epics, 
    isLoading, 
    isLoadMoreLoading, 
    error, 
    totalCount, 
    currentPage 
  } = useSelector((state: RootState) => state.epics);

  const loadEpics = useCallback(
    (page: number, isLoadMore: boolean = false, search?: string) => {
      dispatch(fetchEpicsThunk({ projectId, page, limit, isLoadMore, search }));
    },
    [projectId, limit, dispatch]
  );

  // Search logic with debounce
  useEffect(() => {
    if (!projectId) return;

    const timer = setTimeout(() => {
      dispatch(resetEpics());
      loadEpics(1, false, searchQuery);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [projectId, searchQuery, dispatch, loadEpics]);

  const fetchNextPage = useCallback(() => {
    if (!isLoadMoreLoading && epics.length < totalCount) {
      loadEpics(currentPage + 1, true, searchQuery);
    }
  }, [isLoadMoreLoading, epics.length, totalCount, currentPage, loadEpics, searchQuery]);

  const setPage = useCallback((page: number) => {
    loadEpics(page, false, searchQuery);
  }, [loadEpics, searchQuery]);

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
    searchQuery,
    setSearchQuery,
    fetchNextPage,
    setPage,
    refetch: () => loadEpics(currentPage, false, searchQuery),
  };
};
