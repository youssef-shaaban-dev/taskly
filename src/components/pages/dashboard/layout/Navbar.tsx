"use client";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getInitials } from "@/utils/getInitials";
import { toggleMobileMenu } from "@/store/slices/uiSlice";
import { MenuIcon } from "@/components/icons";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) return <nav className="h-16 border-b bg-white animate-pulse fixed top-0 right-0 left-0 z-30" />;

  const name = user?.user_metadata?.name || "User";
  const job = user?.user_metadata?.department || "Worker";

  return (
    <nav className="h-16 border-b bg-white px-4 md:px-8 flex items-center justify-between fixed top-0 right-0 left-0 md:left-64 z-30 transition-all duration-300 has-[aside.md:w-[90px]]:md:left-[90px]">
      
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
        
        {/* Avatar */}
        <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-lg font-bold text-sm shadow-sm">
          {getInitials(name)}
        </div>
      </div>
    </nav>
  );
};