"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectEpics } from "../services/fetchEpics";

export const useProjectEpics = (projectId: string, initialLimit: number = 6) => {
  // Search state handling
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // UI Modes/Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(initialLimit);
  const [viewMode, setViewMode] = useState<"pagination" | "loadMore">("pagination");

  // Debounce effect purely for search input (Safe from cascading renders warnings as it syncs client UI)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      // Reset view state whenever search changes to show fresh first batch
      setCurrentPage(1);
      setMobileVisibleCount(initialLimit);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery, initialLimit]);

  // Compute request params
  const currentOffset = viewMode === "loadMore" ? 0 : (currentPage - 1) * initialLimit;
  const currentLimit = viewMode === "loadMore" ? mobileVisibleCount : initialLimit;

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["epics", { projectId, limit: currentLimit, offset: currentOffset, search: debouncedSearch }],
    queryFn: () => fetchProjectEpics({
      projectId,
      limit: currentLimit,
      offset: currentOffset,
      search: debouncedSearch,
    }),
    enabled: !!projectId,
    placeholderData: (previousData) => previousData,
  });

  const epics = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / initialLimit);

  const fetchNextPage = useCallback(() => {
    if (mobileVisibleCount < totalCount && !isFetching) {
      setViewMode("loadMore");
      setMobileVisibleCount((prev) => prev + initialLimit);
    }
  }, [mobileVisibleCount, totalCount, isFetching, initialLimit]);

  const setPage = useCallback((page: number) => {
    setViewMode("pagination");
    setCurrentPage(page);
  }, []);

  return {
    epics,
    isLoading: isLoading && epics.length === 0,
    isLoadMoreLoading: isFetching && viewMode === "loadMore",
    error: error ? (error instanceof Error ? error.message : "An error occurred") : null,
    totalCount,
    currentPage,
    totalPages,
    hasMore: epics.length < totalCount,
    searchQuery,
    setSearchQuery,
    fetchNextPage,
    setPage,
    refetch,
  };
};
