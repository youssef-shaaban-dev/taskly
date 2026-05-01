"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeMobileMenu } from "@/store/slices/uiSlice";
import { logoutUser } from "@/store/slices/user/userActions";
import {
  DashboardIcon, DescriptionIcon, LogoutIcon,
  ArrowIcon, TasklyIcon, GroupsIcon,
  MonitoringIcon
} from "@/components/icons";
import { ROUTES } from "@/constant";
import { toast } from "sonner";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);

  const projectId = params.projectId as string | undefined;

  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [pathname, dispatch]);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      router.push(ROUTES.LOGIN);
    } else {
      toast.error("Logout failed, please try again.");
    }
  };

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
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={() => dispatch(closeMobileMenu())}
        />
      )}

      <aside
        data-collapsed={isCollapsed}
        className={`fixed left-0 top-0 h-full bg-[#f4f7fc] border-r border-slate-100 z-50 transition-all duration-300 flex flex-col
          ${isCollapsed ? "md:w-22.5" : "md:w-[256px]"}
          ${isMobileMenuOpen ? "translate-x-0 w-[256px]" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <Link href={ROUTES.HOME} className="h-16 flex items-center px-6 gap-3 mb-4 overflow-hidden">
          <TasklyIcon className="min-w-6 text-primary" />
          {!isCollapsed && (
            <span className="font-black text-xl text-slate-900 tracking-tighter transition-opacity duration-200">
              TASKLY
            </span>
          )}
        </Link>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {menuItems.filter(item => !item.isDisabled).map((item) => {
            const isActive = item.path !== "#" && (
              item.path === ROUTES.PROJECTS
                ? pathname === ROUTES.PROJECTS
                : pathname.startsWith(item.path)
            );

            return (
              <Link
                key={item.label}
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all group
                  ${isActive
                    ? "bg-white text-primary shadow-sm font-bold"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 font-medium"
                  }
                  ${isCollapsed ? "md:justify-center md:px-0" : ""}
                `}
              >
                <div className={`w-5 h-5 flex items-center justify-center ${isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-700"}`}>
                  {item.icon}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className="text-sm truncate transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden md:flex items-center gap-3 w-full text-slate-400 hover:text-primary transition-colors
              ${isCollapsed ? "justify-center" : "px-3"}`}
          >
            <div className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}>
              <ArrowIcon />
            </div>
            {!isCollapsed && <span className="text-[10px] font-bold uppercase tracking-wider">Collapse</span>}
          </button>

          <button
            onClick={handleLogout}
            className={`flex items-center cursor-pointer gap-3 w-full text-slate-600 hover:bg-error/10 hover:text-error p-3 rounded-lg transition-colors ${isCollapsed ? "md:justify-center" : ""}`}
          >
            <LogoutIcon />
            {(!isCollapsed || isMobileMenuOpen) && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};