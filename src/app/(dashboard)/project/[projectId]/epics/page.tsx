"use client";

import { use, useState, useMemo } from "react";
import { useProjectEpics } from "@/components/features/dashboard/pages/projects/epics/hooks/useProjectEpics";
import { useProjectDetails } from "@/components/features/dashboard/pages/projects/projectDetails/hooks/useProjectDetails";
import { EpicsHeader } from "@/components/features/dashboard/pages/projects/epics/components/EpicsHeader";
import { EpicCard } from "@/components/features/dashboard/pages/projects/epics/components/EpicCard";
import { EpicListSkeleton } from "@/components/features/dashboard/pages/projects/epics/components/EpicListSkeleton";
import { EmptyEpics } from "@/components/features/dashboard/pages/projects/epics/components/EmptyEpics";
import { EpicsError } from "@/components/features/dashboard/pages/projects/epics/components/EpicsError";
import { ChevronIcon } from "@/components/icons";

interface EpicsPageProps {
  params: Promise<{ projectId: string }>;
}

export default function EpicsPage({ params }: EpicsPageProps) {
  const { projectId } = use(params);
  const { epics, isLoading, error, refetch } = useProjectEpics(projectId);
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

      {isLoading ? (
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

          {/* Pagination Placeholder UI */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Showing {filteredEpics.length} of {epics.length} epics
            </p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-slate-300 hover:bg-slate-50 transition-colors cursor-not-allowed">
                <ChevronIcon size={16} direction="left" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white text-xs font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors">
                <ChevronIcon size={16} direction="right" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}