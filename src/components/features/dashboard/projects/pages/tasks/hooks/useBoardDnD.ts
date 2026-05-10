import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskDetailsService } from "../services/taskService";
import { TaskStatus } from "../types";
import { toast } from "sonner";
import { DragEndEvent } from "@dnd-kit/core";

export const useBoardDnD = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ taskId, newStatus }: { taskId: string; newStatus: TaskStatus }) => {
      return await updateTaskDetailsService(taskId, { status: newStatus });
    },
    onSuccess: () => {
      toast.success("Task moved successfully!");
      // Force refetching all task lists to maintain updated view
      queryClient.invalidateQueries({ queryKey: ["tasks", "board"] });
    },
    onError: (err) => {
      console.error("Error moving task:", err);
      toast.error("Failed to move task. Please try again.");
    }
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    const oldStatus = active.data.current?.status as TaskStatus;

    // If dropped on the same column, do nothing
    if (oldStatus === newStatus) return;

    // Execute update
    mutation.mutate({ taskId, newStatus });
  };

  return { handleDragEnd };
};
