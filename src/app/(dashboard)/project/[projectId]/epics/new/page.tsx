"use client";

import { use } from "react";
import { FormProvider } from "react-hook-form";
import { useCreateEpic } from "@/components/features/dashboard/projects/epics/hooks/useCreateEpic";
import { ProjectHeader } from "@/components/features/dashboard/projects/main/components/shared/ProjectHeader";
import { EpicFields } from "@/components/features/dashboard/projects/epics/components/EpicFields";
import { ProjectActions } from "@/components/features/dashboard/projects/main/components/shared/ProjectActions";
import { ROUTES } from "@/constant";
import { useProjectDetails } from "@/components/features/dashboard/projects/projectDetails/hooks/useProjectDetails";

interface CreateEpicPageProps {
  params: Promise<{ projectId: string }>;
}

export default function CreateEpicPage({ params }: CreateEpicPageProps) {
  const { projectId } = use(params);
  const { form, isSubmitting, onSubmit, members, isLoadingMembers } = useCreateEpic(projectId);
  const { project } = useProjectDetails(projectId);

  const projectName = project?.name || "Loading...";

  return (
    <div className="max-w-4xl mx-auto w-full pb-10 px-4 md:px-0">
      <ProjectHeader
        breadcrumbs={[
          { label: "Projects", href: ROUTES.PROJECTS },
          { label: projectName },
          { label: "Epics", href: `/project/${projectId}/epics` },
          { label: "Create New", active: true },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Create New Epic</h1>
        <p className="text-slate-500 text-[0.8rem] max-w-xl leading-relaxed">
          Define a major project phase or high-level milestone to group
          related tasks and track architectural progress.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 md:p-12">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <EpicFields members={members} isLoadingMembers={isLoadingMembers} />

              <div className="pt-2">
                <ProjectActions
                  onCancel={() => window.history.back()}
                  isSubmitting={isSubmitting}
                  submitLabel="Create Epic"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
