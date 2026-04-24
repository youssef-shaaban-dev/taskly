"use client";

import { FormProvider, Form } from 'react-hook-form';
import { useAddProject } from "@/components/features/dashboard/projects/addProject/hooks/useAddProject";
import { ProjectHeader } from '@/components/features/dashboard/projects/components/shared/ProjectHeader';
import { ProjectFields } from '@/components/features/dashboard/projects/components/shared/ProjectFields';
import { ProjectActions } from '@/components/features/dashboard/projects/components/shared/ProjectActions';
import { ProjectCardHeader } from '@/components/features/dashboard/projects/components/shared/ProjectCardHeader';
import { ROUTES } from '@/constant';

export default function AddProjectPage() {
  const { form, isSubmitting, onSubmit } = useAddProject();

  return (
    <div className="max-w-4xl mx-auto w-full pb-10">
      <ProjectHeader
        title="Add New Project"
        breadcrumbs={[
          { label: 'Projects', href: ROUTES.PROJECTS },
          { label: 'Add New Project', active: true }
        ]}
        action={
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
          >
            <span>+</span> Invite Member
          </button>
        }
      />

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8">

          <ProjectCardHeader
            title="Initialize New Project"
            description="Define the scope and foundational details of your project."
          />

          <FormProvider {...form}>
            <Form control={form.control} onSubmit={({ data }) => onSubmit(data)} className="space-y-6">

              <ProjectFields />

              <ProjectActions isSubmitting={isSubmitting} />

            </Form>
          </FormProvider>

        </div>
      </div>
    </div>
  );
}