"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardIcon } from "@/components/icons";

interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setTimeout(() => {
          setProjects([
            {
              id: "1",
              name: "Website Redesign",
              description: "Complete overhaul of the main corporate website.",
              created_at: new Date().toISOString(),
            },
            {
              id: "2",
              name: "Mobile App MVP",
              description: "First release of the iOS and Android application.",
              created_at: new Date().toISOString(),
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor all your ongoing projects.
          </p>
        </div>
        <Link
          href="/dashboard/projects/add"
          className="bg-primary text-white px-5 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
        >
          <span>+</span> Add New Project
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm h-48 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-3 bg-slate-100 rounded w-full"></div>
                <div className="h-3 bg-slate-100 rounded w-5/6"></div>
              </div>
              <div className="h-8 bg-slate-50 rounded w-1/4 mt-4"></div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <DashboardIcon />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No projects found</h3>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            Get started by creating your first project to manage tasks and collaborate with your team.
          </p>
          <Link
            href="/dashboard/projects/add"
            className="bg-primary text-white px-6 py-2 rounded-md text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-[#F4F7FE] text-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <DashboardIcon />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                {project.name}
              </h3>
              
              <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-grow">
                {project.description || "No description provided."}
              </p>
              
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
                <Link
                  href={`/projects/${project.id}`}
                  className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}