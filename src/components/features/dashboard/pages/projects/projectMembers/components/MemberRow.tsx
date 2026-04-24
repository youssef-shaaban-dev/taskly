import { cn } from "@/utils/cn";
import { ProjectMember, ProjectRole } from "../types";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";
import Image from "next/image";

const roleColors: Record<ProjectRole, string> = {
  Owner: "bg-blue-600",
  Admin: "bg-indigo-500",
  Member: "bg-slate-500",
  Viewer: "bg-slate-400",
};

export const MemberRow = ({ member }: { member: ProjectMember }) => {
  const { user_details, role, created_at } = member;
  const name = user_details?.name || "Unknown User";
  const email = user_details?.email || "No email";
  const avatarUrl = user_details?.avatar_url;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors px-6 md:px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className={cn(
          "w-10 h-10 rounded-lg relative overflow-hidden flex items-center justify-center text-xs font-bold text-white shrink-0",
          roleColors[role] || "bg-slate-400"
        )}>
          {avatarUrl ? (
            <Image src={avatarUrl} alt={name} fill className="object-cover" />
          ) : (
            getInitials(name)
          )}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900 truncate">{name}</h4>
          <p className="text-xs text-slate-500 truncate">{email}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-start gap-4 sm:w-[300px]">
        <div className="sm:w-24">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full text-white",
            roleColors[role] || "bg-slate-400"
          )}>
            {role}
          </span>
        </div>

        <div className="text-xs text-slate-400 sm:w-32 hidden md:block">
          {formatDate(created_at)}
        </div>

        <button className="text-slate-300 hover:text-slate-600 transition-colors p-1 ml-auto">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
};
