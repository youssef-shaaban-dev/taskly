import { TASK_STATUSES, TaskStatus } from "../types";
import { TasksBoardColumn } from "./TasksBoardColumn";
import { DndContext } from "@dnd-kit/core";
import { useBoardDnD } from "../hooks/useBoardDnD";

interface TasksBoardProps {
  projectId: string;
  onTaskClick: (taskId: string) => void;
}

const STATUS_COLORS: Record<TaskStatus, string> = {
  TO_DO: "bg-slate-400",
  IN_PROGRESS: "bg-blue-500",
  BLOCKED: "bg-red-500",
  IN_REVIEW: "bg-purple-500",
  READY_FOR_QA: "bg-orange-400",
  REOPENED: "bg-pink-500",
  READY_FOR_PRODUCTION: "bg-indigo-500",
  DONE: "bg-emerald-500",
};

export const TasksBoard = ({ projectId, onTaskClick }: TasksBoardProps) => {
  const { handleDragEnd } = useBoardDnD();

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 w-full overflow-hidden mt-6">
        <div className="flex items-start gap-6 overflow-x-auto pb-6 custom-scrollbar w-full h-[calc(100vh-220px)] min-h-[500px]">
          {TASK_STATUSES.map((status) => (
            <TasksBoardColumn 
              key={status} 
              projectId={projectId} 
              status={status} 
              statusColor={STATUS_COLORS[status]} 
              onTaskClick={onTaskClick}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};
