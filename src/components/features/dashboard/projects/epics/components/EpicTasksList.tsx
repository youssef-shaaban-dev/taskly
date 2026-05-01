import Image from "next/image";
import { useEpicTasks } from "../hooks/useEpicTasks";
import { ArchitectureIcon } from "@/components/icons";
import { EpicTask } from "../types";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";
import { EpicTasksLoading } from "./EpicTasksLoading";
import { EpicTasksError } from "./EpicTasksError";

interface EpicTasksListProps {
  epicId: string | undefined;
}

export const EpicTasksList = ({ epicId }: EpicTasksListProps) => {
  const { tasks, isLoading, error } = useEpicTasks(epicId);

  if (isLoading) {
    return <EpicTasksLoading />;
  }

  if (error) {
    return <EpicTasksError message={error} />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-[#f8faff] border border-blue-50 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-blue-50 flex items-center justify-center mb-4 text-blue-100">
          <ArchitectureIcon size={28} />
        </div>
        <p className="text-slate-500 text-sm font-semibold mb-6">
          No tasks found for this epic
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white border border-slate-50 rounded-2xl overflow-hidden">
      {tasks.map((task: EpicTask) => {
        const assigneeName = task.assignee?.name;
        
        return (
          <div 
            key={task.id} 
            className="flex items-start justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
          >
            {/* Left Side: Icon, Title & Assignee */}
            <div className="flex items-start gap-4 w-full sm:w-auto">
              {/* Checkmark Icon */}
              <div className="mt-0.5 w-6 h-6 rounded-full border-[1.5px] border-slate-400 text-slate-500 flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              
              <div className="flex flex-col gap-2">
                {/* Title */}
                <span className="text-sm font-bold text-slate-800 line-clamp-2">{task.title}</span>
                
                {/* Assignee */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-[9px] font-bold overflow-hidden border border-slate-200">
                    {assigneeName 
                        ? assigneeName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()
                        : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    }
                  </div>
                  <span className={cn("text-xs font-semibold truncate", assigneeName ? "text-slate-500" : "text-slate-400 italic")}>
                    {assigneeName || "Unassigned"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Due Date */}
            <div className="flex flex-col items-end flex-shrink-0 ml-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Due Date</span>
              <span className="text-xs font-semibold text-slate-600">
                {task.due_date ? formatDate(task.due_date) : "-"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
