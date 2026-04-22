import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  loginSchema,
  LoginFormData,
} from "@/components/features/auth/login/schemas/loginSchema";
import Cookies from "js-cookie";
import { COOKIES, ROUTES } from "@/constant";
import { loginService } from "../services/loginService";

export const useLogin = () => {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginService(data);

      const cookieOptions = data.rememberMe ? { expires: 7 } : {};

      Cookies.set(COOKIES.ACCESS_TOKEN, result.access_token, cookieOptions);
      Cookies.set(COOKIES.REFRESH_TOKEN, result.refresh_token, cookieOptions);

      router.push(ROUTES.HOME);
      router.refresh();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network error, please try again.";
      form.setError("root", {
        message: errorMessage,
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
