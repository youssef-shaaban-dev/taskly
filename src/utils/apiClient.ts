import Cookies from "js-cookie";
import { COOKIES, API_ENDPOINTS } from "@/constant";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export const apiClient = async (
  endpoint: string,
  options: ApiOptions = {},
): Promise<Response> => {
  const accessToken = Cookies.get(COOKIES.ACCESS_TOKEN);

  // Handle query parameters
  let url = `${BASE_URL}${endpoint}`;
  if (options.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers = {
    "Content-Type": "application/json",
    apikey: API_KEY || "",
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  let response = await fetch(url, { ...options, headers });

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
        response = await fetch(url, {
          ...options,
          headers: newHeaders,
        });
      } else {    
        Cookies.remove(COOKIES.ACCESS_TOKEN);
        Cookies.remove(COOKIES.REFRESH_TOKEN);
      }
    }
  }

  return response;
};
