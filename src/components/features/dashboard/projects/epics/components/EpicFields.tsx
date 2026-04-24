import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/utils/cn";
import { ProjectMember } from "../../projectMembers/types";

interface EpicFieldsProps {
  members: ProjectMember[];
  isLoadingMembers: boolean;
}

export const EpicFields = ({ members, isLoadingMembers }: EpicFieldsProps) => {
  const { register, control, formState: { errors } } = useFormContext();

  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: "",
  });

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
        <label className="w-full md:w-32 pt-3 text-[10px] font-black text-slate-800 uppercase tracking-[0.1em]">
          Title <span className="text-red-500">*</span>
        </label>
        <div className="flex-1">
          <input
            type="text"
            {...register("title")}
            className={cn(
              "w-full p-4 rounded-md border text-sm transition-all focus:outline-none focus:ring-2",
              errors.title
                ? "bg-red-50/50 border-red-200 focus:ring-red-100"
                : "bg-[#F4F7FE] border-transparent focus:bg-white focus:border-primary focus:ring-primary/10 text-slate-900"
            )}
            placeholder="e.g., Structural Schematic Phase"
          />
          {errors.title && (
            <p className="text-red-500 text-[10px] mt-2 flex items-center gap-1 font-bold uppercase tracking-wider">
              <span className="text-xs">ⓘ</span> {errors.title?.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
        <div className="w-full md:w-32 flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-800 uppercase tracking-[0.1em]">
            Description
          </label>
          <span className="text-[10px] text-slate-400 font-medium">Optional</span>
        </div>
        <div className="flex-1">
          <textarea
            {...register("description")}
            rows={5}
            className={cn(
              "w-full p-4 rounded-md border text-sm transition-all focus:outline-none focus:ring-2 resize-none",
              errors.description
                ? "bg-red-50/50 border-red-200 focus:ring-red-100"
                : "bg-[#F4F7FE] border-transparent focus:bg-white focus:border-primary focus:ring-primary/10 text-slate-900"
            )}
            placeholder="Describe the scope and objectives of this epic..."
          />
          <div className="flex items-center justify-end mt-2">
            <span className={cn(
              "text-[10px] font-bold tracking-tight",
              (descriptionValue?.length || 0) > 500 ? "text-red-500" : "text-slate-400"
            )}>
              {(descriptionValue?.length || 0)}/500 characters
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Assignee */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
            Assignee
          </label>
          <select
            {...register("assignee_id")}
            disabled={isLoadingMembers}
            className={cn(
              "w-full p-4 rounded-md border text-sm transition-all focus:outline-none focus:ring-2 bg-[#F4F7FE] border-transparent focus:bg-white focus:border-primary focus:ring-primary/10 text-slate-900 appearance-none",
              isLoadingMembers && "opacity-50 cursor-not-allowed"
            )}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1.25rem",
            }}
          >
            <option value="">Select a member...</option>
            {members.map((member) => (
              member.user_details && (
                <option key={member.id} value={member.user_id}>
                  {member.user_details.name}
                </option>
              )
            ))}
          </select>
        </div>

        {/* Deadline */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
            Deadline
          </label>
          <input
            type="date"
            {...register("deadline")}
            className={cn(
              "w-full p-4 rounded-md border text-sm transition-all focus:outline-none focus:ring-2",
              errors.deadline
                ? "bg-red-50/50 border-red-200 focus:ring-red-100"
                : "bg-[#F4F7FE] border-transparent focus:bg-white focus:border-primary focus:ring-primary/10 text-slate-900"
            )}
          />
          {errors.deadline && (
            <p className="text-red-500 text-[10px] mt-2 flex items-center gap-1 font-bold uppercase tracking-wider">
              <span className="text-xs">ⓘ</span> {errors.deadline?.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
