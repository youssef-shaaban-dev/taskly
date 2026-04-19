"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useSignUp } from "@/components/features/auth/hooks/useSignup";
import { useWatch } from "react-hook-form";
import Link from "next/link";
import { ROUTES } from "@/constant";

const SignUpForm = () => {

    const { register, onSubmit, errors, isSubmitting, control } = useSignUp();

    const passwordValue = useWatch({
        control,
        name: "password",
        defaultValue: "",
    });

    const passwordRequirements = [
        { label: "At least 8 characters", met: passwordValue.length >= 8 },
        { label: "One uppercase, lowercase, and digit", met: /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue) && /[0-9]/.test(passwordValue) },
        { label: "One special character", met: /[^A-Za-z0-9]/.test(passwordValue) },
    ];
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <Input
                label="Name"
                placeholder="Enter your full name"
                {...register("name")}
                error={errors.name?.message}
            />
            {!errors.name && (
                <span className="text-xs text-slate-300  ml-1 font-medium">
                    3-50 characters, letters only.
                </span>
            )}

            <Input
                label="Email"
                type="email"
                placeholder="yourname@company.com"
                {...register("email")}
                error={errors.email?.message}
            />

            <Input
                label="Job Title (Optional)"
                placeholder="e.g. Project Manager"
                {...register("job_title")}
                error={errors.job_title?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    {...register("password")}
                    error={errors.password?.message}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Repeat your password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />
                {/* Password Requirements Checklist */}
                {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="flex items-center justify-center transition-all duration-300">
                            {req.met ? (
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-success"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : (
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                            )}
                        </div>

                        <span className={`text-[10px] font-medium transition-colors duration-200 ${req.met ? "text-slate-900" : "text-slate-400"}`}>
                            {req.label}
                        </span>
                    </div>
                ))}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                {isSubmitting ? "Creating..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-slate-500 font-normal">
                Already have an account?
                <Link href={ROUTES.LOGIN} className="text-primary ml-1 font-semibold hover:underline">Log in</Link>
            </p>
        </form>
    )
}

export default SignUpForm