import React from "react";
import { ProjectTask, formatStatusForUI } from "../types";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";
import { Pagination } from "@/components/shared/Pagination";

interface TasksListProps {
  tasks: ProjectTask[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onTaskClick: (taskId: string) => void;
  searchQuery?: string;
}

export const TasksList = ({
  tasks,
  isLoading,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onTaskClick,
  searchQuery = ""
}: TasksListProps) => {
  if (isLoading && tasks.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm animate-pulse">
        <div className="h-12 bg-slate-50 border-b border-slate-100" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 border-b border-slate-50 mx-4" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Task ID</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Title</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Due Date</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Assignee</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const assigneeName = task.assignee?.name;
              const status = task.status;
              
              return (
                <tr 
                  key={task.id} 
                  onClick={() => onTaskClick(task.id)}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors group cursor-pointer"
                >                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-primary">{task.task_id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-700">{task.title}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                      (status === "TO_DO" || status === "TODO") && "bg-slate-100 text-slate-500",
                      (status === "IN_PROGRESS" || status === "INPROGRESS") && "bg-blue-50 text-blue-500",
                      (status === "DONE" || status === "COMPLETED") && "bg-emerald-50 text-emerald-500",
                      status === "BLOCKED" && "bg-red-50 text-red-500",
                      status === "IN_REVIEW" && "bg-purple-50 text-purple-500",
                      status === "URGENT" && "bg-red-100 text-red-600",
                      !["TO_DO", "TODO", "IN_PROGRESS", "INPROGRESS", "DONE", "COMPLETED", "BLOCKED", "IN_REVIEW", "URGENT"].includes(status) && "bg-slate-100 text-slate-500"
                    )}>
                      {formatStatusForUI(status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-slate-500">
                      {task.due_date ? formatDate(task.due_date) : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold overflow-hidden border border-white shadow-sm">
                        {assigneeName 
                          ? assigneeName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()
                          : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        }
                      </div>
                      <span className="text-xs font-semibold text-slate-600 truncate max-w-[120px]">
                        {assigneeName || "Unassigned"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-300 hover:text-slate-600 transition-colors p-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {tasks.length === 0 && !isLoading && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
             <p className="text-slate-400 font-medium italic">
               {searchQuery ? "No tasks found matching your search" : "No tasks found for this project"}
             </p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        currentItemsCount={tasks.length}
        onPageChange={onPageChange}
        label="tasks"
      />
    </div>
  );
};
