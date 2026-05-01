import { useState, useEffect, useCallback } from "react";
import { ProjectTask } from "../types";
import { fetchProjectTasks } from "../services/fetchProjectTasks";

export const useProjectTasks = (projectId: string, pageSize: number = 10, searchQuery: string = "") => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const loadTasks = useCallback(async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      setError(null);
      const offset = (currentPage - 1) * pageSize;
      const { data, totalCount } = await fetchProjectTasks({
        projectId,
        limit: pageSize,
        offset,
        search: searchQuery
      });
      setTasks(data);
      setTotalCount(totalCount);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, pageSize, currentPage, searchQuery]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    tasks,
    isLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    refetch: loadTasks
  };
};
