import { apiClient } from "@/utils/apiClient";
import { SignUpFormData } from "../schemas/signUpSchema";

export const SignupService = async (data: SignUpFormData) => {
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

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.msg || result.message || "Failed to create account");
  }

  return result;
};
