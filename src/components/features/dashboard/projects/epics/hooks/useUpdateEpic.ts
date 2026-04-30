import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  UpdateEpicPayload,
  updateEpicService,
} from "../services/updateEpicService";
import { Epic } from "../types";


export const useUpdateEpic = (epicId: string) => {
  const router = useRouter();

  const [updatingField, setUpdatingField] = useState<
    keyof UpdateEpicPayload | null
  >(null);

  const updateField = async (
    field: keyof UpdateEpicPayload,
    newValue: unknown,
    previousValue: unknown,
    onSuccess?: (updatedData: Epic) => void,
    onError?: () => void,
  ) => {
    if (newValue === previousValue) return;

    try {
      setUpdatingField(field);

      const payload: UpdateEpicPayload = {
        [field]: newValue,
      };

      const updatedEpic = await updateEpicService(epicId, payload);

      toast.success("Updated successfully");

      router.refresh();

      if (onSuccess) onSuccess(updatedEpic);
    } catch (error: unknown) {
      toast.error("Failed to update. Reverting changes...");
      console.error(error);

      if (onError) onError();
    } finally {
      setUpdatingField(null);
    }
  };

  return { updateField, updatingField };
};
