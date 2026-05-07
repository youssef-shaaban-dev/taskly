import { useState, useEffect, useCallback, useRef } from "react";
import { ProjectTask, TaskStatus } from "../types";
import { fetchTasksByStatus } from "../services/fetchTasksByStatus";

const PAGE_SIZE = 10;

export const useTasksByStatus = (projectId: string | undefined, status: TaskStatus | string, searchQuery: string = "") => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadTasks = useCallback(async (isInitial = false) => {
    if (!projectId) return;

    try {
      if (isInitial) {
        setIsLoading(true);
        pageRef.current = 1;
      } else {
        setIsFetchingMore(true);
      }
      
      setError(null);
      const currentPage = isInitial ? 1 : pageRef.current + 1;
      const offset = (currentPage - 1) * PAGE_SIZE;

      const { data, totalCount: total } = await fetchTasksByStatus(projectId, status as TaskStatus, PAGE_SIZE, offset, searchQuery);
      
      setTasks(prev => {
        const nextTasks = isInitial ? data : [...prev, ...data];
        setHasMore(nextTasks.length < total);
        return nextTasks;
      });
      setTotalCount(total);
      if (!isInitial) {
        pageRef.current = currentPage;
      }
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, [projectId, status, searchQuery]);

  useEffect(() => {
    loadTasks(true);
  }, [loadTasks]);

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
