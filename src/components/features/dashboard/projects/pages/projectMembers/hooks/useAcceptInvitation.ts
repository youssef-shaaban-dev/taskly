"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { COOKIES, ROUTES } from "@/constant";
import { acceptInvitationService } from "../services/invitationService";
import { toast } from "sonner";

export const useAcceptInvitation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tokenExists = !!Cookies.get(COOKIES.ACCESS_TOKEN);
    setIsAuthenticated(tokenExists);

    if (!tokenExists) {
      const currentUrl = window.location.pathname + window.location.search;
      router.push(`/login?redirectTo=${encodeURIComponent(currentUrl)}`);
    }
  }, [router]);

  const handleAccept = async () => {
    if (!token) {
      setError("Invitation token is missing.");
      toast.error("Invitation token is missing.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await acceptInvitationService(token);
      toast.success("Invitation accepted successfully!");
      router.push(ROUTES.PROJECTS);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to accept invitation.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    token,
    isAuthenticated,
    isSubmitting,
    error,
    handleAccept,
    router,
  };
};
