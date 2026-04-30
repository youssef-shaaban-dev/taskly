import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEpic } from "@/store/slices/epics/epicSlice";
import { useUpdateEpic } from "../../hooks/useUpdateEpic";
import { Epic } from "../../types";
import Input from "@/components/ui/Input";

interface Props {
  epic: Epic;
}

export const EpicInlineTitle = ({ epic }: Props) => {
  const dispatch = useDispatch();
  const { updateField, updatingField } = useUpdateEpic(epic.id);
  const [title, setTitle] = useState(epic.title || "");

  const handleBlur = () => {
    if (!title.trim() || title === epic.title) {
      setTitle(epic.title || "");
      return;
    }
    updateField(
      "title",
      title,
      epic.title,
      (updatedData: Epic) => {
        dispatch(updateEpic(updatedData));
        setTitle(updatedData.title || "");
      },
      () => {
        setTitle(epic.title || "");
      }
    );
  };

  return (
    <Input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={handleBlur}
      disabled={updatingField === "title"}
      placeholder="Epic Title"
      className="text-xl font-extrabold text-slate-900 bg-transparent border-none focus:ring-2 focus:ring-primary/20 px-1 py-0 -ml-1 rounded shadow-none m-0 w-full max-w-[400px] disabled:opacity-50 tracking-normal leading-normal"
    />
  );
};
