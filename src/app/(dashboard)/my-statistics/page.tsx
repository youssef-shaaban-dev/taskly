import React from "react";

export const metadata = {
  title: "My Statistics | Taskly",
  description: "View your personal tasks statistics and trends.",
};

export default function MyStatisticsPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">My Statistics</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your velocity and progress across projects.
          </p>
        </div>
      </div>
      
      <div className="bg-white/50 border border-slate-100 rounded-2xl p-8 text-center backdrop-blur-sm">
        <p className="text-slate-500 font-medium">Statistics Dashboard Coming Soon...</p>
      </div>
    </div>
  );
}
