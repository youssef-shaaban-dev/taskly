import { useState, useEffect } from "react";
import { ProjectTask, TaskStatus } from "../types";
import { fetchTasksByStatus } from "../services/fetchTasksByStatus";

const PAGE_SIZE = 10;

export const useTasksByStatus = (projectId: string | undefined, status: TaskStatus | string) => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadTasks = async (isInitial = false) => {
    if (!projectId) return;

    try {
      if (isInitial) {
        setIsLoading(true);
        setPage(1);
      } else {
        setIsFetchingMore(true);
      }
      
      setError(null);
      const currentPage = isInitial ? 1 : page + 1;
      const offset = (currentPage - 1) * PAGE_SIZE;

      const { data, totalCount: total } = await fetchTasksByStatus(projectId, status, PAGE_SIZE, offset);
      
      setTasks(prev => isInitial ? data : [...prev, ...data]);
      setTotalCount(total);
      setHasMore(tasks.length + data.length < total);
      if (!isInitial) setPage(currentPage);
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    loadTasks(true);
  }, [projectId, status, loadTasks]);

  const loadMore = () => {
    if (!isLoading && !isFetchingMore && hasMore) {
      loadTasks(false);
    }
  };

  return { 
    tasks, 
    isLoading, 
    isFetchingMore, 
    error, 
    hasMore, 
    totalCount, 
    loadMore 
  };
};
