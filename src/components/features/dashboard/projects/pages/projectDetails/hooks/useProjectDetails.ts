import { useQuery } from "@tanstack/react-query";
import { fetchProjectDetails } from "../services/fetchProjectDetails";

export const useProjectDetails = (projectId: string) => {
  const { data: project = null, isLoading: isFetchingProject, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectDetails(projectId),
    enabled: !!projectId,
  });

  const projectError = error ? (error instanceof Error ? error.message : "Failed to load details") : null;

  return { 
    project, 
    isFetchingProject, 
    projectError 
  };
};
