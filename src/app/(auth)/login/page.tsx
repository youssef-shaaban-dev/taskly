import LoginForm from "@/components/features/auth/components/LoginForm"
import AuthWrapper from "@/components/shared/AuthWrapper"

const LoginPage = () => {
    return (
        <AuthWrapper title="Welcome Back" subtitle="Please enter your details to access your workspace">
            <LoginForm />
        </AuthWrapper>
    )
}

export default LoginPage