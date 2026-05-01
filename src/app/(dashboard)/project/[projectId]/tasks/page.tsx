"use client";

import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProjectDetails } from "@/components/features/dashboard/projects/projectDetails/hooks/useProjectDetails";
import { TasksHeader } from "@/components/features/dashboard/projects/tasks/components/TasksHeader";
import { TasksBoard } from "@/components/features/dashboard/projects/tasks/components/TasksBoard";
import { TasksList } from "@/components/features/dashboard/projects/tasks/components/TasksList";
import { useProjectTasks } from "@/components/features/dashboard/projects/tasks/hooks/useProjectTasks";
import { TaskDetailsPopup } from "@/components/features/dashboard/projects/tasks/components/TaskDetailsPopup";

interface TasksPageProps {
  params: Promise<{ projectId: string }>;
}

const PAGE_SIZE = 10;

export default function TasksPage({ params }: TasksPageProps) {
  const { projectId } = use(params);
  const { project } = useProjectDetails(projectId);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentView = (searchParams.get("view") as "list" | "board") || "board";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const {
    tasks,
    isLoading,
    currentPage,
    totalPages,
    totalCount,
    setPage
  } = useProjectTasks(projectId, PAGE_SIZE, searchQuery);

  // Update URL when view changes
  const handleViewChange = (view: "list" | "board") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`);
  };

  const projectName = project?.name || "Loading...";

  return (
    <div className="max-w-[1280px] mx-auto w-full min-h-[calc(100vh-100px)] flex flex-col px-4 md:px-0">
      <TasksHeader 
        projectId={projectId} 
        projectName={projectName}
        view={currentView}
        onViewChange={handleViewChange}
        onSearch={setSearchQuery}
      />

      {currentView === "board" ? (
        <TasksBoard 
          projectId={projectId} 
          onTaskClick={(id) => setSelectedTaskId(id)} 
        />
      ) : (
        <TasksList 
          tasks={tasks}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={setPage}
          onTaskClick={(id) => setSelectedTaskId(id)}
        />
      )}

      <TaskDetailsPopup 
        isOpen={!!selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
        projectId={projectId}
        taskId={selectedTaskId}
      />
    </div>
  );
}
