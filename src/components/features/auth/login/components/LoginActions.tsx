import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useFormContext } from 'react-hook-form';
import { ROUTES } from '@/constant';



export const LoginActions = () => {
    const { register, formState: { isSubmitting } } = useFormContext();
    return (
        <>
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

                <Link href={ROUTES.FORGOT_PASSWORD} className="text-xs font-bold text-primary hover:underline">
                    Forgot Password?
                </Link>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Logging in..." : "Log In"}
            </Button>

            <p className="text-center text-sm text-slate-500">
                Don’t have an account?
                <Link href={ROUTES.SIGNUP} className="text-primary font-semibold hover:underline">
                    Sign Up
                </Link>
            </p>
        </>
    );
};