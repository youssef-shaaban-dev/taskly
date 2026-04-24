"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  DashboardIcon, MonitoringIcon,
  GroupsIcon, DescriptionIcon,
  TasklyIcon
} from "@/components/icons";
import { ROUTES } from "@/constant";

export const BottomNav = () => {
  const pathname = usePathname();
  const { projectId } = useParams();

  const menuItems = [
    {
      label: "Projects",
      icon: <DashboardIcon />,
      path: ROUTES.PROJECTS,
      isDisabled: false
    },
    {
      label: "Project Epics",
      icon: <MonitoringIcon />,
      path: projectId ? `/project/${projectId}/epics` : "#",
      isDisabled: !projectId
    },
    {
      label: "Project Tasks",
      icon: <TasklyIcon />,
      path: projectId ? `/project/${projectId}/tasks` : "#",
      isDisabled: !projectId
    },
    {
      label: "Project Members",
      icon: <GroupsIcon />,
      path: projectId ? `/project/${projectId}/members` : "#",
      isDisabled: !projectId
    },
    {
      label: "Project Details",
      icon: <DescriptionIcon />,
      path: projectId ? `/project/${projectId}/edit` : "#",
      isDisabled: !projectId
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 h-16 px-4 flex items-center justify-between z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.label}
            href={item.path}
            className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors
              ${isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"}
            `}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};