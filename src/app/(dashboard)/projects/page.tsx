"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import { DashboardIcon } from "@/components/icons";
import { useProjects } from "@/components/features/dashboard/hooks/useProjects";
import { ROUTES } from "@/constant";

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, isLoading, error } = useProjects();

  // 1. Error State
  if (error) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-sm text-slate-500 mb-6">{error}</p>
        <button 
          onClick={() => router.refresh()} 
          className="bg-primary text-white px-6 py-2 rounded-md text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-24 md:pb-10 relative min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and curate your projects</p>
        </div>
        {/* Desktop Create Button */}
        <Link
        href={ROUTES.ADD_PROJECT}
          className="hidden md:flex bg-primary text-white px-5 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition-opacity items-center gap-2"
        >
          <span>+</span> Create New Project
        </Link>
      </div>

      {/* 2. Loading State (Skeleton) */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div key={skeleton} className="bg-white p-6 rounded-lg border border-slate-100 h-48 animate-pulse flex flex-col">
              <div className="h-5 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 flex-grow">
                <div className="h-3 bg-slate-100 rounded w-full"></div>
                <div className="h-3 bg-slate-100 rounded w-5/6"></div>
              </div>
              <div className="h-3 bg-slate-100 rounded w-1/4 mt-auto"></div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        /* 3. Empty State */
        <div className="flex-grow flex flex-col items-center justify-center text-center bg-white rounded-lg border border-slate-100 p-12">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <DashboardIcon />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">You don&lsquo;t have any projects yet.</h3>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            Get started by creating your first project to manage tasks and collaborate with your team.
          </p>
          <Link
          href={ROUTES.ADD_PROJECT}
            className="bg-primary text-white px-6 py-2 rounded-md text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Create New Project
          </Link>
        </div>
      ) : (
        /* 4. Data Grid */
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-56">
                <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-[13px] text-slate-500 mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {project.description || "No description provided."}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CREATED AT</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {formatDate(project.created_at)}
                  </span>
                </div>
              </div>
            ))}

            {/* Add Project Card inside Grid (Desktop only) */}
            <Link href={ROUTES.ADD_PROJECT} className="hidden md:flex bg-background p-6 rounded-lg border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors flex-col items-center justify-center h-56 text-slate-500 hover:text-primary group">
              <div className="w-10 h-10 bg-white border shadow-sm rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl font-light">+</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Add Project</span>
            </Link>
          </div>

          {/* Pagination UI (Dummy) */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-slate-100 gap-4">
            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-700">{projects.length}</span> of <span className="font-bold text-slate-700">{projects.length}</span> active projects
            </p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-sm font-bold shadow-sm">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium">
                &gt;
              </button>
            </div>
          </div>
        </>
      )}

      {/* Mobile Floating Action Button (FAB) */}
      <Link
        href={ROUTES.ADD_PROJECT}
        className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-40"
      >
        <span className="text-2xl font-light">+</span>
      </Link>
    </div>
  );
}