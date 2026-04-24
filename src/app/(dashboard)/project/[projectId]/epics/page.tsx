"use client";

import { use, useState, useMemo } from "react";
import { useProjectEpics } from "@/components/features/dashboard/projects/epics/hooks/useProjectEpics";
import { useProjectDetails } from "@/components/features/dashboard/projects/projectDetails/hooks/useProjectDetails";
import { EpicsHeader } from "@/components/features/dashboard/projects/epics/components/EpicsHeader";
import { EpicCard } from "@/components/features/dashboard/projects/epics/components/EpicCard";
import { EpicListSkeleton } from "@/components/features/dashboard/projects/epics/components/EpicListSkeleton";
import { EmptyEpics } from "@/components/features/dashboard/projects/epics/components/EmptyEpics";
import { EpicsError } from "@/components/features/dashboard/projects/epics/components/EpicsError";
import { EpicDetailsModal } from "@/components/features/dashboard/projects/epics/components/EpicDetailsModal";
import { InfiniteScrollObserver } from "@/components/shared/InfiniteScrollObserver";
import { Pagination } from "@/components/shared/Pagination";

interface EpicsPageProps {
  params: Promise<{ projectId: string }>;
}

const PAGE_SIZE = 6;

export default function EpicsPage({ params }: EpicsPageProps) {
  const { projectId } = use(params);
  const { 
    epics, 
    isLoading, 
    isLoadMoreLoading, 
    error, 
    totalCount, 
    currentPage, 
    totalPages, 
    hasMore,
    fetchNextPage,
    setPage,
    refetch 
  } = useProjectEpics(projectId, PAGE_SIZE);
  
  const { project } = useProjectDetails(projectId);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEpics = useMemo(() => {
    if (!searchQuery.trim()) return epics;
    const query = searchQuery.toLowerCase();
    return epics.filter(
      (epic) =>
        epic.title.toLowerCase().includes(query) ||
        epic.epic_id.toLowerCase().includes(query)
    );
  }, [epics, searchQuery]);

  const projectName = project?.name || "Loading...";

  return (
    <div className="max-w-[1280px] mx-auto w-full pb-10 px-4 md:px-0">
      <EpicsHeader 
        projectId={projectId} 
        projectName={projectName} 
        onSearch={setSearchQuery} 
      />

      {isLoading && !isLoadMoreLoading ? (
        <EpicListSkeleton />
      ) : error ? (
        <EpicsError message={error} onRetry={refetch} />
      ) : epics.length === 0 ? (
        <EmptyEpics projectId={projectId} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {filteredEpics.map((epic) => (
              <EpicCard key={epic.id} epic={epic} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            currentItemsCount={epics.length}
            onPageChange={setPage}
            label="epics"
            className="hidden md:flex"
          />

          <InfiniteScrollObserver 
            onIntersect={fetchNextPage} 
            isLoading={isLoadMoreLoading} 
            hasMore={hasMore} 
          />
        </>
      )}

      <EpicDetailsModal />
    </div>
  );
}