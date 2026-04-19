"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { COOKIES, ROUTES } from "@/constant";

/**
 * Component to handle Supabase auth hash fragments (e.g. recovery tokens).
 * Supabase often redirects to the site URL with tokens in the URL hash.
 */
export default function AuthHashHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthHash = () => {
      const hash = window.location.hash;
      console.log("AuthHashHandler detected hash:", hash);
      if (!hash) return;

      // Supabase fragments look like: #access_token=...&type=recovery
      const params = new URLSearchParams(hash.replace("#", "?"));
      const type = params.get("type");
      const accessToken = params.get(COOKIES.ACCESS_TOKEN);

      if (type === "recovery" && accessToken) {
        console.log("Recovery token found! Redirecting to /reset-password...");
        // Clear the hash from the URL to prevent processing it again
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        
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
