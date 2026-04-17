"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  DashboardIcon, MonitoringIcon, InventoryIcon, 
  GroupsIcon, DescriptionIcon 
} from "@/components/icons";

export const BottomNav = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Projects", icon: <DashboardIcon />, path: "/projects" },
    { label: "Monitoring", icon: <MonitoringIcon />, path: "/monitoring" },
    { label: "Inventory", icon: <InventoryIcon />, path: "/inventory" },
    { label: "Groups", icon: <GroupsIcon />, path: "/groups" },
    { label: "Details", icon: <DescriptionIcon />, path: "/details" },
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