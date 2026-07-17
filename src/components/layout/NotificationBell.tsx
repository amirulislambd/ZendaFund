"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

import {
  DeleteNotification,
  GetNotifications,
  MarkNotificationRead,
} from "@/lib/api/notifications";
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
  const soundUnlockedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
    );
  }, []);

  useEffect(() => {
    const unlockSound = async () => {
      if (!audioRef.current || soundUnlockedRef.current) return;
      audioRef.current.muted = true;
      try {
        await audioRef.current.play();
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.muted = false;
        soundUnlockedRef.current = true;
      } catch (error) {
        console.warn("Audio unlock attempt failed:", error);
      }
    };

    const handleFirstInteraction = () => {
      unlockSound();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction, {
      once: true,
    });
    document.addEventListener("keydown", handleFirstInteraction, {
      once: true,
    });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const fetchNotifications = async () => {
    if (!session?.user) return;

    try {
      const data = await GetNotifications();

      if (data.success) {
        const unreadCount = data.data.filter(
          (n: Notification) => !n.read,
        ).length;

        const previousUnread = notifications.filter((n) => !n.read).length;

        if (unreadCount > previousUnread && notifications.length > 0) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.75;
            audioRef.current.play().catch(() => {
              // User interaction may be required before audio playback works.
            });
          }

          const newest = data.data.find((n: Notification) => !n.read);

          if (newest) {
            toast.success(newest.message, {
              duration: 5000,
            });
          }
        }

        setNotifications(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleMarkAsRead = async (id: string) => {
    try {
      await MarkNotificationRead(id);

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DeleteNotification(id);

      fetchNotifications();

      toast.success("Notification deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!session?.user) return null;
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-[var(--surface-muted)]
          "
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span
            className="
                absolute
                right-1
                top-1
                flex
                h-4
                w-4
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-[10px]
                font-bold
                text-white
              "
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>{" "}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              right-0
              mt-2
              z-50
              w-[22rem]

              max-sm:fixed
              max-sm:left-2
              max-sm:right-2
              max-sm:top-16
              max-sm:w-auto

              rounded-2xl
              border
              p-2
              shadow-2xl
              backdrop-blur-md
            "
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--border)]
                px-3
                py-2
              "
            >
              <h3 className="text-sm font-semibold">Notifications</h3>

              {unreadCount > 0 && (
                <span
                  className="
                    rounded-full
                    bg-cyan-500/20
                    px-2
                    py-0.5
                    text-xs
                    text-cyan-400
                  "
                >
                  {unreadCount} new
                </span>
              )}
            </div>

            <div
              className="
                mt-2
                max-h-[70vh]
                space-y-2
                overflow-y-auto
              "
            >
              {notifications.length === 0 ? (
                <p
                  className="
                    py-6
                    text-center
                    text-sm
                    text-[var(--muted)]
                  "
                >
                  No notifications
                </p>
              ) : (
                notifications.map((notif) => (
                  <motion.div
                    key={notif._id}
                    layout
                    className="
                        rounded-xl
                        border
                        border-white/5
                        p-3
                      "
                  >
                    <p
                      className="
                          break-words
                          text-sm
                        "
                    >
                      {notif.message}
                    </p>

                    <p
                      className="
                          mt-1
                          text-[11px]
                          text-[var(--muted)]
                        "
                    >
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>

                    <div
                      className="
                          mt-3
                          flex
                          gap-2
                        "
                    >
                      {!notif.read && (
                        <button
                          onClick={() => handleMarkAsRead(notif._id)}
                          className="
                              flex-1
                              rounded-lg
                              bg-cyan-500/10
                              py-2
                              text-xs
                              text-cyan-400
                            "
                        >
                          Mark Read
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(notif._id)}
                        className="
                            flex-1
                            rounded-lg
                            bg-red-500/10
                            py-2
                            text-xs
                            text-red-400
                          "
                      >
                        Delete
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