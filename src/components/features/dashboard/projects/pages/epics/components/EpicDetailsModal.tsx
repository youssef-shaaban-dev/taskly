"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/utils/cn";
import { XIcon, PlusIcon } from "@/components/icons";
import { fetchEpicById } from "../services/fetchEpics";
import { useProjectMembers } from "../../projectMembers/hooks/useProjectMembers";
import { EpicInlineTitle } from "./inline-editors/EpicInlineTitle";
import { EpicInlineDescription } from "./inline-editors/EpicInlineDescription";
import { EpicInlineAssignee } from "./inline-editors/EpicInlineAssignee";
import { EpicInlineDeadline } from "./inline-editors/EpicInlineDeadline";
import { EpicTasksList } from "./EpicTasksList";
import { ROUTES } from "@/constant";

interface EpicDetailsModalProps {
  projectId: string;
  epicId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EpicDetailsModal = ({ projectId, epicId, isOpen, onClose }: EpicDetailsModalProps) => {
  const { data: selectedEpic, isLoading: isDetailsLoading } = useQuery({
    queryKey: ["epic", epicId],
    queryFn: () => fetchEpicById(projectId, epicId as string),
    enabled: !!epicId && isOpen,
  });

  const { members, isLoading: isLoadingMembers } = useProjectMembers();

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-3 w-full">
            <span className={cn(
              "px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider uppercase bg-blue-50 text-blue-600"
            )}>
              {selectedEpic?.epic_id || "EPIC-..."}
            </span>
            {selectedEpic && <EpicInlineTitle key={selectedEpic.id} epic={selectedEpic} />}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all ml-4 shrink-0"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isDetailsLoading ? (
            <div className="space-y-8 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-20 bg-slate-50 rounded" />
              <div className="grid grid-cols-3 gap-6">
                <div className="h-12 bg-slate-50 rounded" />
                <div className="h-12 bg-slate-50 rounded" />
                <div className="h-12 bg-slate-50 rounded" />
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Description</h4>
                {selectedEpic && <EpicInlineDescription key={selectedEpic.id} epic={selectedEpic} />}
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Created By */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Created By</h4>
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-white shadow-sm">
                      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 text-[10px] font-bold">
                        {selectedEpic?.created_by?.name?.charAt(0) || "U"}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 truncate">{selectedEpic?.created_by?.name || "Unknown"}</span>
                  </div>
                </div>

                {/* Assignee */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Assignee</h4>
                  {selectedEpic && (
                    <EpicInlineAssignee
                      key={selectedEpic.id}
                      epic={selectedEpic}
                      members={members}
                      isLoadingMembers={isLoadingMembers}
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Deadline</h4>
                  {selectedEpic && <EpicInlineDeadline key={selectedEpic.id} epic={selectedEpic} />}
                </div>
              </div>

              {/* Tasks Section */}
              <div className="pt-10 border-t border-slate-50 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-slate-900">Epic Tasks</h3>
                  <Link 
                    href={`${ROUTES.PROJECTS}/${selectedEpic?.project_id}${ROUTES.ADD_TASK}?epicId=${selectedEpic?.id}`}
                    onClick={onClose}
                    className="text-primary hover:text-primary-dark text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-all"
                  >
                    <PlusIcon size={14} />
                    Add Task
                  </Link>
                </div>

                <EpicTasksList epicId={selectedEpic?.id} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
