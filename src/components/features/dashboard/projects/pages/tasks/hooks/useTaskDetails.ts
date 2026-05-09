import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ProjectTask } from "../types";
import { fetchTaskDetails } from "../services/fetchTaskDetails";
import { updateTaskDetailsService, UpdateTaskPayload } from "../services/taskService";
import { updateTaskLocally } from "@/store/slices/tasks/taskSlice";
import { toast } from "sonner";

export const useTaskDetails = (projectId: string, taskId: string | null) => {
  const [task, setTask] = useState<ProjectTask | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingFields, setUpdatingFields] = useState<Record<string, boolean>>({});

  const dispatch = useDispatch();

  useEffect(() => {
    const loadTask = async () => {
      if (!projectId || !taskId) {
        setTask(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchTaskDetails(projectId, taskId);
        setTask(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load task details");
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [projectId, taskId]);

  const updateTaskField = useCallback(async (
    field: string,
    payload: UpdateTaskPayload,
    optimisticChanges: Partial<ProjectTask>
  ) => {
    if (!task || !taskId) return;

    // Compare old vs new to skip unnecessary calls
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

    const previousTask = { ...task };

    // Set field loading state
    setUpdatingFields((prev) => ({ ...prev, [field]: true }));

    // Optimistic Update: Local state
    setTask((prev) => (prev ? { ...prev, ...optimisticChanges } : null));

    // Optimistic Update: Redux state
    dispatch(updateTaskLocally({ id: taskId, changes: optimisticChanges }));

    try {
      await updateTaskDetailsService(taskId, payload);
      toast.success("Task updated successfully.");

      // Sync with other list/board views using a custom event
      window.dispatchEvent(new CustomEvent("task-updated", { 
        detail: { 
          taskId, 
          changes: optimisticChanges,
          task
        } 
      }));
    } catch (err) {
      console.error("Error updating task field:", err);
      // Rollback: Local state
      setTask(previousTask);
      
      // Rollback: Redux state
      dispatch(updateTaskLocally({ id: taskId, changes: previousTask }));

      toast.error("Failed to update task. Please try again.");
    } finally {
      setUpdatingFields((prev) => ({ ...prev, [field]: false }));
    }
  }, [task, taskId, dispatch]);

  return {
    task,
    isLoading,
    error,
    updatingFields,
    updateTaskField,
  };
};
