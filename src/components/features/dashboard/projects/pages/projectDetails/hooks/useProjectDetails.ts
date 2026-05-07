import { useState, useEffect } from "react";
import { fetchProjectDetails } from "../services/fetchProjectDetails";
import { Project } from "../../main/types";

export const useProjectDetails = (projectId: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isFetchingProject, setIsFetchingProject] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return;
      try {
        setIsFetchingProject(true);
        setProjectError(null);
        const data = await fetchProjectDetails(projectId);
        setProject(data);
      } catch (err: unknown) {
        setProjectError(err instanceof Error ? err.message : "Failed to load project details");
      } finally {
        setIsFetchingProject(false);
      }
    };

    loadProject();
  }, [projectId]);

  return { project, isFetchingProject, projectError };
};
