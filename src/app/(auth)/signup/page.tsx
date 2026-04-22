import SignUpForm from "@/components/features/auth/signup/components/SignUpForm";
import AuthWrapper from "@/components/shared/AuthWrapper";

export default function SignUpPage() {

  return (
    <AuthWrapper title="Create your workspace" subtitle="Join the editorial approach to task management.">
      <SignUpForm />
    </AuthWrapper>
  );
}