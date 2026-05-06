import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { TASK_STATUSES, TaskStatus } from "../types";
import { TasksBoardColumn } from "./TasksBoardColumn";
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useBoardDnD } from "../hooks/useBoardDnD";
import { formatDate } from "@/utils/formatDate";

interface TasksBoardProps {
  projectId: string;
  onTaskClick: (taskId: string) => void;
}

const STATUS_COLORS: Record<TaskStatus, string> = {
  TO_DO: "bg-slate-400",
  IN_PROGRESS: "bg-blue-500",
  BLOCKED: "bg-red-500",
  IN_REVIEW: "bg-purple-500",
  READY_FOR_QA: "bg-orange-400",
  REOPENED: "bg-pink-500",
  READY_FOR_PRODUCTION: "bg-indigo-500",
  DONE: "bg-emerald-500",
};

export const TasksBoard = ({ projectId, onTaskClick }: TasksBoardProps) => {
  const { handleDragEnd } = useBoardDnD();
  const [activeId, setActiveId] = useState<string | null>(null);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const activeTask = tasks.find((t) => t.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEndInternal = async (event: DragEndEvent) => {
    setActiveId(null);
    await handleDragEnd(event);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEndInternal}>
      <div className="flex flex-1 w-full overflow-hidden mt-6">
        <div className="flex items-start gap-6 overflow-x-auto pb-6 custom-scrollbar w-full h-[calc(100vh-220px)] min-h-[500px]">
          {TASK_STATUSES.map((status) => (
            <TasksBoardColumn 
              key={status} 
              projectId={projectId} 
              status={status} 
              statusColor={STATUS_COLORS[status]} 
              onTaskClick={onTaskClick}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="flex flex-col bg-white border border-primary/30 rounded-xl p-4 shadow-md cursor-grabbing select-none w-72 opacity-90 scale-105 transition-transform">
            <p className="text-sm font-bold text-slate-800 leading-snug mb-4">
              {activeTask.title}
            </p>

            <div className="flex items-center justify-between mt-auto">
              {/* Due Date */}
              <div className="flex items-center gap-1.5 text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {activeTask.due_date ? formatDate(activeTask.due_date) : "NO DATE"}
                </span>
              </div>

              {/* Assignee Avatar */}
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold overflow-hidden border-2 border-white shadow-sm" title={activeTask.assignee?.name || "Unassigned"}>
                {activeTask.assignee?.name
                  ? activeTask.assignee.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                  : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                }
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

