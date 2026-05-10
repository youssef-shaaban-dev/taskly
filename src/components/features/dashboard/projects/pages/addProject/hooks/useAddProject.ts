import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectFormValues,
  projectSchema,
} from "@/components/features/dashboard/projects/main/schemas/projectSchema";
import { ROUTES } from "@/constant";
import { toast } from "sonner";
import { addProjectService } from "../services/addProjectService";

export const useAddProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const addProjectMutation = useMutation({
    mutationFn: addProjectService,
    onSuccess: () => {
      toast.success("Project created successfully");
      // Force re-fetch of projects list to show new project immediately
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      form.reset();
      router.push(ROUTES.PROJECTS);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create project. Please try again."
      );
    }
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const descriptionValue = form.watch("description") || "";

  const onSubmit = async (data: ProjectFormValues) => {
    addProjectMutation.mutate(data);
  };

  return {
    form,
    isSubmitting: addProjectMutation.isPending,
    descriptionValue,
    onSubmit,
  };
};
