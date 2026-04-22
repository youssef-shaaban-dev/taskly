import Link from "next/link";
import { ROUTES } from "@/constant";

export const AddProjectHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
        <Link href={ROUTES.PROJECTS} className="text-slate-400 hover:text-slate-600">
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
  );
};