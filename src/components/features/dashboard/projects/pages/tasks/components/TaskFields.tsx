import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/utils/cn";
import { ProjectMember } from "@/components/features/dashboard/projects/pages/projectMembers/types";
import { Epic } from "@/components/features/dashboard/projects/pages/epics/types";
import Input from "@/components/ui/Input";

interface TaskFieldsProps {
  members: ProjectMember[];
  isLoadingMembers: boolean;
  epics: Epic[];
  isLoadingEpics: boolean;
}

const STATUS_OPTIONS = [
  { value: "TO_DO", label: "TO DO" },
  { value: "IN_PROGRESS", label: "IN PROGRESS" },
  { value: "BLOCKED", label: "BLOCKED" },
  { value: "IN_REVIEW", label: "IN REVIEW" },
  { value: "READY_FOR_QA", label: "READY FOR QA" },
  { value: "REOPENED", label: "REOPENED" },
  { value: "READY_FOR_PRODUCTION", label: "READY FOR PRODUCTION" },
  { value: "DONE", label: "DONE" },
];

export const TaskFields = ({ members, isLoadingMembers, epics, isLoadingEpics }: TaskFieldsProps) => {
  const { register, control, formState: { errors } } = useFormContext();

  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: "",
  });

  const truncateEpicName = (epic_id: string, title: string) => {
    const fullText = `${epic_id} ${title}`;
    if (fullText.length > 100) {
      return fullText.substring(0, 100) + "...";
    }
    return fullText;
  };

  const inputClassName = "rounded-sm px-4 py-3.5 text-[0.625rem] font-bold tracking-[0.062rem] leading-[0.94rem] bg-surface-highest text-gray border-transparent focus:bg-white focus:ring-1 focus:ring-primary/20 w-full";

  return (
    <div className="space-y-6">
      {/* Title */}
      <Input
        label="TITLE *"
        placeholder="e.g., Design System Documentation"
        {...register("title")}
        error={errors.title?.message as string}
      />

      {/* Status & Assignee Row */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Status */}
        <div className="flex flex-col gap-2 w-full">
          <label className={cn(errors.status ? "text-error" : "text-slate-400", "text-[0.6875rem] font-bold uppercase tracking-widest")}>
            STATUS *
          </label>
          <select
            {...register("status")}
            className={cn(
              inputClassName,
              errors.status ? "bg-red-50 text-error border-error/20" : "",
              "appearance-none"
            )}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          {errors.status && <span className="text-[0.6875rem] font-bold text-error mt-1">{errors.status.message as string}</span>}
        </div>

        {/* Assignee */}
        <div className="flex flex-col gap-2 w-full">
          <label className={cn(errors.assignee_id ? "text-error" : "text-slate-400", "text-[0.6875rem] font-bold uppercase tracking-widest")}>
            ASSIGNEE
          </label>
          <select
            {...register("assignee_id")}
            disabled={isLoadingMembers}
            className={cn(
              inputClassName,
              errors.assignee_id ? "bg-red-50 text-error border-error/20" : "",
              "appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <option value="">Select Team Member</option>
            {members.map((member) => (
              member.metadata && (
                <option key={member.member_id} value={member.user_id}>
                  {member.metadata.name}
                </option>
              )
            ))}
          </select>
          {errors.assignee_id && <span className="text-[0.6875rem] font-bold text-error mt-1">{errors.assignee_id.message as string}</span>}
        </div>
      </div>

      {/* Epic */}
      <div className="flex flex-col gap-2 w-full">
        <label className={cn(errors.epic_id ? "text-error" : "text-slate-400", "text-[0.6875rem] font-bold uppercase tracking-widest")}>
          EPIC
        </label>
        <select
          {...register("epic_id")}
          disabled={isLoadingEpics}
          className={cn(
            inputClassName,
            errors.epic_id ? "bg-red-50 text-error border-error/20" : "",
            "appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <option value="">Select an Epic</option>
          {epics.map((epic) => (
            <option key={epic.id} value={epic.id}>
              {truncateEpicName(epic.epic_id, epic.title)}
            </option>
          ))}
        </select>
        {errors.epic_id && <span className="text-[0.6875rem] font-bold text-error mt-1">{errors.epic_id.message as string}</span>}
      </div>

      {/* Due Date */}
      <Input
        type="date"
        label="DUE DATE"
        {...register("due_date")}
        error={errors.due_date?.message as string}
      />

      {/* Description */}
      <div className="flex flex-col gap-2 w-full relative">
        <label className={cn(errors.description ? "text-error" : "text-slate-400", "text-[0.6875rem] font-bold uppercase tracking-widest")}>
          DESCRIPTION
        </label>
        <textarea
          {...register("description")}
          rows={5}
          placeholder="Briefly describe the task scope..."
          className={cn(
            inputClassName,
            errors.description ? "bg-red-50 text-error border-error/20" : "",
            "resize-none"
          )}
        />
        <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-400">
          {descriptionValue?.length || 0} / 2000
        </div>
        {errors.description && <span className="text-[0.6875rem] font-bold text-error mt-1">{errors.description.message as string}</span>}
      </div>
    </div>
  );
};
