import { SearchIcon } from "@/components/icons";
import { ProjectHeader } from "../../components/shared/ProjectHeader";
import { ROUTES } from "@/constant";
import { cn } from "@/utils/cn";
import Input from "@/components/ui/Input";

interface TasksHeaderProps {
  projectId: string;
  projectName: string;
  view: "list" | "board";
  onViewChange: (view: "list" | "board") => void;
  onSearch: (query: string) => void;
}

export const TasksHeader = ({ 
  projectName, 
  view, 
  onViewChange,
  onSearch 
}: TasksHeaderProps) => {
  return (
    <ProjectHeader
      title="Active Workboard"
      description={`Curating ${projectName}'s production pipeline and milestones.`}
      breadcrumbs={[
        { label: "Projects", href: ROUTES.PROJECTS },
        { label: projectName },
        { label: "Tasks", active: true },
      ]}
      action={
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative group min-w-[240px]">
            <SearchIcon 
              size={18} 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" 
            />
            <Input
              placeholder="Search tasks..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#f4f7fe]/50 border border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-lg text-sm font-medium transition-all outline-none"
            />
          </div>

          {/* View Switcher */}
          <div className="flex items-center bg-[#f4f7fe]/50 border border-slate-100 p-1 rounded-lg">
            <button
              onClick={() => onViewChange("list")}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                view === "list" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              List View
            </button>
            <button
              onClick={() => onViewChange("board")}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                view === "board" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Board View
            </button>
          </div>
        </div>
      }
    />
  );
};
