"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { apiClient } from "@/utils/apiClient";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signUpSchema.pick({ password: true, confirmPassword: true })),
        mode: "onBlur"
    });

    const passwordValue = useWatch({ control, name: "password", defaultValue: "" });

    const passwordRequirements = [
        { label: "8-64 characters", met: passwordValue.length >= 8 && passwordValue.length <= 64 },
        { label: "Uppercase & Lowercase", met: /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue) },
        { label: "At least one digit", met: /[0-9]/.test(passwordValue) },
        { label: "Special character", met: /[^A-Za-z0-9]/.test(passwordValue) },
    ];

    const onSubmit = async (data: any) => {
        try {
            const response = await apiClient("/auth/v1/user", {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ password: data.password }),
            });

            if (response.ok) {
                // إظهار رسالة النجاح ثم التوجيه
                router.push("/login?message=Password updated successfully");
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">Create a New Password</h2>
                    <p className="text-slate-500 text-body-md">Create a new, strong password to secure your workspace access.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <Input
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        error={errors.password?.message}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                    />

                    {/* الـ Checklist المطلبوبة في الفيجما */}
                    <div className="bg-[#F1F3FF]/50 p-4 rounded-sm space-y-2">
                        <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Security Requirements</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {passwordRequirements.map((req, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${req.met ? "bg-success border-success" : "border-slate-300"}`}>
                                        {req.met && <span className="text-white text-[8px]">✓</span>}
                                    </div>
                                    <span className={`text-[10px] ${req.met ? "text-slate-900" : "text-slate-400"}`}>{req.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting || !token} className="w-full">
                        Update Password
                    </Button>

                    <Link href="/login" className="text-center text-[12px] font-bold text-primary hover:underline">
                        Back to Log In
                    </Link>
                </form>
            </div>
        </div>
    );
}