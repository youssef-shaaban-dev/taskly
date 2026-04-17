import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";



import AuthHashHandler from "@/components/features/auth/components/AuthHashHandler";

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
        <StoreProvider>
          <AuthHashHandler />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

