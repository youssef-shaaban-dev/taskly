import { apiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/constant";

export interface UpdateEpicPayload {
  title?: string;
  description?: string;
  assignee_id?: string | null;
  deadline?: string | null;
}

export const updateEpicService = async (
  epicId: string,
  payload: UpdateEpicPayload,
) => {
  const url = `${API_ENDPOINTS.EPICS}?id=eq.${epicId}`;

  const response = await apiClient(url, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update epic.");
  }

  const data = await response.json();
  return data[0];
};
