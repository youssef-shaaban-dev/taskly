import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectTasks } from "../services/fetchProjectTasks";

export const useProjectTasks = (projectId: string, pageSize: number = 10, searchQuery: string = "") => {
  const [currentPage, setCurrentPage] = useState(1);

  // Derived offset logic
  const currentOffset = (currentPage - 1) * pageSize;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["tasks", { projectId, pageSize, currentOffset, searchQuery }],
    queryFn: () => fetchProjectTasks({
      projectId,
      limit: pageSize,
      offset: currentOffset,
      search: searchQuery
    }),
    enabled: !!projectId,
    placeholderData: (previousData) => previousData,
  });

  const tasks = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Handle setting custom page smoothly
  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    tasks,
    isLoading,
    error: error ? (error instanceof Error ? error.message : "Failed to load tasks") : null,
    totalCount,
    currentPage,
    totalPages,
    setPage,
    refetch
  };
};
