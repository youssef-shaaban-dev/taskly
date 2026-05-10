import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const projectId = params.projectId as string;

  const form = useForm<EditProjectFormValues>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: { name: "", description: "" },
  });

  const descriptionValue = useWatch({
    control: form.control,
    name: "description",
    defaultValue: "",
  });

  // 1. Fetch details via useQuery
  const { data: project, isLoading: isFetching } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectDetails(projectId),
    enabled: !!projectId,
  });

  // Hydrate form when data lands
  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        description: project.description || "",
      });
    }
  }, [project, form]);

  // 2. Handle Update via useMutation
  const updateMutation = useMutation({
    mutationFn: (values: EditProjectFormValues) => updateProjectService(projectId, values),
    onSuccess: () => {
      toast.success("Project updated successfully!");
      // Refresh both main list and this specific project cache
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      router.push(ROUTES.PROJECTS);
    },
    onError: (err) => {
      toast.error(
        (err instanceof Error && err.message) || "Failed to update project"
      );
    }
  });

  // 2. Handle Update
  const onSubmit = async (values: EditProjectFormValues) => {
    updateMutation.mutate(values);
  };

  return {
    form,
    isFetching,
    isSubmitting: updateMutation.isPending,
    descriptionValue,
    onSubmit,
    projectId,
  };
};
