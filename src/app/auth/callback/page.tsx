"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
    const router = useRouter();

    console.log("test");

    useEffect(() => {
        const hash = window.location.hash;

        console.log(hash);

        if (hash) {

            const params = new URLSearchParams(hash.replace("#", "?"));

            const accessToken = params.get("access_token");
            const type = params.get("type");

            console.log(accessToken);

            console.log(type)

            if (type === "recovery" && accessToken) {
                router.push(`/resetPassword?access_token=${accessToken}`);
            } else {
                router.push("/login");
            }
        } else {
            router.push("/");
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium animate-pulse">Verifying access link...</p>
            </div>
        </div>
    );
}