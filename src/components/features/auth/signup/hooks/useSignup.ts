import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  signUpSchema,
  SignUpFormData,
} from "@/components/features/auth/login/schemas/signUpSchema";
import { apiClient } from "@/utils/apiClient";

export const useSignUp = () => {
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await apiClient("/auth/v1/signup", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          data: {
            name: data.name,
            department: data.job_title,
          },
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Supabase Error:", errorData.msg || errorData.message);
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
};
