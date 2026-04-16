import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { passwordSchema } from "@/schemas/signUpSchema";
import { apiClient } from "@/utils/apiClient";
import z from "zod";

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
      const response = await apiClient("/auth/v1/user", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password: data.password }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (error) {
      form.setError("root", { message: "Failed to update password." });
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    success,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
};
