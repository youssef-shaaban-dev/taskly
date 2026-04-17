import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/utils/apiClient";
import Cookies from "js-cookie";

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
        const response = await apiClient("/rest/v1/rpc/get_projects", {
          method: "GET",
        });

        if (response.status === 401) {
          // Token expired or invalid -> Clear auth and redirect
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch projects. Please try again later.");
        }

        const data = await response.json();
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [router]);

  return { projects, isLoading, error };
};