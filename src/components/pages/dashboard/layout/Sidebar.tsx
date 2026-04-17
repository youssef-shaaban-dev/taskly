"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeMobileMenu } from "@/store/slices/uiSlice";
import { logoutUser } from "@/store/slices/user/userActions"; 
import { 
  DashboardIcon, MonitoringIcon, InventoryIcon, 
  GroupsIcon, DescriptionIcon, LogoutIcon, 
  ArrowIcon, TasklyIcon 
} from "@/components/icons";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); 
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [pathname, dispatch]);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      router.push("/login");
    } else {
      alert("Logout failed, please try again.");
    }
  };

  const menuItems = [
    { label: "Projects", icon: <DashboardIcon />, path: "/projects" },
    { label: "Monitoring", icon: <MonitoringIcon />, path: "/monitoring" },
    { label: "Inventory", icon: <InventoryIcon />, path: "/inventory" },
    { label: "Groups", icon: <GroupsIcon />, path: "/groups" },
    { label: "Project Details", icon: <DescriptionIcon />, path: "/details" },
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
        className={`fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-50 transition-all duration-300 flex flex-col
          ${isCollapsed ? "md:w-22.5" : "md:w-[256px]"}
          ${isMobileMenuOpen ? "translate-x-0 w-[256px]" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-50 overflow-hidden">
          <TasklyIcon className="min-w-6 text-primary-container" />
          {!isCollapsed && (
            <span className="font-black text-xl text-slate-900 tracking-tighter transition-opacity duration-200">
              TASKLY
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`flex items-center gap-4 p-3 rounded-sm transition-all group
                  ${isActive ? "bg-primary/5 text-primary border-r-4 border-primary" : "text-slate-500 hover:bg-slate-50"}
                  ${isCollapsed ? "md:justify-center md:px-0" : ""}
                `}
              >
                <div className={`w-6 h-6 flex items-center justify-center ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"}`}>
                  {item.icon}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className="text-sm font-bold truncate transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-50 space-y-4">
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
            className={`flex items-center cursor-pointer gap-3 w-full text-error hover:bg-error/5 p-3 rounded-sm transition-colors ${isCollapsed ? "md:justify-center" : ""}`}
          >
            <LogoutIcon />
            {(!isCollapsed || isMobileMenuOpen) && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};