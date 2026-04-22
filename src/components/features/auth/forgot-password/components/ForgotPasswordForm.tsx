"use client";
import { useForgotPassword } from "@/components/features/auth/forgot-password/hooks/useForgotPassword";
import { Form, FormProvider } from "react-hook-form";
import ForgotPasswordFields from "./ForgotPasswordFields";
import { ForgotPasswordActions } from "./ForgotPasswordActions";
import FormError from "../../shared/FormError";

const ForgotPasswordForm = () => {
  const {
    form,
    onSubmit,
    isSubmitting,
    serverMessage,
    countdown,
    trials,
    formatTime,
    handleResend,
  } = useForgotPassword();

  return (
    <FormProvider {...form}>
      <Form
        control={form.control}
        onSubmit={({ data }) => onSubmit(data)}
        className="flex flex-col gap-6"
      >
        <FormError />

        <ForgotPasswordFields />

        <ForgotPasswordActions
          isSubmitting={isSubmitting}
          countdown={countdown}
          trials={trials}
          serverMessage={serverMessage}
          formatTime={formatTime}
          handleResend={handleResend}
        />
      </Form>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
