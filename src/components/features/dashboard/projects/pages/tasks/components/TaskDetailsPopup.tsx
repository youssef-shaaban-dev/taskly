"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { useTaskDetails } from "../hooks/useTaskDetails";
import { formatStatusForUI } from "../types";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";
import { XIcon, ArchitectureIcon } from "@/components/icons";

interface TaskDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  taskId: string | null;
}

export const TaskDetailsPopup = ({ isOpen, onClose, projectId, taskId }: TaskDetailsPopupProps) => {
  const { task, isLoading, error } = useTaskDetails(projectId, taskId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl h-[80vh]">
      <div className="flex flex-col h-full bg-white">
        {/* Header (Top Bar with Close) */}
        <div className="flex items-center justify-between p-4 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">
               {task?.task_id || "..."}
             </span>
             {task?.epic && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <ArchitectureIcon size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {task.epic.title}
                  </span>
                </div>
             )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-10 space-y-8 animate-pulse">
              <div className="h-10 bg-slate-100 rounded-lg w-3/4" />
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-5/6" />
              </div>
            </div>
          ) : error ? (
            <div className="p-20 text-center">
              <p className="text-red-500 font-bold mb-2">Failed to load task details</p>
              <p className="text-slate-400 text-sm">{error}</p>
            </div>
          ) : !task ? (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-bold italic">Task not found</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Column: Info */}
              <div className="flex-1 p-8 md:p-10 md:border-r border-slate-50">
                <h1 className="text-2xl font-black text-slate-900 mb-8 leading-tight">
                  {task.title}
                </h1>

                <div className="space-y-4">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</h3>
                   <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {task.description || "No description provided for this task."}
                   </div>
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="w-full md:w-80 p-8 md:p-10 bg-slate-50/30 flex flex-col gap-10">
                {/* Status */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</h3>
                  <div className={cn(
                    "inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm",
                    task.status === "TO_DO" && "bg-white text-slate-500 border border-slate-100",
                    task.status === "IN_PROGRESS" && "bg-blue-500 text-white",
                    task.status === "DONE" && "bg-emerald-500 text-white",
                    task.status === "BLOCKED" && "bg-red-500 text-white"
                  )}>
                    {formatStatusForUI(task.status)}
                  </div>
                </div>

                {/* Assignee */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignee</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm overflow-hidden shrink-0">
                      {task.assignee?.name 
                        ? task.assignee.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()
                        : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      }
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">
                        {task.assignee?.name || "Unassigned"}
                      </span>
                      {task.assignee?.department && (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                          {task.assignee.department}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reporter */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reporter</h3>
                  <div className="flex items-center gap-3 opacity-80">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold border border-slate-200 overflow-hidden shrink-0">
                      {task.created_by?.name 
                        ? task.created_by.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()
                        : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      }
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      {task.created_by?.name || "System"}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</h3>
                    <span className="text-xs font-bold text-slate-600">
                      {task.due_date ? formatDate(task.due_date) : "-"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Created At</h3>
                    <span className="text-xs font-bold text-slate-600">
                      {formatDate(task.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer (Actions) */}
        <div className="p-4 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between shrink-0">
           <button className="text-[10px] font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-2 px-3 py-2">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
             COPY LINK
           </button>
           <button 
             onClick={onClose}
             className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-xl font-bold text-[11px] transition-all"
           >
             CLOSE
           </button>
        </div>
      </div>
    </Modal>
  );
};
