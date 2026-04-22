import { formatDate } from "@/utils/formatDate";

interface ProjectCardProps {
  project: { id: string; name: string; description?: string; created_at: string };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-56">
      <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-1">
        {project.name}
      </h3>
      <p className="text-[13px] text-slate-500 mb-6 line-clamp-3 leading-relaxed grow">
        {project.description || "No description provided."}
      </p>
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CREATED AT</span>
        <span className="text-xs font-semibold text-slate-700">
          {formatDate(project.created_at)}
        </span>
      </div>
    </div>
  );
};