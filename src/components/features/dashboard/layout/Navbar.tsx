"use client";
import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { getInitials } from "@/utils/getInitials";
import { LogoutIcon, MenuIcon } from "@/components/icons";
import { logoutUser } from "@/store/slices/user/userActions";
import { toggleMobileMenu } from "@/store/slices/uiSlice";
import { toast } from "sonner";

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const name = user?.user_metadata?.name || "User";
  const job = user?.user_metadata?.department || "";

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      router.push("/login");
    } else {
      toast.error("Logout failed, please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <nav className="h-16 border-b bg-white animate-pulse fixed top-0 right-0 left-0 z-30" />;
  }

  return (
    <nav className="h-16 border-b bg-white px-4 md:px-8 flex items-center justify-between fixed top-0 right-0 left-0 md:left-64 z-30 transition-all duration-300 has-[aside[data-collapsed=true]]:md:left-[90px]">
      
      <button 
        onClick={() => dispatch(toggleMobileMenu())}
        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <MenuIcon />
      </button>

      <div className="flex items-center gap-4 ml-auto">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-slate-900 leading-none">{name}</p>
          <p className="text-[0.83rem] text-primary uppercase font-bold mt-1.5">{job}</p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity"
          >
            {getInitials(name)}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-md shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-50 mb-1">
                <p className="text-xs font-bold text-slate-900 truncate">{name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors"
              >
                <LogoutIcon />
                <span className="font-bold">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};