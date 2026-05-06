import { useState, useEffect, useCallback, useRef } from "react";
import { ProjectTask, TaskStatus } from "../types";
import { fetchTasksByStatus } from "../services/fetchTasksByStatus";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTasks as setReduxTasks } from "@/store/slices/tasks/taskSlice";

const PAGE_SIZE = 10;

export const useTasksByStatus = (projectId: string | undefined, status: TaskStatus | string) => {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector((state) => state.tasks.tasks);
  const tasks = allTasks.filter((t) => t.status === status);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const tasksRef = useRef<ProjectTask[]>([]);
  tasksRef.current = tasks;

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

      const { data, totalCount: total } = await fetchTasksByStatus(projectId, status, PAGE_SIZE, offset);
      
      dispatch(setReduxTasks(data));
      setTotalCount(total);
      setHasMore(tasksRef.current.length + data.length < total);
      if (!isInitial) {
        pageRef.current = currentPage;
      }
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, [projectId, status, dispatch]);

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
