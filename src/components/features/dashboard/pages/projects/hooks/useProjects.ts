import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectsThunk } from "@/store/slices/projects/projectThunks";

export const useProjects = () => {
  const dispatch = useAppDispatch();
  const {
    projects,
    currentPage,
    limit,
    totalCount,
    isLoading,
    isLoadMoreLoading,
    error,
  } = useAppSelector((state) => state.projects);

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    dispatch(fetchProjectsThunk({ page: 1, limit }));
  }, [dispatch, limit]);

  const goToPage = useCallback(
    (page: number) => {
      dispatch(fetchProjectsThunk({ page, limit, isLoadMore: false }));
    },
    [dispatch, limit],
  );

  const loadMore = useCallback(() => {
    if (currentPage < totalPages && !isLoadMoreLoading) {
      dispatch(
        fetchProjectsThunk({ page: currentPage + 1, limit, isLoadMore: true }),
      );
    }
  }, [dispatch, currentPage, totalPages, limit, isLoadMoreLoading]);

  return {
    projects,
    isLoading,
    isLoadMoreLoading,
    error,
    pagination: {
      currentPage,
      totalCount,
      limit,
      totalPages,
      goToPage,
    },
    loadMore,
  };
};
