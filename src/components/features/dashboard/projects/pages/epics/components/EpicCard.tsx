"use client";

import { Epic } from "../types";
import { MoreIcon, EventIcon, UserIcon } from "@/components/icons";
import { formatDate } from "@/utils/formatDate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchEpicDetailsThunk } from "@/store/slices/epics/epicThunks";

interface EpicCardProps {
  epic: Epic;
}

export const EpicCard = ({ epic }: EpicCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const formattedDate = formatDate(epic.created_at);

  const handleOpenDetails = () => {
    dispatch(fetchEpicDetailsThunk({ projectId: epic.project_id, epicId: epic.id }));
  };

  return (
    <div 
      onClick={handleOpenDetails}
      className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col h-full hover:border-primary/20 transition-all group cursor-pointer active:scale-[0.99]"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider uppercase bg-blue-50 text-blue-600">
          {epic.epic_id}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Future: Open actions menu
            }}
            className="text-slate-300 hover:text-slate-600 transition-colors"
          >
            <MoreIcon size={20} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-6 line-clamp-2 min-h-14 group-hover:text-primary transition-colors">
        {epic.title}
      </h3>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-white shrink-0">
          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
            {epic.assignee?.sub ? epic.assignee.name?.charAt(0) : <UserIcon size={14} />}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Assignee</span>
          <span className="text-sm font-semibold text-slate-700">{epic.assignee?.sub && epic.assignee.name}</span>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="shrink-0">Created by:</span>
          <span className="text-slate-600 font-semibold truncate max-w-25">{epic.created_by.name}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <EventIcon size={14} className="text-slate-300" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
