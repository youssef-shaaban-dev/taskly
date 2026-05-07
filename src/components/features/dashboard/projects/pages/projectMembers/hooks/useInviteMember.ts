"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { sendInvitationService } from "../services/invitationService";

const inviteSchema = z.object({
  email: z.email("Please enter a valid email address").nonempty("Email address is required"),
});

export type InviteFormValues = z.infer<typeof inviteSchema>;

export const useInviteMember = (
  projectId: string,
  onClose: () => void,
  onSuccess?: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: InviteFormValues) => {
    try {
      setIsSubmitting(true);

      const appUrl = typeof window !== "undefined" ? window.location.origin : "";

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

      await sendInvitationService({
        p_email: values.email,
        p_project_id: projectId,
        p_app_url: appUrl,
        p_base_url: baseUrl,
      });

      toast.success("Invitation sent successfully!");
      form.reset();
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send invitation.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, onSubmit };
};
