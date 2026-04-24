import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/constant";
import { updateProjectService } from "../services/updateProjectService";
import {
  EditProjectFormValues,
  editProjectSchema,
} from "../schema/editProjectSchema";
import { fetchProjectDetails } from "../../projectDetails/services/fetchProjectDetails";

export const useEditProject = () => {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditProjectFormValues>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: { name: "", description: "" },
  });

  const descriptionValue = useWatch({
    control: form.control,
    name: "description",
    defaultValue: "",
  });

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsFetching(true);
        const data = await fetchProjectDetails(projectId);
        form.reset({
          name: data.name,
          description: data.description || "",
        });
      } catch (err: unknown) {
        toast.error(
          (err instanceof Error && err.message) ||
            "Failed to load project details",
        );
        router.push(ROUTES.PROJECTS);
      } finally {
        setIsFetching(false);
      }
    };

    if (projectId) loadProject();
  }, [projectId, form, router]);

  // 2. Handle Update
  const onSubmit = async (values: EditProjectFormValues) => {
    try {
      setIsSubmitting(true);
      await updateProjectService(projectId, values);
      toast.success("Project updated successfully!");
      router.push(ROUTES.PROJECTS);
      router.refresh();
    } catch (err: unknown) {
      toast.error(
        (err instanceof Error && err.message) || "Failed to update project",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isFetching,
    isSubmitting,
    descriptionValue,
    onSubmit,
    projectId,
  };
};
