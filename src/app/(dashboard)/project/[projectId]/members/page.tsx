"use client";

import { useProjectMembers } from "@/components/features/dashboard/projects/projectMembers/hooks/useProjectMembers";
import { ProjectHeader } from "@/components/features/dashboard/projects/components/shared/ProjectHeader";
import { MembersList } from "@/components/features/dashboard/projects/projectMembers/components/MembersList";
import { MembersSkeleton } from "@/components/features/dashboard/projects/projectMembers/components/MembersSkeleton";
import { MembersError } from "@/components/features/dashboard/projects/projectMembers/components/MembersError";
import { ROUTES } from "@/constant";
import Button from "@/components/ui/Button";

import { useProjectDetails } from "@/components/features/dashboard/projects/projectDetails/hooks/useProjectDetails";

export default function ProjectMembersPage() {
  const { members, isLoading, error, retry, projectId } = useProjectMembers();
  const { project } = useProjectDetails(projectId);

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
          <Button variant="primary" className="gap-2">
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
    </div>
  );
}
