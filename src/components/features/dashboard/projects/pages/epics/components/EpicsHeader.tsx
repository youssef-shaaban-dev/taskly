import { PlusIcon, SearchIcon } from "@/components/icons";
import Link from "next/link";
import { ProjectHeader } from "@/components/features/dashboard/projects/main/components/shared/ProjectHeader";
import { ROUTES } from "@/constant";

interface EpicsHeaderProps {
  projectId: string;
  projectName: string;
  onSearch: (query: string) => void;
}

export const EpicsHeader = ({ projectId, projectName, onSearch }: EpicsHeaderProps) => {
  return (
    <ProjectHeader
      title="Project Epics"
      breadcrumbs={[
        { label: "Projects", href: ROUTES.PROJECTS },
        { label: projectName },
        { label: "Epics", active: true },
      ]}
      action={
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative group min-w-[240px]">
            <SearchIcon
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Search epics..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-11 text-slate-900 pr-4 py-2.5 bg-[#f4f7fe]/50 border border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-lg text-sm font-medium transition-all outline-none"
            />
          </div>
          <Link
            href={`/project/${projectId}/epics/new`}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <PlusIcon size={18} />
            New Epic
          </Link>
        </div>
      }
    />
  );
};
