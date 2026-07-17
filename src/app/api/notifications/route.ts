import { NextResponse } from "next/server";

type Notification = {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
};

// Simple in-memory store for dev. Replace with DB in production.
let notifications: Notification[] = [
  { _id: "1", message: "Welcome to ZendaFund!", read: false, createdAt: new Date().toISOString() },
  { _id: "2", message: "Your campaign was approved.", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
];

export async function GET() {
  return NextResponse.json({ success: true, data: notifications });
}

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean); // ["api","notifications",":id","read"]
  const id = parts[2];
  const action = parts[3];

  if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

  if (action === "read") {
    notifications = notifications.map((n) => (n._id === id ? { ...n, read: true } : n));
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, message: "Unknown action" }, { status: 400 });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts[2];
  if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });
  notifications = notifications.filter((n) => n._id !== id);
  return NextResponse.json({ success: true });
}
