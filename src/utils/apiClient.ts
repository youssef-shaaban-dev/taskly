import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const accessToken = Cookies.get("access_token");

  const headers = {
    "Content-Type": "application/json",
    apikey: API_KEY || "",
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401 || 403) {
    const refreshToken = Cookies.get("refresh_token");

    if (refreshToken) {
      const refreshResponse = await fetch(
        `${BASE_URL}/auth/v1/token?grant_type=refresh_token`,
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

        Cookies.set("access_token", data.access_token);
        Cookies.set("refresh_token", data.refresh_token);

        const newHeaders = {
          ...headers,
          Authorization: `Bearer ${data.access_token}`,
        };
        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...options,
          headers: newHeaders,
        });
      } else {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/login";
      }
    }
  }

  return response;
};
