import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEpic } from "@/store/slices/epics/epicSlice";
import { useUpdateEpic } from "../../hooks/useUpdateEpic";
import { Epic } from "../../types";

interface Props {
  epic: Epic;
}

export const EpicInlineDescription = ({ epic }: Props) => {
  const dispatch = useDispatch();
  const { updateField, updatingField } = useUpdateEpic(epic.id);
  const [description, setDescription] = useState(epic.description || "");

  const handleBlur = () => {
    if (description === (epic.description || "")) return;
    updateField(
      "description",
      description,
      epic.description,
      (updatedData: Epic) => {
        dispatch(updateEpic(updatedData));
        setDescription(updatedData.description || "");
      },
      () => {
        setDescription(epic.description || "");
      }
    );
  };

  return (
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      onBlur={handleBlur}
      disabled={updatingField === "description"}
      className="w-full text-slate-600 text-sm leading-relaxed font-medium bg-transparent border border-transparent hover:border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg p-2 -ml-2 transition-all resize-none disabled:opacity-50 min-h-[80px]"
      placeholder="No description provided"
    />
  );
};
