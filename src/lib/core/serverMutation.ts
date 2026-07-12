import { redirect } from "next/navigation";
import { getToken } from "./session";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.NEXT_PUBLIC_BASE_URL?.trim()) {
    return process.env.NEXT_PUBLIC_BASE_URL.trim();
  }

  return "http://localhost:3000";
};

const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const buildApiUrl = (url: string) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/${url}`;
};

export const ServerGet = async (url: string) => {
  const response = await fetch(buildApiUrl(url), {
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  });
  return handleStatusCode(response);
};

export const ServerMutation = async (
  url: string,
  data: object,
  method = "POST",
) => {
  const response = await fetch(buildApiUrl(url), {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return handleStatusCode(response);
};

const handleStatusCode = (res: Response) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  }
  if (res.status === 403) {
    redirect("/forbidden");
  }
  return res.json();
};
