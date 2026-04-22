"use client";
import { useLogin } from '@/components/features/auth/login/hooks/useLogin'
import LoginFields from './LoginFields';
import { LoginActions } from './LoginActions';
import { Form, FormProvider } from 'react-hook-form';
import FormError from '../../shared/FormError';

const LoginForm = () => {
    const { form, onSubmit } = useLogin();

    return (
        <FormProvider {...form}>
            <Form control={form.control} onSubmit={({ data }) => onSubmit(data)} className="flex flex-col gap-6">

                <FormError />

                <LoginFields />

                <LoginActions />

            </Form>
        </FormProvider>
    )
}

export default LoginForm