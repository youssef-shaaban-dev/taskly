import SignUpForm from "@/components/pages/signUp/SignUpForm";
import AuthWrapper from "@/components/shared/AuthWrapper";

export default function SignUpPage() {

  return (
    <AuthWrapper title="Create your workspace" subtitle="Join the editorial approach to task management.">
      <SignUpForm />
    </AuthWrapper>
  );
}