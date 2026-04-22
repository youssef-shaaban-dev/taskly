"use client";
import Input from "@/components/ui/Input";
import { useFormContext, useWatch, Controller } from "react-hook-form";

export default function SignUpFields() {
    const { control, formState: { errors } } = useFormContext();

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
        <>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <div>
                        <Input
                            {...field}
                            label="Name"
                            placeholder="Enter your full name"
                            error={errors.name?.message as string}
                        />
                    </div>
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Email"
                        type="email"
                        placeholder="yourname@company.com"
                        error={errors.email?.message as string}
                    />
                )}
            />

            <Controller
                name="job_title"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Job Title (Optional)"
                        placeholder="e.g. Project Manager"
                        error={errors.job_title?.message as string}
                    />
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label="Password"
                            type="password"
                            placeholder="Minimum 8 characters"
                            error={errors.password?.message as string}
                        />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label="Confirm Password"
                            type="password"
                            placeholder="Repeat your password"
                            error={errors.confirmPassword?.message as string}
                        />
                    )}
                />

                {/* Password Requirements Checklist */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5 mt-1">
                    {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="flex items-center justify-center transition-all duration-300">
                                {req.met ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-success">
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
            </div>
        </>
    );
}