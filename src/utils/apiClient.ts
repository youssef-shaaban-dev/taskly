import Cookies from "js-cookie";
import { COOKIES, ROUTES, API_ENDPOINTS } from "@/constant";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const accessToken = Cookies.get(COOKIES.ACCESS_TOKEN);

  const headers = {
    "Content-Type": "application/json",
    apikey: API_KEY || "",
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    const refreshToken = Cookies.get(COOKIES.REFRESH_TOKEN);

    if (refreshToken) {
      const refreshResponse = await fetch(
        `${BASE_URL}${API_ENDPOINTS.AUTH_TOKEN}?grant_type=refresh_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: API_KEY || "",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        },
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();

        Cookies.set(COOKIES.ACCESS_TOKEN, data.access_token);
        Cookies.set(COOKIES.REFRESH_TOKEN, data.refresh_token);

        const newHeaders = {
          ...headers,
          Authorization: `Bearer ${data.access_token}`,
        };
        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...options,
          headers: newHeaders,
        });
      } else {
        Cookies.remove(COOKIES.ACCESS_TOKEN);
        Cookies.remove(COOKIES.REFRESH_TOKEN);
        window.location.href = ROUTES.LOGIN;
      }
    }
  }

  return response;
};
