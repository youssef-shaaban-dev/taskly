"use client";
import React, { useState, useEffect } from "react";
import { fetchAllProjectsSimpleService, SimpleProject } from "../services/projectDataService";
import { TaskStatusEnum } from "../types";
import { getDayDiff } from "../utils/dateUtils";
import { ChevronIcon } from "@/components/icons";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

interface FiltersState {
  startDate: string;
  endDate: string;
  projectId: string | null;
  status: string | null;
}

interface StatisticsFiltersProps {
  initialValues: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

const STATUS_LABELS: Record<string, string> = {
  [TaskStatusEnum.TO_DO]: "TO DO",
  [TaskStatusEnum.IN_PROGRESS]: "IN PROGRESS",
  [TaskStatusEnum.BLOCKED]: "BLOCKED",
  [TaskStatusEnum.IN_REVIEW]: "IN REVIEW",
  [TaskStatusEnum.READY_FOR_QA]: "READY FOR QA",
  [TaskStatusEnum.REOPENED]: "REOPENED",
  [TaskStatusEnum.READY_FOR_PRODUCTION]: "READY FOR PRODUCTION",
  [TaskStatusEnum.DONE]: "DONE",
};

export const StatisticsFilters = ({ initialValues, onFilterChange }: StatisticsFiltersProps) => {
  const [projects, setProjects] = useState<SimpleProject[]>([]);
  const [filters, setFilters] = useState<FiltersState>(initialValues);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchAllProjectsSimpleService();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    
    // Basic validation for max 7 days diff
    const diff = getDayDiff(filters.startDate, filters.endDate);
    if (diff > 7) {
      toast.error("Maximum range is 7 days. Please select a shorter range.");
      return;
    }
    
    if (new Date(filters.startDate) > new Date(filters.endDate)) {
        toast.error("Start date cannot be after end date.");
        return;
    }

    onFilterChange(filters);
  }, [filters, onFilterChange, isInitialMount]);

  const handleFilterUpdate = (key: keyof FiltersState, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const selectClassName = "h-10 pl-3 pr-8 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer";

  return (
    <div className="flex flex-wrap items-center gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 backdrop-blur-sm">
      {/* Date Range Select */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:border-slate-300 transition-colors">
        <div className="flex items-center gap-1.5">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterUpdate("startDate", e.target.value)}
            className="text-xs font-bold text-slate-600 bg-transparent border-none outline-none cursor-pointer"
          />
          <span className="text-slate-300 font-medium">—</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterUpdate("endDate", e.target.value)}
            className="text-xs font-bold text-slate-600 bg-transparent border-none outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* Divider for layout */}
      <div className="hidden sm:block w-px h-6 bg-slate-200" />

      {/* Project Filter */}
      <div className="relative min-w-[160px]">
        <select
          value={filters.projectId || ""}
          onChange={(e) => handleFilterUpdate("projectId", e.target.value === "" ? null : e.target.value)}
          className={cn(selectClassName, "w-full")}
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-400">
          <ChevronIcon className="rotate-90 w-4 h-4" />
        </div>
      </div>

      {/* Status Filter */}
      <div className="relative min-w-[160px]">
        <select
          value={filters.status || ""}
          onChange={(e) => handleFilterUpdate("status", e.target.value === "" ? null : e.target.value)}
          className={cn(selectClassName, "w-full")}
        >
          <option value="">All Statuses</option>
          {Object.values(TaskStatusEnum).map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status] || status}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-400">
          <ChevronIcon className="rotate-90 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
