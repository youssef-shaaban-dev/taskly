"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ROUTES } from "@/constant";

interface SignUpActionsProps {
    isSubmitting: boolean;
}

export const SignUpActions = ({ isSubmitting }: SignUpActionsProps) => {
    return (
        <>
            <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                {isSubmitting ? "Creating..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-slate-500 font-normal">
                Already have an account?
                <Link href={ROUTES.LOGIN} className="text-primary ml-1 font-semibold hover:underline">
                    Log in
                </Link>
            </p>
        </>
    );
};