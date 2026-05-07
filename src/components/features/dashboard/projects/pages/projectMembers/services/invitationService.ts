import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";

export interface SendInvitePayload {
  p_email: string;
  p_project_id: string;
  p_app_url: string; 
  p_base_url: string; 
}


export const sendInvitationService = async (payload: SendInvitePayload) => {
  const url = API_ENDPOINTS.INVITE_MEMBER;

  const response = await apiClient(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send invitation.");
  }

  return true;
};

export const acceptInvitationService = async (token: string) => {
  const url = API_ENDPOINTS.ACCEPT_INVITATION;

  const response = await apiClient(url, {
    method: "POST",
    body: JSON.stringify({ p_token: token }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Invalid or expired invitation token.");
  }

  return true;
};