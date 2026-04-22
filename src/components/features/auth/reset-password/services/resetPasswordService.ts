import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";

export const resetPasswordService = async (password: string, token: string) => {
  const response = await apiClient(API_ENDPOINTS.USER, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update password.");
  }

  return response;
};
