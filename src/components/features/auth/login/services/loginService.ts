import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";
import { LoginFormData } from "../schemas/loginSchema";

export const loginService = async (credentials: LoginFormData) => {
  const response = await apiClient(
    `${API_ENDPOINTS.AUTH_TOKEN}?grant_type=password`,
    {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error_description || "Invalid email or password");
  }

  return result;
};
