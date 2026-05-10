import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectsService } from "../services/projectService";
import { Project } from "../types";

export const useProjects = () => {
  // Track parameters instead of syncing data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Used for desktop pagination limit
  const [mobileVisibleCount, setMobileVisibleCount] = useState(6); // Used for incremental growth
  const [viewMode, setViewMode] = useState<"pagination" | "loadMore">("pagination");

  // Compute dynamic fetching params based on mode
  const finalLimit = viewMode === "loadMore" ? mobileVisibleCount : pageSize;
  const finalOffset = viewMode === "loadMore" ? 0 : (currentPage - 1) * pageSize;

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["projects", { limit: finalLimit, offset: finalOffset }],
    queryFn: () => fetchProjectsService({ limit: finalLimit, offset: finalOffset }),
    placeholderData: (previousData) => previousData,
  });

  const projects = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const goToPage = useCallback((page: number) => {
    setViewMode("pagination");
    setCurrentPage(page);
  }, []);

  const loadMore = useCallback(() => {
    if (mobileVisibleCount < totalCount && !isFetching) {
      setViewMode("loadMore");
      setMobileVisibleCount((prev) => prev + pageSize);
    }
  }, [mobileVisibleCount, totalCount, isFetching, pageSize]);

  return {
    projects, // Directly derived from react-query result
    isLoading: isLoading && projects.length === 0,
    isLoadMoreLoading: isFetching && viewMode === "loadMore",
    error: error ? (error instanceof Error ? error.message : "An error occurred") : null,
    pagination: {
      currentPage,
      totalCount,
      limit: pageSize,
      totalPages,
      goToPage,
    },
    loadMore,
    refetch,
  };
};
