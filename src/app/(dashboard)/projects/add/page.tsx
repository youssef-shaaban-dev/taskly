"use client";

import { FormProvider, Form } from 'react-hook-form';
import { useAddProject } from "@/components/features/dashboard/pages/projects/hooks/useAddProject";
import { AddProjectHeader } from '@/components/features/dashboard/pages/projects/addProject/components/AddProjectHeader';
import { AddProjectFields } from '@/components/features/dashboard/pages/projects/addProject/components/AddProjectFields';
import { AddProjectActions } from '@/components/features/dashboard/pages/projects/addProject/components/AddProjectActions';
import { AddProjectCardHeader } from '@/components/features/dashboard/pages/projects/addProject/components/AddProjectCardHeader';

export default function AddProjectPage() {
  const { form, isSubmitting, onSubmit } = useAddProject();

  return (
    <div className="max-w-4xl mx-auto w-full pb-10">
      <AddProjectHeader />

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8">

          <AddProjectCardHeader />

          <FormProvider {...form}>

            <Form control={form.control} onSubmit={({ data }) => onSubmit(data)} className="space-y-6">

              <AddProjectFields />

              <AddProjectActions isSubmitting={isSubmitting} />

            </Form>
          </FormProvider>

        </div>
      </div>
    </div>
  );
}