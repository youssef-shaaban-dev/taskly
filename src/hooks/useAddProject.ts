import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/utils/apiClient";
import { ProjectFormValues, projectSchema } from "@/schemas/projectSchema";


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
      const response = await apiClient("/rest/v1/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create project");
      }

      alert("Project created successfully");
      form.reset();
      router.push("/projects");
    } catch (error: any) {
      alert(error.message || "Failed to create project. Please try again.");
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