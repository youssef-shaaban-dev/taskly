"use client";

import { Suspense } from "react";
import { ROUTES } from "@/constant";
import { useAcceptInvitation } from "@/components/features/dashboard/projects/pages/projectMembers/hooks/useAcceptInvitation";
import InviteLoading from "@/components/features/dashboard/projects/pages/projectMembers/components/InviteLoading";
import InviteRedirecting from "@/components/features/dashboard/projects/pages/projectMembers/components/InviteRedirecting";
import InviteCard from "@/components/features/dashboard/projects/pages/projectMembers/components/InviteCard";

function InviteContent() {
  const { token, isAuthenticated, isSubmitting, error, handleAccept, router } =
    useAcceptInvitation();

  if (isAuthenticated === null) {
    return <InviteLoading />;
  }

  if (!isAuthenticated) {
    return <InviteRedirecting />;
  }

  return (
    <InviteCard
      token={token}
      isSubmitting={isSubmitting}
      error={error}
      handleAccept={handleAccept}
      onBackToProjects={() => router.push(ROUTES.PROJECTS)}
    />
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<InviteLoading />}>
      <InviteContent />
    </Suspense>
  );
}
