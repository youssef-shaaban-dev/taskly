import Button from "@/components/ui/Button";
import Link from "next/link";
import { ROUTES } from "@/constant";

interface ResetPasswordActionsProps {
    isSubmitting: boolean;
    success: boolean;
}

export const ResetPasswordActions = ({ isSubmitting, success }: ResetPasswordActionsProps) => {
    return (
        <div className="space-y-4 pt-2">
            {success && (
                <div className="bg-emerald-50 text-emerald-700 p-4 text-xs rounded-sm border border-emerald-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                    <span className="text-lg">✓</span>
                    Your password has been updated successfully. Redirecting to login...
                </div>
            )}

            <Button type="submit" disabled={isSubmitting || success} className="w-full">
                {isSubmitting ? "Updating..." : "Update Password"}
            </Button>

            <div className="text-center">
                <Link href={ROUTES.LOGIN} className="text-[12px] font-bold text-primary hover:underline transition-all">
                    Back to Log In
                </Link>
            </div>
        </div>
    );
};
