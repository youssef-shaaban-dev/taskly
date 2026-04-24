"use client";

import { FormProvider, Form } from 'react-hook-form';
import { useEditProject } from '@/components/features/dashboard/projects/editProject/hooks/useEditProject';
import { ProjectHeader } from '@/components/features/dashboard/projects/components/shared/ProjectHeader';
import { ProjectFields } from '@/components/features/dashboard/projects/components/shared/ProjectFields';
import { ProjectActions } from '@/components/features/dashboard/projects/components/shared/ProjectActions';
import { ProjectCardHeader } from '@/components/features/dashboard/projects/components/shared/ProjectCardHeader';
import { ROUTES } from '@/constant';

export default function EditProjectPage() {
  const { form, isFetching, isSubmitting, onSubmit } = useEditProject();
  const projectName = form.watch("name");

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full pb-10">
      <ProjectHeader
        title={`Edit Project: ${projectName}`}
        breadcrumbs={[
          { label: 'Projects', href: ROUTES.PROJECTS },
          { label: projectName || 'Project' },
          { label: 'Edit', active: true }
        ]}
      />

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8">

          <ProjectCardHeader
            title="Edit Project Details"
            description="Update the scope and foundational details of your project."
          />

          <FormProvider {...form}>
            <Form control={form.control} onSubmit={({ data }) => onSubmit(data)} className="space-y-6">

              <ProjectFields />

              <ProjectActions
                isSubmitting={isSubmitting}
                submitLabel="Save Changes"
                submittingLabel="Saving..."
              />

            </Form>
          </FormProvider>

        </div>
      </div>
    </div>
  );
}