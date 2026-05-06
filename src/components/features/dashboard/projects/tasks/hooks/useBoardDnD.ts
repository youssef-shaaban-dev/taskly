import { useAppDispatch } from "@/store/hooks";
import { updateTaskStatusOptimistic } from "@/store/slices/tasks/taskSlice";
import { updateTaskStatusService } from "../services/taskService";
import { TaskStatus } from "../types";
import { toast } from "sonner";
import { DragEndEvent } from "@dnd-kit/core";

export const useBoardDnD = () => {
  const dispatch = useAppDispatch();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    const oldStatus = active.data.current?.status as TaskStatus;

    // If dropped on the same column, do nothing
    if (oldStatus === newStatus) return;

    try {
      // 1. Optimistic Update in Redux
      dispatch(updateTaskStatusOptimistic({ id: taskId, status: newStatus }));
      toast.success("Task status updated successfully!");

      // 2. Persist to Backend API
      await updateTaskStatusService(taskId, newStatus);
    } catch (err: unknown) {
      // 3. Rollback on Failure
      dispatch(updateTaskStatusOptimistic({ id: taskId, status: oldStatus }));
      toast.error(err instanceof Error ? err.message : "Failed to update task status.");
    }
  };

  return { handleDragEnd };
};
