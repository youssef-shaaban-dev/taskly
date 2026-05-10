"use client";
import React from "react";
import { DailyStat, TaskStatusEnum } from "../types";
import { formatShortDate } from "../utils/dateUtils";
import { cn } from "@/utils/cn";
import { DescriptionIcon } from "@/components/icons";

interface WeeklyCalendarProps {
  startDate: string;
  endDate: string;
  dailyStats: DailyStat[];
  loading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  [TaskStatusEnum.TO_DO]: "bg-slate-100 text-slate-700 border-slate-200",
  [TaskStatusEnum.IN_PROGRESS]: "bg-blue-50 text-blue-700 border-blue-100",
  [TaskStatusEnum.BLOCKED]: "bg-red-50 text-red-700 border-red-100",
  [TaskStatusEnum.DONE]: "bg-emerald-50 text-emerald-700 border-emerald-100",
  // fallback for others
  "default": "bg-violet-50 text-violet-700 border-violet-100",
};

const STATUS_LABELS: Record<string, string> = {
    [TaskStatusEnum.TO_DO]: "TO DO",
    [TaskStatusEnum.IN_PROGRESS]: "ACTIVE",
    [TaskStatusEnum.BLOCKED]: "BLOCKED",
    [TaskStatusEnum.IN_REVIEW]: "REVIEW",
    [TaskStatusEnum.READY_FOR_QA]: "QA",
    [TaskStatusEnum.REOPENED]: "REOPEN",
    [TaskStatusEnum.READY_FOR_PRODUCTION]: "PROD",
    [TaskStatusEnum.DONE]: "DONE",
}

export const WeeklyCalendar = ({ startDate, endDate, dailyStats, loading }: WeeklyCalendarProps) => {
  // Generate range array
  const generateDatesInRange = (start: string, end: string) => {
    const dates = [];
    const curr = new Date(start);
    const endD = new Date(end);
    
    // Loop safe for max 10 iterations to prevent infinite loop just in case
    let limit = 0;
    while (curr <= endD && limit < 15) {
      dates.push(curr.toISOString().split("T")[0]);
      curr.setDate(curr.getDate() + 1);
      limit++;
    }
    return dates;
  };

  const rangeDates = generateDatesInRange(startDate, endDate);
  const todayStr = new Date().toISOString().split("T")[0];

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 min-h-[200px]">
        {Array.from({ length: rangeDates.length || 7 }).map((_, idx) => (
          <div key={idx} className="h-full min-h-[200px] bg-slate-100 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {rangeDates.map((date) => {
        const isToday = date === todayStr;
        const dayData = dailyStats.find((d) => d.day === date);
        const statuses = dayData ? Object.entries(dayData.statuses) : [];
        const hasTasks = statuses.length > 0;
        
        const [weekday, day, month] = formatShortDate(date).split(" ");

        return (
          <div 
            key={date} 
            className={cn(
              "flex flex-col bg-white border rounded-2xl min-h-[220px] transition-all overflow-hidden relative",
              isToday ? "border-primary shadow-md ring-1 ring-primary/20" : "border-slate-100 hover:shadow-sm"
            )}
          >
            {isToday && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
            )}
            
            {/* Header */}
            <div className="p-4 border-b border-slate-50">
               <div className="flex flex-col">
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider mb-0.5", isToday ? "text-primary" : "text-slate-400")}>{weekday}</span>
                  <span className="text-lg font-bold text-slate-900">{day} {month}</span>
               </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-3 flex flex-col gap-2">
              {hasTasks ? (
                statuses.map(([status, count]) => (
                  <div 
                    key={status} 
                    className={cn(
                      "flex justify-between items-center px-2.5 py-1.5 rounded-md text-[10px] font-bold border tracking-wide", 
                      STATUS_COLORS[status] || STATUS_COLORS.default
                    )}
                  >
                    <span>{STATUS_LABELS[status] || status}</span>
                    <span className="text-xs">{count}</span>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center opacity-40 grayscale">
                   <DescriptionIcon size={24} className="text-slate-300 mb-1" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">No Tasks</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
