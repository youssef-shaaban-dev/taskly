import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { formatDate } from "@/utils/formatDate";

interface ProjectCardProps {
  project: { id: string; name: string; description?: string; created_at: string };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    router.push(`/project/${project.id}/edit`);
  };

  return (
    <Link 
      href={`/project/${project.id}/epics`}
      className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-56 group relative "
    >
      
      <button 
        onClick={handleEditClick}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary opacity-0 group-hover:opacity-100 transition-all z-10"
        title="Edit Project"
      >
        ✏️
      </button>

      <h3 className="text-base font-bold text-slate-900 mb-3 pr-8 line-clamp-1 group-hover:text-primary transition-colors">
        {project.name}
      </h3>
      <p className="text-[13px] text-slate-500 mb-6 line-clamp-3 leading-relaxed flex-grow">
        {project.description || "No description provided."}
      </p>
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CREATED AT</span>
        <span className="text-xs font-semibold text-slate-700">
          {formatDate(project.created_at)}
        </span>
      </div>
    </Link>
  );
};