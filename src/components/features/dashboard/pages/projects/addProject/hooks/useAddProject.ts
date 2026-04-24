import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectFormValues,
  projectSchema,
} from "@/components/features/dashboard/schemas/projectSchema";
import { ROUTES } from "@/constant";
import { toast } from "sonner";
import { addProjectService } from "../services/addProjectService";

export const useAddProject = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const descriptionValue = form.watch("description") || "";

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      await addProjectService(data);
      toast.success("Project created successfully");
      form.reset();
      router.push(ROUTES.PROJECTS);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create project. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    descriptionValue,
    onSubmit,
  };
};
