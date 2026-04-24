import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { epicSchema, EpicFormValues } from "../schema/epicSchema";
import { createEpicService } from "../services/epicService";
import { useProjectMembers } from "../../projectMembers/hooks/useProjectMembers";

export const useCreateEpic = (projectId: string) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { members, isLoading: isLoadingMembers } = useProjectMembers();

  const form = useForm<EpicFormValues>({
    resolver: zodResolver(epicSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee_id: null,
      deadline: null,
    },
  });

  const onSubmit = async (data: EpicFormValues) => {
    setIsSubmitting(true);
    try {
      await createEpicService({
        ...data,
        project_id: projectId,
        assignee_id: data.assignee_id || undefined,
        description: data.description || undefined,
        deadline: data.deadline || undefined,
      });
      toast.success("Epic created successfully");
      router.back();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create epic");
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
  };
};
