import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectTask } from "../types";
import { fetchTaskDetails } from "../services/fetchTaskDetails";
import { updateTaskDetailsService, UpdateTaskPayload } from "../services/taskService";
import { toast } from "sonner";

export const useTaskDetails = (projectId: string, taskId: string | null) => {
  const queryClient = useQueryClient();
  const [updatingFields, setUpdatingFields] = useState<Record<string, boolean>>({});

  const { data: task, isLoading, error } = useQuery({
    queryKey: ["tasks", "detail", { projectId, taskId }],
    queryFn: () => fetchTaskDetails(projectId, taskId as string),
    enabled: !!projectId && !!taskId,
  });

  const mutation = useMutation({
    mutationFn: async ({ taskId, payload }: { taskId: string, payload: UpdateTaskPayload, optimisticChanges: Partial<ProjectTask> }) => {
      return await updateTaskDetailsService(taskId, payload);
    },
    onMutate: async ({ taskId, optimisticChanges }) => {
      // In case user was very aggressive, cancel outgoing fetches
      await queryClient.cancelQueries({ queryKey: ["tasks", "detail", { projectId, taskId }] });
      
      const previousTask = queryClient.getQueryData(["tasks", "detail", { projectId, taskId }]);
      
      // Update current task locally instantly
      queryClient.setQueryData(["tasks", "detail", { projectId, taskId }], (old: ProjectTask | undefined) => {
        return old ? { ...old, ...optimisticChanges } : old;
      });

      return { previousTask };
    },
    onSuccess: (_, variables) => {
      toast.success("Task updated successfully.");
      // Instantly force background reload of ALL related lists and views
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    },
    onError: (err, variables, context?: { previousTask?: ProjectTask }) => {
      console.error("Error updating task field:", err);
      toast.error("Failed to update task. Please try again.");
      // Rollback logic
      if (context?.previousTask) {
        queryClient.setQueryData(
          ["tasks", "detail", { projectId, taskId: variables.taskId }], 
          context.previousTask
        );
      }
    },
  });

  const updateTaskField = useCallback(async (
    field: string,
    payload: UpdateTaskPayload,
    optimisticChanges: Partial<ProjectTask>
  ) => {
    if (!task || !taskId) return;

    // Basic identity comparison to save API trip
    let isUnchanged = true;
    const keys = Object.keys(payload) as Array<keyof UpdateTaskPayload>;
    for (const key of keys) {
      const payloadVal = payload[key];
      let taskVal: unknown = task[key as keyof ProjectTask];
      if (key === "assignee_id") {
        taskVal = task.assignee?.id ?? null;
      } else if (key === "epic_id") {
        taskVal = task.epic?.id ?? null;
      }
      if (payloadVal !== taskVal) {
        isUnchanged = false;
        break;
      }
    }

    if (isUnchanged) return;

    // Tracking simple loading flag for specific UI elements
    setUpdatingFields((prev) => ({ ...prev, [field]: true }));

    mutation.mutate({ taskId, payload, optimisticChanges }, {
      onSettled: () => {
        setUpdatingFields((prev) => ({ ...prev, [field]: false }));
      }
    });
  }, [task, taskId, mutation, queryClient, projectId]);

  return {
    task: task || null,
    isLoading,
    error: error ? (error instanceof Error ? error.message : "Failed to load task") : null,
    updatingFields,
    updateTaskField,
  };
};
