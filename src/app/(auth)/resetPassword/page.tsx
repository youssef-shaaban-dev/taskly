import ResetPasswordForm from "@/components/pages/resetPassword/ResetPasswordForm";
import AuthWrapper from "@/components/shared/AuthWrapper";

const ResetPasswordPage = () => {
  return (
    <AuthWrapper
      title="Create a New Password"
      subtitle="Create a new, strong password to secure your workstation
access."
    >
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
