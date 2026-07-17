export async function getToken(): Promise<string | null> {
  if (typeof document === "undefined") return null;
  const raw = document.cookie.split("; ").find((row) => row.startsWith("better-auth.session_token"));
  return raw ? raw.split("=")[1] : null;
}

export async function getNotifications() {
  try {
    const token = await getToken();
    const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
    const res = await fetch(`${base}/api/notifications`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Notifications fetch failed: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("getNotifications error:", err);
    throw err;
  }
}

export async function markAsRead(id: string) {
  try {
    const token = await getToken();
    const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
    const res = await fetch(`${base}/api/notifications/${id}/read`, {
      method: "PATCH",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      credentials: "include",
    });
    if (!res.ok) throw new Error(`Mark as read failed: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("markAsRead error:", err);
    throw err;
  }
}

export async function deleteNotification(id: string) {
  try {
    const token = await getToken();
    const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
    const res = await fetch(`${base}/api/notifications/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      credentials: "include",
    });
    if (!res.ok) throw new Error(`Delete notification failed: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("deleteNotification error:", err);
    throw err;
  }
}
