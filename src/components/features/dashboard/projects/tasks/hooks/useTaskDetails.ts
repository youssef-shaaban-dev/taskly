import { useState, useEffect } from "react";
import { ProjectTask } from "../types";
import { fetchTaskDetails } from "../services/fetchTaskDetails";

export const useTaskDetails = (projectId: string, taskId: string | null) => {
  const [task, setTask] = useState<ProjectTask | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (!projectId || !taskId) {
        setTask(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchTaskDetails(projectId, taskId);
        setTask(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load task details");
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [projectId, taskId]);

  return { task, isLoading, error };
};
