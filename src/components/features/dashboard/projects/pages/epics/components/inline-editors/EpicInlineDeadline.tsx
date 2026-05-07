import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEpic } from "@/store/slices/epics/epicSlice";
import { useUpdateEpic } from "../../hooks/useUpdateEpic";
import { Epic } from "../../types";
import { EventIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

interface Props {
  epic: Epic;
}

export const EpicInlineDeadline = ({ epic }: Props) => {
  const dispatch = useDispatch();
  const { updateField, updatingField } = useUpdateEpic(epic.id);

  const [deadline, setDeadline] = useState(epic.deadline ? epic.deadline.split("T")[0] : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDeadline = e.target.value || null;
    const currentFormatted = epic.deadline ? epic.deadline.split("T")[0] : null;

    if (newDeadline === currentFormatted) return;

    updateField(
      "deadline",
      newDeadline,
      currentFormatted,
      (updatedData: Epic) => {
        dispatch(updateEpic(updatedData));
        setDeadline(updatedData.deadline ? updatedData.deadline.split("T")[0] : "");
      },
      () => {
        setDeadline(currentFormatted || "");
      }
    );
  };

  return (
    <div className="flex items-center gap-2.5 h-8">
      <EventIcon
        size={16}
        className={cn("text-slate-300", deadline && "text-primary")}
      />
      <input
        type="date"
        value={deadline}
        onChange={handleChange}
        disabled={updatingField === "deadline"}
        className={cn(
          "text-xs font-bold bg-transparent border border-transparent hover:border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none cursor-pointer rounded px-2 py-1 -ml-2 transition-all disabled:opacity-50",
          deadline
            ? "text-slate-700"
            : "text-slate-400 uppercase tracking-wider"
        )}
      />
    </div>
  );
};
