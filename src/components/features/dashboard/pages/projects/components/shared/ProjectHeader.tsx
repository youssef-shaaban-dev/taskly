import Link from "next/link";
import React from "react";
import { cn } from "@/utils/cn";

interface Breadcrumb {
  label: string;
  href?: string;
  active?: boolean;
}

interface ProjectHeaderProps {
  title?: string;
  breadcrumbs: Breadcrumb[];
  action?: React.ReactNode;
}

export const ProjectHeader = ({ title, breadcrumbs, action }: ProjectHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {crumb.href ? (
              <Link href={crumb.href} className="text-slate-400 hover:text-slate-600">
                {crumb.label}
              </Link>
            ) : (
              <span className={cn(crumb.active ? "text-primary" : "text-slate-400")}>
                {crumb.label}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="text-slate-400">&gt;</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {action}
      </div>
    </div>
  );
};
