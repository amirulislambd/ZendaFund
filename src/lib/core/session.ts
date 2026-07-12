"use server";
import { headers } from "next/headers";
import { auth } from "../auth";

export const UserSessionToSSR = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user || null;
  return user;
};

export const getToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session.token;
};
