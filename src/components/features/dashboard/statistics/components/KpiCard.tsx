import React from "react";
import { cn } from "@/utils/cn";

interface KpiCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  loading?: boolean;
}

export const KpiCard = ({ title, value, icon, variant = "default", loading = false }: KpiCardProps) => {
  const variantStyles = {
    default: "bg-blue-50/50 text-blue-600 border-blue-100",
    success: "bg-emerald-50/50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50/50 text-amber-600 border-amber-100",
    danger: "bg-red-50/50 text-red-600 border-red-100",
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</h3>
          {loading ? (
            <div className="h-10 w-24 bg-slate-100 animate-pulse rounded-lg" />
          ) : (
            <span className="text-4xl font-bold text-slate-900 tracking-tight">{value}</span>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border", variantStyles[variant])}>
          {icon}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
