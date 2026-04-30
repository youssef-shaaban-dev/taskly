import { useState, useEffect } from "react";
import { fetchEpicTasks } from "../services/fetchEpicTasks";
import { EpicTask } from "../types";

export const useEpicTasks = (epicId: string | undefined) => {
  const [tasks, setTasks] = useState<EpicTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!epicId) {
      setTasks([]);
      return;
    }

    let isMounted = true;

    const loadTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchEpicTasks(epicId);
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
  }, [epicId]);

  return { tasks, isLoading, error };
};
