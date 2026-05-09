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

  useEffect(() => {
    const handleTaskUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { taskId, changes, task: fullTask } = customEvent.detail || {};
      if (taskId && changes) {
        setTasks((prev) => {
          const exists = prev.some((t) => t.id === taskId);
          const nextStatus = changes.status || (exists ? prev.find((t) => t.id === taskId)?.status : null);

          if (nextStatus === status) {
            if (exists) {
              return prev.map((t) => (t.id === taskId ? { ...t, ...changes } : t));
            } else if (fullTask) {
              // Add to the top of the column if it moved to this status
              return [{ ...fullTask, ...changes }, ...prev];
            }
          }

          // If the task exists in this column but its status changed to something else, remove it
          if (exists && nextStatus && nextStatus !== status) {
            return prev.filter((t) => t.id !== taskId);
          }

          // Otherwise update fields if it is already here
          if (exists) {
            return prev.map((t) => (t.id === taskId ? { ...t, ...changes } : t));
          }

          return prev;
        });
      }
    };

    window.addEventListener("task-updated", handleTaskUpdated);
    return () => {
      window.removeEventListener("task-updated", handleTaskUpdated);
    };
  }, [status]);

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
