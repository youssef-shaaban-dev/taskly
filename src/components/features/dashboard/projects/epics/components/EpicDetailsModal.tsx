"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { closeEpicDetails } from "@/store/slices/epics/epicSlice";
import { cn } from "@/utils/cn";
import { XIcon, PlusIcon, ArchitectureIcon } from "@/components/icons";
import Image from "next/image";
import { useEffect } from "react";
import { useProjectMembers } from "../../projectMembers/hooks/useProjectMembers";
import { EpicInlineTitle } from "./inline-editors/EpicInlineTitle";
import { EpicInlineDescription } from "./inline-editors/EpicInlineDescription";
import { EpicInlineAssignee } from "./inline-editors/EpicInlineAssignee";
import { EpicInlineDeadline } from "./inline-editors/EpicInlineDeadline";

export const EpicDetailsModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedEpic, isDetailsModalOpen, isDetailsLoading } = useSelector(
    (state: RootState) => state.epics
  );

  const { members, isLoading: isLoadingMembers } = useProjectMembers();

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeEpicDetails());
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [dispatch]);

  if (!isDetailsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => dispatch(closeEpicDetails())}
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
            onClick={() => dispatch(closeEpicDetails())}
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
                      {selectedEpic?.created_by?.avatar_url ? (
                        <Image src={selectedEpic.created_by.avatar_url} alt="" fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 text-[10px] font-bold">
                          {selectedEpic?.created_by?.name?.charAt(0) || "U"}
                        </div>
                      )}
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
                  <button className="text-primary hover:text-primary-dark text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-all">
                    <PlusIcon size={14} />
                    Add Task
                  </button>
                </div>

                {/* Tasks Empty State */}
                <div className="bg-[#f8faff] border border-blue-50 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-blue-50 flex items-center justify-center mb-4 text-blue-100">
                    <ArchitectureIcon size={28} />
                  </div>
                  <p className="text-slate-500 text-sm font-semibold mb-6">
                    No tasks have been added to this epic yet
                  </p>
                  <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                    + Add Task
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
