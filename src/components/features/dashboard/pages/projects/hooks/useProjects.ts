import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient(API_ENDPOINTS.GET_PROJECTS, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects. Please try again later.");
        }

        const data = await response.json();
        setProjects(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [router]);

  return { projects, isLoading, error };
};
