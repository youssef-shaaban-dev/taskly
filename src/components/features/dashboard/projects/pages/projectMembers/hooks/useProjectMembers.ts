import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { ProjectMember } from "../types";
import { fetchProjectMembers } from "../services/fetchProjectMembers";

export const useProjectMembers = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProjectMembers(projectId);
      setMembers(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load project members. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      loadMembers();
    }
  }, [projectId, loadMembers]);

  return {
    members,
    isLoading,
    error,
    projectId,
    retry: loadMembers,
  };
};
