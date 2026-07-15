import { redirect } from "next/navigation";
import { getToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const ServerGet = async (url: string) => {
  const response = await fetch(`${baseUrl}/api/${url}`, {
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
  const response = await fetch(`${baseUrl}/api/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return handleStatusCode(response);
};

export const ServerDelete = async (url: string) => {
  const response = await fetch(`${baseUrl}/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
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
