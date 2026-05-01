import { useState, useEffect } from "react";
import { ProjectTask, TaskStatus } from "../types";
import { fetchTasksByStatus } from "../services/fetchTasksByStatus";

export const useTasksByStatus = (projectId: string | undefined, status: TaskStatus | string) => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTasksByStatus(projectId, status);
        if (isMounted) {
          setTasks(data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load tasks");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, [projectId, status]);

  return { tasks, isLoading, error };
};
