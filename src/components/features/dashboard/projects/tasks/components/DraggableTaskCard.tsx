import { useDraggable } from "@dnd-kit/core";
import { ProjectTask } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { formatDate } from "@/utils/formatDate";

interface DraggableTaskCardProps {
    task: ProjectTask;
    onTaskClick: (taskId: string) => void;
}

export const DraggableTaskCard = ({ task, onTaskClick }: DraggableTaskCardProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
        data: {
            status: task.status,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.3 : 1,
    };

    const assigneeName = task.assignee?.name;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => {
                if (isDragging) return;
                onTaskClick(task.id);
            }}
            className="flex flex-col bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing group select-none touch-none"
        >
            <p className="text-sm font-bold text-slate-800 leading-snug mb-4 group-hover:text-primary transition-colors">
                {task.title}
            </p>

            <div className="flex items-center justify-between mt-auto">
                {/* Due Date */}
                <div className="flex items-center gap-1.5 text-slate-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                        {task.due_date ? formatDate(task.due_date) : "NO DATE"}
                    </span>
                </div>

                {/* Assignee Avatar */}
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold overflow-hidden border-2 border-white shadow-sm" title={assigneeName || "Unassigned"}>
                    {assigneeName
                        ? assigneeName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    }
                </div>
            </div>
        </div>
    );
};