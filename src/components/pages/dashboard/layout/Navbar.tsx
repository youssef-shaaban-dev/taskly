"use client";
import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { getInitials } from "@/utils/getInitials";
import { LogoutIcon } from "@/components/icons";
import { logoutUser } from "@/store/slices/user/userActions";

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      router.push("/login");
    } else {
      alert("Logout failed, please try again.");
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

  return (
    <nav className="h-16 border-b bg-white px-8 flex items-center justify-end fixed top-0 right-0 left-0 md:left-64 z-30 transition-all">
      <div className="relative" ref={dropdownRef}>
        {/* Avatar Trigger */}
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity"
        >
          {getInitials(user?.user_metadata?.name || "User")}
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-md shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-slate-50 mb-1">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.user_metadata?.name}</p>
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
    </nav>
  );
};