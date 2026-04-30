import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { updateEpic } from "@/store/slices/epics/epicSlice";
import { useUpdateEpic } from "../../hooks/useUpdateEpic";
import { Epic } from "../../types";
import { ProjectMember } from "../../../projectMembers/types";
import { UserIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

interface Props {
  epic: Epic;
  members: ProjectMember[];
  isLoadingMembers: boolean;
}

export const EpicInlineAssignee = ({ epic, members, isLoadingMembers }: Props) => {
  const dispatch = useDispatch();
  const { updateField, updatingField } = useUpdateEpic(epic.id);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAssigneeId = e.target.value === "unassigned" ? null : e.target.value;

    const member = members.find((m) => m.user_id === newAssigneeId);
    const assigneeData = member && member.user_details
      ? {
          sub: member.user_id,
          name: member.user_details.name,
          email: member.user_details.email,
          avatar_url: member.user_details.avatar_url,
        }
      : undefined;

    updateField(
      "assignee_id",
      newAssigneeId,
      epic.assignee_id,
      () => {
        dispatch(
          updateEpic({
            id: epic.id,
            assignee_id: newAssigneeId || undefined,
            assignee: newAssigneeId ? assigneeData : undefined,
          })
        );
      }
    );
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-2.5 h-8">
      {isEditing ? (
        <select
          autoFocus
          value={epic.assignee_id || "unassigned"}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          disabled={updatingField === "assignee_id" || isLoadingMembers}
          className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded px-2 py-1 outline-none focus:border-primary w-full"
        >
          <option value="unassigned">Unassigned</option>
          {members.map(
            (m) =>
              m.user_details && (
                <option key={m.id} value={m.user_id}>
                  {m.user_details.name}
                </option>
              )
          )}
        </select>
      ) : (
        <div
          className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 p-1 -ml-1 rounded transition-colors group"
          onClick={() => setIsEditing(true)}
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-white shadow-sm group-hover:border-primary/20 transition-colors">
            {epic.assignee?.avatar_url ? (
              <Image
                src={epic.assignee.avatar_url}
                alt=""
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400">
                <UserIcon size={14} />
              </div>
            )}
          </div>
          <span
            className={cn(
              "text-xs font-bold truncate group-hover:text-primary transition-colors",
              epic.assignee ? "text-slate-700" : "text-slate-400 italic"
            )}
          >
            {epic.assignee?.name || "Unassigned"}
          </span>
        </div>
      )}
    </div>
  );
};
