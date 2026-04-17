"use client";

import Link from "next/link";
import { DashboardIcon } from "@/components/icons";
import { useAddProject } from "@/components/features/dashboard/hooks/useAddProject";

export default function AddProjectPage() {
  const { form, isSubmitting, descriptionValue, onSubmit } = useAddProject();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="max-w-4xl mx-auto w-full pb-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
          <Link href="/dashboard/projects" className="text-slate-400 hover:text-slate-600">
            Projects
          </Link>
          <span className="text-slate-400">&gt;</span>
          <span className="text-primary">Add New Project</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Add New Project</h1>
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
          >
            <span>+</span> Invite Member
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <DashboardIcon />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Initialize New Project</h2>
              <p className="text-sm text-slate-500">
                Define the scope and foundational details of your project.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  <span className="text-sm">⚠</span> {errors.name.message}
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
                      <span className="text-sm">⚠</span> {errors.description.message}
                    </p>
                  )}
                </div>
                <span className={`text-[10px] font-bold ${descriptionValue.length > 500 ? "text-error" : "text-slate-400"}`}>
                  {descriptionValue.length}/500 characters
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <Link
                href="/dashboard/projects"
                className="w-full sm:w-auto text-sm font-bold text-slate-500 hover:text-slate-700 text-center py-2 px-4 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-primary text-white px-6 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Creating..." : "Create Project"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-[#F9FAFC] p-4 px-6 md:px-8 border-t border-slate-100 flex items-start gap-3">
          <div className="mt-0.5 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-7 7c0 2.2 1.3 4.1 3 5.3V16a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1.7c1.7-1.2 3-3.1 3-5.3a7 7 0 0 0-7-7z" />
            </svg>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700">Pro Tip:</span> You can invite project members and assign epics immediately after the initial creation process.
          </p>
        </div>
      </div>
    </div>
  );
}