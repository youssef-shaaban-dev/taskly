import { ProjectMember } from "../types";
import { MemberRow } from "./MemberRow";

interface MembersListProps {
  members: ProjectMember[];
}

export const MembersList = ({ members }: MembersListProps) => {
  return (
    <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 md:px-8 py-3 bg-slate-50/50 border-b border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-1 text-left">Member</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-1 text-center">Role</span>
        <div className="flex-1 flex justify-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-20 text-center inline-block">Actions</span>
        </div>
      </div>

      <div className="divide-y divide-slate-50">
        {members.map((member, index) => (
          <MemberRow key={`${member.member_id}-${index}`} member={member} />
        ))}
      </div>
    </div>
  );
};
