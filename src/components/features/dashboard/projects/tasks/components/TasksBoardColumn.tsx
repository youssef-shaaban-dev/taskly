import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTasksByStatus } from "../hooks/useTasksByStatus";
import { formatStatusForUI, TaskStatus } from "../types";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";

interface TasksBoardColumnProps {
  projectId: string;
  status: TaskStatus;
  statusColor?: string;
  onTaskClick: (taskId: string) => void;
}

export const TasksBoardColumn = ({ projectId, status, statusColor = "bg-slate-300", onTaskClick }: TasksBoardColumnProps) => {
  const { tasks, isLoading, error } = useTasksByStatus(projectId, status);

  return (
    <div className="flex flex-col flex-shrink-0 w-80 bg-slate-50/50 rounded-2xl p-3 h-full overflow-hidden border border-slate-100">
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
      <div className="flex flex-col gap-3 overflow-y-auto flex-1 pb-2 custom-scrollbar">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 bg-white border border-slate-100 rounded-xl p-4 animate-pulse" />
          ))
        ) : error ? (
          <div className="text-xs text-red-500 font-semibold p-2 bg-red-50 rounded-lg text-center border border-red-100">
            Failed to load
          </div>
        ) : (
          tasks.map((task) => {
            const assigneeName = task.assignee?.name;

            return (
              <div 
                key={task.id}
                onClick={() => onTaskClick(task.id)}
                className="flex flex-col bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
              >
                <p className="text-sm font-bold text-slate-800 leading-snug mb-4 group-hover:text-primary transition-colors">
                  {task.title}
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
                      {task.due_date ? formatDate(task.due_date) : "NO DATE"}
                    </span>
                  </div>

                  {/* Assignee Avatar */}
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold overflow-hidden border-2 border-white shadow-sm" title={assigneeName || "Unassigned"}>
                    {assigneeName 
                      ? assigneeName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()
                      : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    }
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
