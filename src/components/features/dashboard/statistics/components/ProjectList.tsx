"use client";
import React from "react";
import { ProjectCountResponse } from "../types";

interface ProjectListProps {
  projects: ProjectCountResponse[];
  loading?: boolean;
}

export const ProjectList = ({ projects, loading }: ProjectListProps) => {
  if (loading) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full animate-pulse">
        <div className="h-4 w-32 bg-slate-100 mb-6 rounded"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-32 bg-slate-100 rounded"></div>
              <div className="h-4 w-10 bg-slate-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-900 mb-6">All Projects</h3>
      
      <div className="flex-1 overflow-y-auto">
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.project_id} className="flex justify-between items-center group">
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  {project.project_name || "Unnamed Project"}
                </span>
                <span className="text-sm font-bold text-slate-900 whitespace-nowrap ml-4">
                  {project.tasks_count} Tasks
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-8">
            <span className="text-sm font-medium">No project data available</span>
          </div>
        )}
      </div>
    </div>
  );
};
