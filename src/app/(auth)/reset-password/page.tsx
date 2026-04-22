import { Suspense } from "react";
import ResetPasswordForm from "@/components/features/auth/reset-password/components/ResetPasswordForm";
import AuthWrapper from "@/components/shared/AuthWrapper";

const ResetPasswordPage = () => {
  return (
    <AuthWrapper
      title="Create a New Password"
      subtitle="Create a new, strong password to secure your workstation access."
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthWrapper>
  );
};

export default ResetPasswordPage;