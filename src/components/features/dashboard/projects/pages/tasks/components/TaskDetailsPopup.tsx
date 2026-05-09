"use client";

import  { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { useTaskDetails } from "../hooks/useTaskDetails";
import { formatStatusForUI, ProjectTask, TASK_STATUSES, TaskStatus } from "../types";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";
import { XIcon, ArchitectureIcon } from "@/components/icons";
import { useProjectMembers } from "@/components/features/dashboard/projects/pages/projectMembers/hooks/useProjectMembers";
import { useProjectEpics } from "@/components/features/dashboard/projects/pages/epics/hooks/useProjectEpics";
import { toast } from "sonner";

interface TaskDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  taskId: string | null;
}

export const TaskDetailsPopup = ({ isOpen, onClose, projectId, taskId }: TaskDetailsPopupProps) => {
  const { task, isLoading, error, updatingFields, updateTaskField } = useTaskDetails(projectId, taskId);
  const { members } = useProjectMembers();
  const { epics, isLoading: isLoadingEpics } = useProjectEpics(projectId, 100);

  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [isEditingEpic, setIsEditingEpic] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const [prevTask, setPrevTask] = useState<ProjectTask | null>(null);

  if (task !== prevTask) {
    setPrevTask(task);
    setLocalTitle(task ? task.title : "");
    setLocalDescription(task ? task.description || "" : "");
  }

  // Handle deleted epic edge case
  useEffect(() => {
    if (task?.epic?.id && epics.length > 0 && !isLoadingEpics) {
      const exists = epics.some((ep) => ep.id === task.epic?.id);
      if (!exists) {
        updateTaskField("epic", { epic_id: null }, { epic: null });
      }
    }
  }, [epics, task?.epic?.id, isLoadingEpics, updateTaskField]);

  const todayString = new Date().toISOString().split("T")[0];

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
              <div className="flex-1 p-8 md:p-10 md:border-r border-slate-50 flex flex-col animate-fadeIn">
                {updatingFields.title ? (
                  <div className="h-10 bg-slate-100 animate-pulse rounded-lg w-3/4 mb-8" />
                ) : (
                  <input
                    type="text"
                    value={localTitle}
                    onChange={(e) => setLocalTitle(e.target.value)}
                    onBlur={async () => {
                      if (!localTitle.trim()) {
                        toast.error("Task title is required.");
                        setLocalTitle(task.title);
                        return;
                      }
                      await updateTaskField(
                        "title",
                        { title: localTitle.trim() },
                        { title: localTitle.trim() }
                      );
                    }}
                    className="text-2xl font-black text-slate-900 mb-8 leading-tight w-full border-b border-transparent hover:border-slate-200 focus:border-primary focus:outline-none bg-transparent transition-all py-1"
                    placeholder="Task Title"
                    disabled={updatingFields.title}
                  />
                )}

                <div className="space-y-4 flex-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</h3>
                  {updatingFields.description ? (
                    <div className="h-32 bg-slate-100 animate-pulse rounded-lg" />
                  ) : (
                    <textarea
                      value={localDescription}
                      onChange={(e) => setLocalDescription(e.target.value)}
                      onBlur={async () => {
                        const value = localDescription.trim() || null;
                        await updateTaskField(
                          "description",
                          { description: value },
                          { description: value ?? undefined }
                        );
                      }}
                      className="text-sm text-slate-600 leading-relaxed w-full min-h-[150px] border border-transparent hover:border-slate-200 focus:border-slate-300 focus:outline-none rounded-xl p-3 bg-slate-50/20 focus:bg-white transition-all custom-scrollbar resize-none"
                      placeholder="No description provided for this task."
                      disabled={updatingFields.description}
                    />
                  )}
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="w-full md:w-80 p-8 md:p-10 bg-slate-50/30 flex flex-col gap-8 shrink-0 border-t md:border-t-0 border-slate-50">
                {/* Status */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</h3>
                  {isEditingStatus ? (
                    <select
                      value={task.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value as TaskStatus;
                        await updateTaskField(
                          "status",
                          { status: newStatus },
                          { status: newStatus }
                        );
                        setIsEditingStatus(false);
                      }}
                      onBlur={() => setIsEditingStatus(false)}
                      className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-primary w-full bg-white font-bold uppercase tracking-wider"
                      disabled={updatingFields.status}
                      autoFocus
                    >
                      {TASK_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {formatStatusForUI(status)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div
                      onClick={() => !updatingFields.status && setIsEditingStatus(true)}
                      className={cn(
                        "inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm cursor-pointer border hover:scale-105 transition-all select-none",
                        task.status === "TO_DO" && "bg-white text-slate-500 border-slate-200 hover:bg-slate-50",
                        task.status === "IN_PROGRESS" && "bg-blue-500 text-white border-transparent hover:bg-blue-600",
                        task.status === "DONE" && "bg-emerald-500 text-white border-transparent hover:bg-emerald-600",
                        task.status === "BLOCKED" && "bg-red-500 text-white border-transparent hover:bg-red-600",
                        !["TO_DO", "IN_PROGRESS", "DONE", "BLOCKED"].includes(task.status) &&
                          "bg-slate-500 text-white border-transparent hover:bg-slate-600",
                        updatingFields.status && "opacity-50 pointer-events-none animate-pulse"
                      )}
                    >
                      {formatStatusForUI(task.status)}
                    </div>
                  )}
                </div>

                {/* Assignee */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignee</h3>
                  {isEditingAssignee ? (
                    <select
                      value={task.assignee?.id || "unassigned"}
                      onChange={async (e) => {
                        const val = e.target.value;
                        const assigneeId = val === "unassigned" ? null : val;
                        const selectedMember = members.find((m) => m.user_id === assigneeId);

                        const optimisticAssignee = selectedMember
                          ? {
                              id: selectedMember.user_id,
                              name: selectedMember.metadata.name,
                              email: selectedMember.metadata.email,
                              department: selectedMember.metadata.department,
                            }
                          : null;

                        await updateTaskField(
                          "assignee",
                          { assignee_id: assigneeId },
                          { assignee: optimisticAssignee }
                        );
                        setIsEditingAssignee(false);
                      }}
                      onBlur={() => setIsEditingAssignee(false)}
                      className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-primary w-full bg-white font-medium"
                      disabled={updatingFields.assignee}
                      autoFocus
                    >
                      <option value="unassigned">Unassigned</option>
                      {members.map((member) => (
                        <option key={member.user_id} value={member.user_id}>
                          {member.metadata.name || member.email}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div
                      onClick={() => !updatingFields.assignee && setIsEditingAssignee(true)}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-all select-none",
                        updatingFields.assignee && "opacity-50 pointer-events-none animate-pulse"
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm overflow-hidden shrink-0">
                        {task.assignee?.name ? (
                          task.assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        )}
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
                  )}
                </div>

                {/* Epic */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Epic</h3>
                  {isEditingEpic ? (
                    <select
                      value={task.epic?.id || "none"}
                      onChange={async (e) => {
                        const val = e.target.value;
                        const epicId = val === "none" ? null : val;
                        const selectedEpic = epics.find((ep) => ep.id === epicId);

                        const optimisticEpic = selectedEpic
                          ? {
                              id: selectedEpic.id,
                              title: selectedEpic.title,
                              epic_id: selectedEpic.epic_id,
                            }
                          : null;

                        await updateTaskField(
                          "epic",
                          { epic_id: epicId },
                          { epic: optimisticEpic }
                        );
                        setIsEditingEpic(false);
                      }}
                      onBlur={() => setIsEditingEpic(false)}
                      className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-primary w-full bg-white font-medium"
                      disabled={updatingFields.epic}
                      autoFocus
                    >
                      <option value="none">None</option>
                      {epics.map((epic) => (
                        <option key={epic.id} value={epic.id}>
                          {epic.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div
                      onClick={() => !updatingFields.epic && setIsEditingEpic(true)}
                      className={cn(
                        "flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-all select-none",
                        updatingFields.epic && "opacity-50 pointer-events-none animate-pulse"
                      )}
                    >
                      <ArchitectureIcon size={16} className="text-slate-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-600">
                        {task.epic?.title || "No Epic"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Reporter */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reporter</h3>
                  <div className="flex items-center gap-3 opacity-80 select-none">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold border border-slate-200 overflow-hidden shrink-0">
                      {task.created_by?.name ? (
                        task.created_by.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      )}
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
                    {isEditingDueDate ? (
                      <input
                        type="date"
                        value={task.due_date ? task.due_date.substring(0, 10) : ""}
                        min={todayString}
                        onChange={async (e) => {
                          const val = e.target.value;
                          if (!val) {
                            await updateTaskField("due_date", { due_date: null }, { due_date: undefined });
                            setIsEditingDueDate(false);
                            return;
                          }

                          const selectedDate = new Date(val);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          if (isNaN(selectedDate.getTime())) {
                            toast.error("Invalid date selected.");
                            return;
                          }

                          if (selectedDate < today) {
                            toast.error("Due date cannot be in the past.");
                            return;
                          }

                          const isoString = selectedDate.toISOString();
                          await updateTaskField("due_date", { due_date: isoString }, { due_date: isoString });
                          setIsEditingDueDate(false);
                        }}
                        onBlur={() => setIsEditingDueDate(false)}
                        className="border border-slate-200 rounded-xl px-2 py-1 text-[11px] text-slate-700 focus:outline-none focus:border-primary w-full bg-white font-medium"
                        disabled={updatingFields.due_date}
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => !updatingFields.due_date && setIsEditingDueDate(true)}
                        className={cn(
                          "flex items-center gap-1.5 p-1.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-all text-slate-600 font-bold text-xs select-none",
                          updatingFields.due_date && "opacity-50 pointer-events-none animate-pulse"
                        )}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{task.due_date ? formatDate(task.due_date) : "Set Date"}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Created At</h3>
                    <span className="text-xs font-bold text-slate-600 block p-1.5 select-none">
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
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
