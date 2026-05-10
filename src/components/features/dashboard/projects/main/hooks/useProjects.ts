import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectsService } from "../services/projectService";
import { Project } from "../types";

export const useProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMoreMode, setIsLoadMoreMode] = useState(false);
  const [accumulatedProjects, setAccumulatedProjects] = useState<Project[]>([]);
  const limit = 6;

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["projects", currentPage, limit],
    queryFn: () => fetchProjectsService({ limit, offset: (currentPage - 1) * limit }),
    // Keep data consistent across page changes for pagination UX
    placeholderData: (previousData) => previousData,
  });

  const fetchedProjects = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // Intelligent Sync: Decides whether to replace or append items
  useEffect(() => {
    if (!data) return;

    if (isLoadMoreMode) {
      // On Mobile/LoadMore: append new projects that don't already exist to accumulated list
      setAccumulatedProjects(prev => {
        // Basic unique deduplication
        const existingIds = new Set(prev.map((p: Project) => p.id));
        const nextItems = fetchedProjects.filter((p: Project) => !existingIds.has(p.id));
        return [...prev, ...nextItems];
      });
    } else {
      // On Desktop/Pagination: list is exactly what we just fetched
      setAccumulatedProjects(fetchedProjects);
    }
  }, [data, isLoadMoreMode, fetchedProjects]);

  const goToPage = useCallback((page: number) => {
    setIsLoadMoreMode(false); // Switching to specific page wipes accumulated list
    setCurrentPage(page);
  }, []);

  const loadMore = useCallback(() => {
    if (currentPage < totalPages && !isFetching) {
      setIsLoadMoreMode(true); // Enables appending mode
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages, isFetching]);

  return {
    projects: accumulatedProjects,
    isLoading: isLoading && accumulatedProjects.length === 0, // Initial load only
    isLoadMoreLoading: isFetching && isLoadMoreMode,
    error: error ? (error instanceof Error ? error.message : "An error occurred") : null,
    pagination: {
      currentPage,
      totalCount,
      limit,
      totalPages,
      goToPage,
    },
    loadMore,
    refetch,
  };
};
