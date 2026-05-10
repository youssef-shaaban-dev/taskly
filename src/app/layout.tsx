import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import AuthHashHandler from "@/components/features/auth/shared/AuthHashHandler";
import { Toaster } from "sonner";
import { Suspense } from "react";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Tasks Management",
  description: "Task - rafiq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" richColors />
        <QueryProvider>
          <StoreProvider>
            <Suspense fallback={null}>
              <AuthHashHandler />
            </Suspense>
            {children}
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

