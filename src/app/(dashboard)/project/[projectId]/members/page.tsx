"use client";

import { useState } from "react";
import { useProjectMembers } from "@/components/features/dashboard/projects/pages/projectMembers/hooks/useProjectMembers";
import { ProjectHeader } from "@/components/features/dashboard/projects/main/components/shared/ProjectHeader";
import { MembersList } from "@/components/features/dashboard/projects/pages/projectMembers/components/MembersList";
import { MembersSkeleton } from "@/components/features/dashboard/projects/pages/projectMembers/components/MembersSkeleton";
import { MembersError } from "@/components/features/dashboard/projects/pages/projectMembers/components/MembersError";
import { InviteMemberModal } from "@/components/features/dashboard/projects/pages/projectMembers/components/InviteMemberModal";
import { ROUTES } from "@/constant";
import Button from "@/components/ui/Button";

import { useProjectDetails } from "@/components/features/dashboard/projects/pages/projectDetails/hooks/useProjectDetails";

export default function ProjectMembersPage() {
  const { members, isLoading, error, retry, projectId } = useProjectMembers();
  const { project } = useProjectDetails(projectId);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const projectName = project?.name || "Loading...";

  return (
    <div className="max-w-6xl mx-auto w-full pb-10">
      <ProjectHeader
        title="Project Members"
        breadcrumbs={[
          { label: "Projects", href: ROUTES.PROJECTS },
          { label: projectName },
          { label: "Members", active: true },
        ]}
        action={
          <Button
            variant="primary"
            className="gap-2"
            onClick={() => setIsInviteModalOpen(true)}
          >
            <span>+</span> Invite Member
          </Button>
        }
      />

      {isLoading ? (
        <MembersSkeleton count={members?.length || 5} />
      ) : error ? (
        <MembersError error={error} onRetry={retry} />
      ) : (
        <MembersList members={members || []} />
      )}

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        projectId={projectId}
        projectName={projectName}
        onSuccess={retry}
      />
    </div>
  );
}
