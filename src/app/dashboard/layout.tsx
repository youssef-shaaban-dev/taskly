"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Sidebar } from "@/components/pages/dashboard/layout/Sidebar";
import { Navbar } from "@/components/pages/dashboard/layout/Navbar";
import { fetchUser } from "@/store/slices/user/userActions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:pl-64 transition-all duration-300 has-[aside.md:w-[90px]]:md:pl-[90px]">
        <Navbar />
        <main className="pt-24 px-4 md:px-8 pb-8 transition-all">
          {children}
        </main>
      </div>
    </div>
  );
}