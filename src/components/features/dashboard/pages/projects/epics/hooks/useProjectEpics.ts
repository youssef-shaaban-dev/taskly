import { useState, useEffect, useCallback } from "react";
import { Epic } from "../types";
import { fetchProjectEpics } from "../services/fetchEpics";

export const useProjectEpics = (projectId: string) => {
  const [epics, setEpics] = useState<Epic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEpics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProjectEpics(projectId);
      setEpics(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load epics.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      loadEpics();
    }
  }, [projectId, loadEpics]);

  return {
    epics,
    isLoading,
    error,
    refetch: loadEpics,
  };
};
