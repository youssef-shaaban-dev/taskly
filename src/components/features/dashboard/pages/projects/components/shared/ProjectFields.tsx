"use client";
import { useFormContext, useWatch } from "react-hook-form";

export const ProjectFields = () => {
  const { register, control, formState: { errors } } = useFormContext();

  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: "",
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Project Title <span className="text-error">*</span>
        </label>
        <input
          type="text"
          {...register("name")}
          className={`w-full p-3 rounded-md border text-sm transition-colors focus:outline-none focus:ring-1 
            ${errors.name
              ? "bg-error/5 border-error focus:ring-error"
              : "bg-[#F4F7FE] border-transparent focus:border-primary focus:ring-primary text-slate-900"
            }
          `}
          placeholder="Enter project title..."
        />
        {errors.name && (
          <p className="text-error text-xs mt-1.5 flex items-center gap-1 font-medium">
            <span className="text-sm">⚠</span> {errors.name?.message as string}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Description
          </label>
          <span className="text-xs text-slate-400">Optional</span>
        </div>
        <textarea
          {...register("description")}
          rows={4}
          className={`w-full p-3 rounded-md border text-sm transition-colors focus:outline-none focus:ring-1 resize-none
            ${errors.description
              ? "bg-error/5 border-error focus:ring-error"
              : "bg-[#F4F7FE] border-transparent focus:border-primary focus:ring-primary text-slate-900"
            }
          `}
          placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
        />
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex-1">
            {errors.description && (
              <p className="text-error text-xs flex items-center gap-1 font-medium">
                <span className="text-sm">⚠</span> {errors.description?.message as string}
              </p>
            )}
          </div>
          <span className={`text-[10px] font-bold ${(descriptionValue?.length || 0) > 500 ? "text-error" : "text-slate-400"}`}>
            {(descriptionValue?.length || 0)}/500 characters
          </span>
        </div>
      </div>
    </div>
  );
};
