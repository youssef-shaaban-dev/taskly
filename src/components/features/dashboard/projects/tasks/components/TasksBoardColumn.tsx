import Link from "next/link";
import { useTasksByStatus } from "../hooks/useTasksByStatus";
import { formatStatusForUI, TaskStatus } from "../types";
import { cn } from "@/utils/cn";
import { InfiniteScrollObserver } from "@/components/shared/InfiniteScrollObserver";
import { useDroppable } from "@dnd-kit/core";
import { DraggableTaskCard } from "./DraggableTaskCard";

interface TasksBoardColumnProps {
  projectId: string;
  status: TaskStatus;
  statusColor?: string;
  onTaskClick: (taskId: string) => void;
}

export const TasksBoardColumn = ({ projectId, status, statusColor = "bg-slate-300", onTaskClick }: TasksBoardColumnProps) => {
  const {
    tasks,
    isLoading,
    isFetchingMore,
    error,
    hasMore,
    loadMore
  } = useTasksByStatus(projectId, status);

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="flex flex-col shrink-0 w-80 bg-slate-50/50 rounded-2xl p-3 h-full overflow-hidden border border-slate-100">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", statusColor)} />
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {formatStatusForUI(status)}
          </h3>
          <span className="text-xs font-semibold text-slate-400 ml-1">
            {tasks.length}
          </span>
        </div>

        <Link
          href={`/project/${projectId}/tasks/new?status=${status}`}
          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </Link>
      </div>

      {/* Add New Task Button */}
      <Link
        href={`/project/${projectId}/tasks/new?status=${status}`}
        className="flex items-center justify-center gap-2 w-full py-3 mb-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-primary/40 hover:text-primary transition-colors hover:bg-primary/5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        ADD NEW TASK
      </Link>

      {/* Task List */}
      <div
        ref={setNodeRef}
        className="flex flex-col gap-3 overflow-y-auto flex-1 pb-2 custom-scrollbar min-h-[200px]"
      >
        {isLoading && tasks.length === 0 ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 bg-white border border-slate-100 rounded-xl p-4 animate-pulse" />
          ))
        ) : error ? (
          <div className="text-xs text-red-500 font-semibold p-2 bg-red-50 rounded-lg text-center border border-red-100">
            Failed to load
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <DraggableTaskCard
                key={task.id}
                task={task}
                onTaskClick={onTaskClick}
              />
            ))}

            <InfiniteScrollObserver
              onIntersect={loadMore}
              isLoading={isFetchingMore}
              hasMore={hasMore}
            />
          </>
        )}
      </div>
    </div>
  );
};



