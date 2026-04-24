import Link from "next/link";
import { ROUTES } from "@/constant";

interface ProjectActionsProps {
  isSubmitting: boolean;
  submitLabel?: string;
  submittingLabel?: string;
  cancelHref?: string;
}

export const ProjectActions = ({ 
  isSubmitting, 
  submitLabel = "Create Project", 
  submittingLabel = "Creating...",
  cancelHref = ROUTES.PROJECTS
}: ProjectActionsProps) => {
  return (
    <>
      <div className="pt-6 border-t border-slate-50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <Link
          href={cancelHref} 
          className="w-full sm:w-auto text-sm font-bold text-slate-500 hover:text-slate-700 text-center py-2 px-4 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-primary text-white px-6 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>

      {/* Pro Tip Section */}
      <div className="bg-[#F9FAFC] p-4 px-6 md:px-8 border-t border-slate-100 flex items-start gap-3 mt-6 -mx-6 md:-mx-8 mb-6 md:mb-8">
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
    </>
  );
};
