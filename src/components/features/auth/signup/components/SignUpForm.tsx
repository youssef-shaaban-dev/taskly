"use client";
import { FormProvider, Form } from 'react-hook-form';
import { useSignUp } from '@/components/features/auth/signup/hooks/useSignup';
import SignUpFields from './SignUpFields';
import { SignUpActions } from './SignUpActions';
import FormError from '../../shared/FormError';

const SignUpForm = () => {
    const { form, onSubmit, isSubmitting } = useSignUp();

    return (
        <FormProvider {...form}>

            <Form control={form.control} onSubmit={({ data }) => onSubmit(data)} className="flex flex-col gap-5">

                <FormError />

                <SignUpFields />

                <SignUpActions isSubmitting={isSubmitting} />

            </Form>
        </FormProvider>
    );
}

export default SignUpForm;