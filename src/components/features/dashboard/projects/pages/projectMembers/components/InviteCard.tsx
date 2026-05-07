"use client";

import Button from "@/components/ui/Button";

interface InviteCardProps {
  token: string | null;
  isSubmitting: boolean;
  error: string | null;
  handleAccept: () => void;
  onBackToProjects: () => void;
}

export const InviteCard = ({
  token,
  isSubmitting,
  error,
  handleAccept,
  onBackToProjects,
}: InviteCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 px-4 py-12">
      {/* TASKLY Logo */}
      <div className="flex items-center gap-2 mb-8 select-none">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold shadow-md shadow-primary/20">
          T
        </div>
        <span className="text-xl font-black text-slate-900 tracking-wider">TASKLY</span>
      </div>

      {/* Invitation Card */}
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl max-w-lg w-full border border-slate-100/80 text-center relative overflow-hidden">
        {/* Subtle top decoration bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

        <div className="mb-6 inline-flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 11V3h-8" />
            <path d="M22 3l-9 9" />
          </svg>
          New Project Invitation
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
          You&apos;ve been invited to join a project
        </h1>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          Accept the invitation to collaborate with team members and contribute to the project workspace.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 text-left">
            <div className="flex items-start gap-2.5">
              <svg className="text-red-500 shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <h4 className="text-xs font-bold text-red-800">Failed to accept invitation</h4>
                <p className="text-xs text-red-600 mt-0.5">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!token ? (
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-left mb-6">
            <div className="flex items-start gap-2.5">
              <svg className="text-amber-500 shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <h4 className="text-xs font-bold text-amber-800">Missing Token</h4>
                <p className="text-xs text-amber-600 mt-0.5">
                  The invitation link is invalid because the token parameter is missing. Please check your invitation email.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={handleAccept}
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl text-sm font-bold shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Accepting Invitation...
              </span>
            ) : (
              "Accept Invitation"
            )}
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={onBackToProjects}
          className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors py-1 inline-block"
        >
          Back to Projects
        </Button>
      </div>
    </div>
  );
};
export default InviteCard;
