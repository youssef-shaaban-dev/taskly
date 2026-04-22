import Input from "@/components/ui/Input";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const ResetPasswordFields = () => {
    const { formState: { errors }, control } = useFormContext();
    const passwordValue = useWatch({ control, name: "password", defaultValue: "" });

    const requirements = [
        { label: "8-64 characters", met: passwordValue.length >= 8 && passwordValue.length <= 64 },
        { label: "Uppercase letter", met: /[A-Z]/.test(passwordValue) },
        { label: "Lowercase letter", met: /[a-z]/.test(passwordValue) },
        { label: "One digit", met: /[0-9]/.test(passwordValue) },
        { label: "Special character", met: /[^A-Za-z0-9]/.test(passwordValue) },
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label="New Password"
                            type="password"
                            placeholder="••••••••"
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
                            placeholder="••••••••"
                            error={errors.confirmPassword?.message as string}
                        />
                    )}
                />
            </div>

            {/* Security Requirements Checklist */}
            <div className="bg-surface-low/50 p-4 rounded-sm space-y-3">
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
        </div>
    );
};

export default ResetPasswordFields;
