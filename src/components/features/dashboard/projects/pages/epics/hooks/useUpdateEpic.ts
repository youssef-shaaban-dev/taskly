import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateEpicPayload, updateEpicService } from "../services/updateEpicService";
import { Epic } from "../types";


export const useUpdateEpic = (epicId: string) => {
  const queryClient = useQueryClient();
  const [updatingField, setUpdatingField] = useState<keyof UpdateEpicPayload | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ payload }: { payload: UpdateEpicPayload }) => {
      return await updateEpicService(epicId, payload);
    },
    onSuccess: (updatedEpic) => {
      toast.success("Updated successfully");
      // Smart Invalidation: Update both specific epic AND general list
      queryClient.invalidateQueries({ queryKey: ["epic", epicId] });
      queryClient.invalidateQueries({ queryKey: ["epics"] });
      
      // Optional Optimistic Feedback: Instantly prime the cache for faster load
      queryClient.setQueryData(["epic", epicId], updatedEpic);
    },
    onError: (error) => {
      toast.error("Failed to update. Reverting changes...");
      console.error(error);
    },
    onSettled: () => {
      setUpdatingField(null);
    }
  });

  const updateField = async (
    field: keyof UpdateEpicPayload,
    newValue: unknown,
    previousValue: unknown,
    onSuccess?: (updatedData: Epic) => void,
    onError?: () => void,
  ) => {
    if (newValue === previousValue) return;

    setUpdatingField(field);
    
    const payload: UpdateEpicPayload = { [field]: newValue };

    mutation.mutate({ payload }, {
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data);
      },
      onError: () => {
        if (onError) onError();
      }
    });
  };

  return { updateField, updatingField: mutation.isPending ? updatingField : null };
};
