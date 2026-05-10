import { useState, useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TaskStatus } from "../types";
import { fetchTasksByStatus } from "../services/fetchTasksByStatus";

const PAGE_SIZE = 10;

export const useTasksByStatus = (projectId: string | undefined, status: TaskStatus | string, searchQuery: string = "") => {
  // Debounce search string
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ["tasks", "board", { projectId, status, debouncedQuery }],
    queryFn: async ({ pageParam = 0 }) => {
      if (!projectId) return { data: [], totalCount: 0 };
      return await fetchTasksByStatus(
        projectId, 
        status as TaskStatus, 
        PAGE_SIZE, 
        pageParam, 
        debouncedQuery
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const currentLoaded = allPages.reduce((acc, page) => acc + page.data.length, 0);
      return currentLoaded < lastPage.totalCount ? currentLoaded : undefined;
    },
    enabled: !!projectId,
  });

  // Flatten data structure for easy consumption by frontend list
  const tasks = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  // Map count dynamically
  const totalCount = data?.pages[0]?.totalCount || 0;

  return {
    tasks,
    isLoading,
    isFetchingMore: isFetchingNextPage,
    error: error ? (error instanceof Error ? error.message : "Failed to load tasks") : null,
    hasMore: !!hasNextPage,
    totalCount,
    loadMore: fetchNextPage
  };
};
