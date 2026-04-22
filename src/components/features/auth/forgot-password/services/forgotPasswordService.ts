import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS, ROUTES } from "@/constant";

export const forgotPasswordService = async (email: string) => {
  const response = await apiClient(API_ENDPOINTS.AUTH_RECOVER, {
    method: "POST",
    body: JSON.stringify({
      email,
      options: {
        redirectTo: `${window.location.origin}${ROUTES.CALLBACK}`,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send reset link.");
  }

  return response;
};
