"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { COOKIES, ROUTES } from "@/constant";

export default function AuthHashHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const params = new URLSearchParams(hash.replace("#", "?"));
      const type = params.get("type");
      const accessToken = params.get(COOKIES.ACCESS_TOKEN);

      if (type === "recovery" && accessToken) {
        // Clear the hash from the URL to prevent processing it again
        router.replace(pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""));
        
        // Redirect to /reset-password with the token in the query params as per requirements
        router.push(`${ROUTES.RESET_PASSWORD}?access_token=${accessToken}`);
      }
    };

    // Initial check
    handleAuthHash();

    // Listen for hash changes
    window.addEventListener("hashchange", handleAuthHash);
    return () => window.removeEventListener("hashchange", handleAuthHash);
  }, [router]);

  return null;
}
