"use client";
import { useResetPassword } from "@/components/features/auth/reset-password/hooks/useResetPassword";
import { useSearchParams } from "next/navigation";
import { COOKIES, ROUTES } from "@/constant";
import Link from "next/link";
import { Form, FormProvider } from "react-hook-form";
import ResetPasswordFields from "./ResetPasswordFields";
import { ResetPasswordActions } from "./ResetPasswordActions";
import FormError from "../../shared/FormError";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get(COOKIES.ACCESS_TOKEN);

    const { form, onSubmit, isSubmitting, success } = useResetPassword(token);

    if (!token) {
        return (
            <div className="p-6 text-center bg-red-50 text-error rounded-xl border border-error/20">
                <p className="font-bold">Invalid or expired reset link.</p>
                <Link href={ROUTES.FORGOT_PASSWORD} className="text-xs underline mt-2 inline-block">
                    Try requesting a new link
                </Link>
            </div>
        );
    }

    return (
        <FormProvider {...form}>
            <Form control={form.control} onSubmit={({ data }) => onSubmit(data)} className="flex flex-col gap-6">
                <div className="space-y-2">
                    <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Create a New Password</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Create a new, strong password to secure your workstation access.
                    </p>
                </div>

                <FormError />

                <ResetPasswordFields />

                <ResetPasswordActions isSubmitting={isSubmitting} success={success} />
            </Form>
        </FormProvider>
    );
};

export default ResetPasswordForm;