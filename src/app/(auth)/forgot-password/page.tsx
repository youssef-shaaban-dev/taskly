import ForgotPasswordForm from "@/components/features/auth/forgot-password/components/ForgotPasswordForm"
import AuthWrapper from "@/components/shared/AuthWrapper"

const ForgotPasswordPage = () => {
    return (
        <AuthWrapper title="Forgot password?" subtitle="No worries, we'll send you reset instructions." >
            <ForgotPasswordForm />
        </AuthWrapper>
    )
}

export default ForgotPasswordPage