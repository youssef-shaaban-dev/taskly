"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCalendarStatsThunk, fetchTasksPerProjectThunk } from "@/store/slices/statistics/statisticsThunks";
import { StatisticsFilters } from "./components/StatisticsFilters";
import { KpiCard } from "./components/KpiCard";
import { WeeklyCalendar } from "./components/WeeklyCalendar";
import { StatusDoughnutChart } from "./components/StatusDoughnutChart";
import { ProjectList } from "./components/ProjectList";
import { getWeekRange } from "./utils/dateUtils";
import { TasklyIcon, ChevronIcon } from "@/components/icons";

// Reusable icons for KPI cards (standardized for this page)
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export const StatisticsContainer = () => {
  const dispatch = useAppDispatch();
  const { calendarStats, projectCounts, isLoadingStats, isLoadingProjects } = useAppSelector((state) => state.statistics);

  // Default week range
  const defaultRange = getWeekRange();
  
  const [filters, setFilters] = useState({
    startDate: defaultRange.startDate,
    endDate: defaultRange.endDate,
    projectId: null as string | null,
    status: null as string | null,
  });

  const loadData = useCallback(() => {
    // Fetch main stats
    dispatch(fetchCalendarStatsThunk({
      p_start_date: filters.startDate,
      p_end_date: filters.endDate,
      p_project_id: filters.projectId,
      p_status: filters.status,
    }));

    // Fetch project list counts (API #2 only takes dates)
    dispatch(fetchTasksPerProjectThunk({
      p_start_date: filters.startDate,
      p_end_date: filters.endDate,
    }));
  }, [dispatch, filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stats = calendarStats || { total_tasks: 0, done_tasks: 0, overdue_tasks: 0, totals: {}, daily: [] };

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Weekly Planner</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage your deadlines and track team velocity.
          </p>
        </div>
        
        <StatisticsFilters 
          initialValues={filters}
          onFilterChange={setFilters}
        />
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard 
          title="Total Tasks"
          value={stats.total_tasks}
          icon={<TasklyIcon size={22} className="text-blue-600" />}
          variant="default"
          loading={isLoadingStats}
        />
        <KpiCard 
          title="Completed Tasks"
          value={stats.done_tasks}
          icon={<CheckIcon className="text-emerald-600" />}
          variant="success"
          loading={isLoadingStats}
        />
        <KpiCard 
          title="Overdue Tasks"
          value={stats.overdue_tasks}
          icon={<AlertIcon className="text-red-600" />}
          variant="danger"
          loading={isLoadingStats}
        />
      </div>

      {/* Weekly Calendar View */}
      <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-bold text-slate-900">Calendar</h2>
              <div className="h-px flex-1 bg-slate-100 ml-4"></div>
          </div>
          <WeeklyCalendar 
            startDate={filters.startDate}
            endDate={filters.endDate}
            dailyStats={stats.daily}
            loading={isLoadingStats}
          />
      </div>

      {/* Bottom Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        <div className="lg:col-span-3">
          <StatusDoughnutChart 
            totals={stats.totals}
            totalTasks={stats.total_tasks}
            loading={isLoadingStats}
          />
        </div>
        <div className="lg:col-span-2">
          <ProjectList 
            projects={projectCounts}
            loading={isLoadingProjects}
          />
        </div>
      </div>
    </div>
  );
};
