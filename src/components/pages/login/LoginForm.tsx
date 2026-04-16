"use client";
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useLogin } from '@/hooks/useLogin'

const LoginForm = () => {
    const { register, onSubmit, errors, isSubmitting } = useLogin();
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {errors.root && (
                <div className="bg-red-50 text-error text-xs p-3 rounded-sm border border-error/20">
                    {errors.root.message}
                </div>
            )}

            <Input
                label="Email Address"
                type="email"
                placeholder="yourname@company.com"
                {...register("email")}
                error={errors.email?.message}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password?.message}
            />


            <div className="flex items-center justify-between gap-2">

                <div className='flex items-center gap-0.5'>
                    <input
                        type="checkbox"
                        id="remember"
                        {...register("rememberMe")}
                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember" className="text-xs text-gray-dark font-medium cursor-pointer">
                        Remember Me
                    </label>
                </div>

                <Link href="forgotPassword" className="hidden md:block text-xs font-bold text-primary hover:underline">
                    Forgot Password?
                </Link>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Logging in..." : "Log In"}
            </Button>

            <p className="text-center text-sm text-slate-500">
                Don’t have an account?
                <Link href="/signup" className="text-primary font-semibold hover:underline">
                    Sign Up
                </Link>
            </p>
        </form>
    )
}

export default LoginForm