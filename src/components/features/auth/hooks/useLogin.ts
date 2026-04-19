import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, LoginFormData } from "@/components/features/auth/schemas/loginSchema";
import Cookies from "js-cookie";
import { apiClient } from "@/utils/apiClient";
import { COOKIES, ROUTES, API_ENDPOINTS } from "@/constant";

export const useLogin = () => {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "", rememberMe: false }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await apiClient(`${API_ENDPOINTS.AUTH_TOKEN}?grant_type=password`, {
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

      Cookies.set(COOKIES.ACCESS_TOKEN, result.access_token, cookieOptions);
      Cookies.set(COOKIES.REFRESH_TOKEN, result.refresh_token, cookieOptions);

      router.push(ROUTES.HOME);
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