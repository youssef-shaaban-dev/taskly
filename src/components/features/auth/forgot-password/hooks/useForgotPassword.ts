import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordService } from "../services/forgotPasswordService";

const forgotSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
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
      await forgotPasswordService(data.email);

      setServerMessage(
        "If an account exists with this email, we've sent a link.",
      );
      form.reset();
      setCountdown(300);
      setTrials((prev) => prev + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      form.setError("root", { message });
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
    form,
    onSubmit,
    serverMessage,
    countdown,
    trials,
    formatTime,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    handleResend,
  };
};
