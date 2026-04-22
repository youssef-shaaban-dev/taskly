import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import z from "zod";
import { passwordSchema } from "../../signup/schemas/signUpSchema";

import { resetPasswordService } from "../services/resetPasswordService";

type ResetPasswordData = z.infer<typeof passwordSchema>;

export const useResetPassword = (token: string | null) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) return;

    try {
      const response = await resetPasswordService(data.password, token);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update password.";
      form.setError("root", { message });
    }
  };

  return {
    form,
    onSubmit,
    success,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
};
