import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, LoginFormData } from "@/components/features/auth/schemas/loginSchema";
import Cookies from "js-cookie";
import { apiClient } from "@/utils/apiClient";

export const useLogin = () => {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode:"onBlur",
    defaultValues: { email: "", password: "", rememberMe: false }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await apiClient("/auth/v1/token?grant_type=password", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        form.setError("root", { message: result.error_description || "Invalid email or password" });
        return;
      }

      const cookieOptions = data.rememberMe ? { expires: 7 } : {};
      
      Cookies.set("access_token", result.access_token, cookieOptions);
      Cookies.set("refresh_token", result.refresh_token, cookieOptions);

      router.push("/dashboard"); 
      router.refresh();
    } catch (error) {
      form.setError("root", { message: "Network error, please try again." });
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
};