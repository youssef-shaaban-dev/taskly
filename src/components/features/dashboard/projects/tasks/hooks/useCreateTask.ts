import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { taskSchema, TaskFormValues } from "../schema/taskSchema";
import { createTaskService } from "../services/taskService";
import { useProjectMembers } from "../../projectMembers/hooks/useProjectMembers";
import { useProjectEpics } from "../../epics/hooks/useProjectEpics";

export const useCreateTask = (projectId: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEpicId = searchParams.get("epicId");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { members, isLoading: isLoadingMembers } = useProjectMembers();
  const { epics, isLoading: isLoadingEpics } = useProjectEpics(projectId, 100);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      epic_id: initialEpicId || null,
      description: "",
      assignee_id: null,
      due_date: null,
      status: "TO_DO",
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    setIsSubmitting(true);
    try {
      await createTaskService({
        ...data,
        project_id: projectId,
        epic_id: data.epic_id || undefined,
        assignee_id: data.assignee_id || undefined,
        description: data.description || undefined,
        due_date: data.due_date || undefined,
        status: data.status || undefined,
      });
      toast.success("Task created successfully");
      router.back();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
    members,
    isLoadingMembers,
    epics,
    isLoadingEpics,
  };
};
