"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TaskStatusEnum } from "../types";

interface StatusDoughnutChartProps {
  totals: Record<string, number>;
  totalTasks: number;
  loading?: boolean;
}

const STATUS_COLORS_CHART: Record<string, string> = {
  [TaskStatusEnum.TO_DO]: "#94a3b8",      // slate-400
  [TaskStatusEnum.IN_PROGRESS]: "#3b82f6", // blue-500
  [TaskStatusEnum.BLOCKED]: "#ef4444",    // red-500
  [TaskStatusEnum.IN_REVIEW]: "#f59e0b",  // amber-500
  [TaskStatusEnum.READY_FOR_QA]: "#8b5cf6", // violet-500
  [TaskStatusEnum.REOPENED]: "#ec4899",   // pink-500
  [TaskStatusEnum.READY_FOR_PRODUCTION]: "#0ea5e9", // sky-500
  [TaskStatusEnum.DONE]: "#10b981",       // emerald-500
};

const STATUS_LABELS: Record<string, string> = {
  [TaskStatusEnum.TO_DO]: "To Do",
  [TaskStatusEnum.IN_PROGRESS]: "In Progress",
  [TaskStatusEnum.BLOCKED]: "Blocked",
  [TaskStatusEnum.IN_REVIEW]: "In Review",
  [TaskStatusEnum.READY_FOR_QA]: "Ready for QA",
  [TaskStatusEnum.REOPENED]: "Reopened",
  [TaskStatusEnum.READY_FOR_PRODUCTION]: "Ready for Prod",
  [TaskStatusEnum.DONE]: "Done",
};

export const StatusDoughnutChart = ({ totals, totalTasks, loading }: StatusDoughnutChartProps) => {
  const chartData = Object.entries(totals)
    .filter(([, value]) => value > 0)
    .map(([status, value]) => ({
      name: STATUS_LABELS[status] || status,
      value,
      color: STATUS_COLORS_CHART[status] || "#cbd5e1",
    }));

  if (loading) {
    return (
      <div className="h-[250px] flex items-center justify-center bg-white border border-slate-100 rounded-2xl animate-pulse">
        <div className="w-32 h-32 rounded-full border-8 border-slate-100 border-t-slate-200"></div>
      </div>
    );
  }

  const noData = chartData.length === 0;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full">
      <h3 className="text-sm font-bold text-slate-900 mb-6">Tasks by Status</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 h-[200px]">
        <div className="relative w-full h-full flex-1">
          {!noData ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, "Tasks"]}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col pointer-events-none">
                <span className="text-2xl font-black text-slate-900 tracking-tight">{totalTasks}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-slate-50 flex items-center justify-center text-slate-300 text-xs font-medium">
                No Data
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 min-w-[140px]">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="font-medium text-slate-600">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
