import { ProjectMember } from "../types";
import { MemberRow } from "./MemberRow";

interface MembersListProps {
  members: ProjectMember[];
}

export const MembersList = ({ members }: MembersListProps) => {
  return (
    <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
      <div className="hidden md:flex items-center px-6 md:px-8 py-3 bg-slate-50/50 border-b border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-1">Member</span>
        <div className="flex items-center sm:w-[300px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest sm:w-24">Role</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest sm:w-32">Joined At</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto">Actions</span>
        </div>
      </div>

      <div className="divide-y divide-slate-50">
        {members.map((member, index) => (
          <MemberRow key={`${member.id}-${index}`} member={member} />
        ))}
      </div>
    </div>
  );
};
