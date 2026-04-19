import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS, ROUTES } from "@/constant";

const forgotSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export const useForgotPassword = () => {
  const [serverMessage, setServerMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [trials, setTrials] = useState(0);

  const form = useForm<{ email: string }>({
    resolver: zodResolver(forgotSchema),
  });

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const onSubmit = async (data: { email: string }) => {
    if (trials >= 3) return;

    try {
      await apiClient(API_ENDPOINTS.AUTH_RECOVER, {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          options: {
            redirectTo: `${window.location.origin}${ROUTES.CALLBACK}`,
          },
        }),
      });

      setServerMessage(
        "If an account exists with this email, we've sent a link.",
      );
      form.reset();
      setCountdown(300);
      setTrials((prev) => prev + 1);
    } catch (error) {
      if (error instanceof Error) {
        form.setError("root", { message: error.message });
      }
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || trials >= 3) return;

    const currentEmail = form.getValues("email");

    if (currentEmail) {
      await onSubmit({ email: currentEmail });
    } else {
      form.trigger("email");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    serverMessage,
    countdown,
    trials,
    formatTime,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    handleResend,
  };
};
