"use client";

import { Modal } from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Controller } from "react-hook-form";
import { useInviteMember } from "../hooks/useInviteMember";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  onSuccess?: () => void;
}

export const InviteMemberModal = ({
  isOpen,
  onClose,
  projectId,
  projectName,
  onSuccess,
}: InviteMemberModalProps) => {
  const { form, isSubmitting, onSubmit } = useInviteMember(
    projectId,
    onClose,
    onSuccess
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6 md:p-8">
        {/* Header / Close button */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Invite Team Member</h3>
              <p className="text-xs text-slate-500 mt-1">
                Send an invitation to join the <span className="font-semibold text-slate-700">{projectName}</span> workspace.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="EMAIL ADDRESS"
                  placeholder="Enter email address"
                  type="email"
                  error={form.formState.errors.email?.message}
                  className="w-full"
                />
              )}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              type="button"
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={isSubmitting}
              type="submit"
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invitation"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
