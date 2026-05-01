"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProjects } from "@/components/features/dashboard/projects/hooks/useProjects";
import { ROUTES } from "@/constant";
import { ProjectsEmpty, ProjectsError, ProjectsSkeleton } from "@/components/features/dashboard/projects/components/ProjectsStates";
import { ProjectsHeader } from "@/components/features/dashboard/projects/components/ProjectsHeader";
import { ProjectCard } from "@/components/features/dashboard/projects/components/ProjectCard";
import { Pagination } from "@/components/shared/Pagination";
import { InfiniteScrollObserver } from "@/components/shared/InfiniteScrollObserver";

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, isLoading, error, pagination: { currentPage, totalCount, totalPages, goToPage }, loadMore, isLoadMoreLoading } = useProjects();

  if (error) {
    return <ProjectsError error={error} onRetry={() => router.refresh()} />;
  }

  return (
    <div className="w-full pb-24 md:pb-10 relative min-h-[80vh] flex flex-col">
      <ProjectsHeader />

      {isLoading ? (
        <ProjectsSkeleton />
      ) : projects.length === 0 ? (
        <ProjectsEmpty />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* Desktop Add Project Card */}
            <Link href={ROUTES.ADD_PROJECT} className="hidden md:flex bg-background p-6 rounded-lg border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors flex-col items-center justify-center h-56 text-slate-500 hover:text-primary group">
              <div className="w-10 h-10 bg-white border shadow-sm rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl font-light">+</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Add Project</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              currentItemsCount={projects.length}
              onPageChange={goToPage}
              label="active projects"
              className="hidden md:flex"
            />
          </div>

          <div className="md:hidden">
            <InfiniteScrollObserver
              onIntersect={loadMore}
              isLoading={isLoadMoreLoading}
              hasMore={currentPage < totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
}