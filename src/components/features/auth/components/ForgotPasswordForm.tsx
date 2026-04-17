"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForgotPassword } from "@/components/features/auth/hooks/useForgotPassword";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const {
    register,
    onSubmit,
    errors,
    isSubmitting,
    serverMessage,
    countdown,
    trials,
    formatTime,
    handleResend,
  } = useForgotPassword();
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Input
        label="Email Address"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message || errors.root?.message}
        // variant="mobile"
      />

      <Button
        type="submit"
        disabled={isSubmitting || countdown > 0 || trials >= 3}
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>

      <Link
        href="/login"
        className="text-center text-[12px] font-bold text-primary hover:underline"
      >
        ← Back to log in
      </Link>

      {serverMessage && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-sm flex items-start gap-3">
          <div className="text-emerald-600 mt-0.5">✓</div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            {serverMessage}
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Didn&apos;t receive the email?
        </span>

        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || trials >= 3}
          className={`
      w-full flex items-center justify-center gap-2 py-4 rounded-sm transition-all duration-300
      ${
        countdown > 0
          ? "bg-[#F1F3FF] text-slate-400 cursor-not-allowed"
          : "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
      }
    `}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>

          <span className="text-[12px] font-bold">
            {countdown > 0
              ? `Resend in ${formatTime(countdown)}`
              : "Resend Email Now"}
          </span>
        </button>

        {trials >= 3 && (
          <p className="text-[10px] text-error font-bold mt-1">
            Maximum trials reached.
          </p>
        )}
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
