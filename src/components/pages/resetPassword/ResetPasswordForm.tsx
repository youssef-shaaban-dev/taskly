"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useResetPassword } from "@/hooks/useResetPassword";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWatch } from "react-hook-form";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const { register, onSubmit, errors, isSubmitting, success, control } = useResetPassword(token);

    const passwordValue = useWatch({ control, name: "password", defaultValue: "" });

    const requirements = [
        { label: "8-64 characters", met: passwordValue.length >= 8 && passwordValue.length <= 64 },
        { label: "Uppercase letter", met: /[A-Z]/.test(passwordValue) },
        { label: "Lowercase letter", met: /[a-z]/.test(passwordValue) },
        { label: "One digit", met: /[0-9]/.test(passwordValue) },
        { label: "Special character", met: /[^A-Za-z0-9]/.test(passwordValue) },
    ];

    if (!token) {
        return (
            <div className="p-6 text-center bg-red-50 text-error rounded-xl border border-error/20">
                <p className="font-bold">Invalid or expired reset link.</p>
                <Link href="/forgotPassword" className="text-xs underline mt-2 inline-block">
                    Try requesting a new link
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Create a New Password</h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Create a new, strong password to secure your workstation access.
                </p>
            </div>

            {success && (
                <div className="bg-emerald-50 text-emerald-700 p-4 text-xs rounded-sm border border-emerald-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                    <span className="text-lg">✓</span>
                    Your password has been updated successfully. Redirecting to login...
                </div>
            )}

            <div className="space-y-4">
                <Input
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    error={errors.password?.message}
                //   variant="mobile"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                //   variant="mobile"
                />
            </div>

            {/* Security Requirements Checklist */}
            <div className="bg-[#F1F3FF]/50 p-4 rounded-sm space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Security Requirements
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className={`
                w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                ${req.met ? "bg-success border-success" : "bg-white border-slate-200"}
              `}>
                                {req.met && (
                                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="text-white">
                                        <path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <span className={`text-[11px] font-medium transition-colors ${req.met ? "text-slate-900" : "text-slate-400"}`}>
                                {req.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <Button type="submit" disabled={isSubmitting || success} className="w-full">
                    {isSubmitting ? "Updating..." : "Update Password"}
                </Button>

                <div className="text-center">
                    <Link href="/login" className="text-[12px] font-bold text-primary hover:underline transition-all">
                        Back to Log In
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default ResetPasswordForm;