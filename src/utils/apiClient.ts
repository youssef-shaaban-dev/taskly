const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    "apikey": API_KEY ,
    "Authorization": `Bearer ${API_KEY}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};