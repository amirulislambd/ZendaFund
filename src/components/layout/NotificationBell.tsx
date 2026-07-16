"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

interface Notification {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationBell() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastFetchRef = useRef<Date | null>(null);

  useEffect(() => {
    // Create an audio element for notifications
    audioRef.current = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"+
      "5vT18AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"); // Minimal valid base64 audio for testing, real app needs real audio
    // Fetch real audio:
    audioRef.current = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  }, []);

  const fetchNotifications = async () => {
    if (!session?.user) return;
    try {
      const token = document.cookie.split("; ").find(row => row.startsWith("better-auth.session_token"))?.split("=")[1];
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        // Check for new notifications
        const unreadCount = data.data.filter((n: Notification) => !n.read).length;
        const previousUnread = notifications.filter(n => !n.read).length;
        
        if (unreadCount > previousUnread && notifications.length > 0) {
          // Play sound
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
          }
          // Show toast
          const newest = data.data.find((n: Notification) => !n.read);
          if (newest) {
            toast.custom((t) => (
              <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#0a192f] shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-cyan-500/30 overflow-hidden`}>
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-cyan-400" />
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-white">New Notification</p>
                      <p className="mt-1 text-sm text-slate-300">{newest.message}</p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-cyan-500/20">
                  <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-cyan-400 hover:text-cyan-300 focus:outline-none">
                    Close
                  </button>
                </div>
              </div>
            ));
          }
        }
        setNotifications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const token = document.cookie.split("; ").find(row => row.startsWith("better-auth.session_token"))?.split("=")[1];
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = document.cookie.split("; ").find(row => row.startsWith("better-auth.session_token"))?.split("=")[1];
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      fetchNotifications();
      toast.success("Notification deleted", {
        style: { background: '#0a192f', color: '#fff', border: '1px solid rgba(6, 182, 212, 0.2)' }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!session?.user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center p-2 rounded-full transition hover:bg-[var(--surface-muted)] text-[var(--foreground)]"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 rounded-2xl border p-2 shadow-2xl backdrop-blur-md z-50 origin-top-right"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--foreground)",
            }}
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)]">
              <h3 className="font-semibold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto mt-2 space-y-1 custom-scrollbar">
              {notifications.length === 0 ? (
                <p className="text-center text-sm text-[var(--muted)] py-6">
                  No notifications yet.
                </p>
              ) : (
                notifications.map((notif) => (
                  <motion.div
                    key={notif._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`group relative flex items-start gap-3 rounded-xl p-3 text-sm transition ${
                      notif.read ? "bg-transparent" : "bg-[var(--surface-muted)]/50"
                    }`}
                  >
                    <div className="flex-1">
                      <p className={`${notif.read ? "text-[var(--muted)]" : "text-[var(--foreground)] font-medium"}`}>
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-[var(--muted)] mt-1">
                        {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString()}
                      </p>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                      {!notif.read && (
                        <button
                          onClick={() => handleMarkAsRead(notif._id)}
                          className="p-1.5 rounded-full hover:bg-cyan-500/20 text-cyan-400 transition"
                          title="Mark as read"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notif._id)}
                        className="p-1.5 rounded-full hover:bg-red-500/20 text-red-400 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
