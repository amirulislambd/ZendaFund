"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { applyTheme, resolveTheme } from "@/lib/theme";

type ThemeMode = "light" | "dark";

type ThemeToggleProps = {
  variant?: "icon" | "menu";
};

export default function ThemeToggle({ variant = "icon" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const resolvedTheme = resolveTheme();
    setTheme(resolvedTheme);
    applyTheme(resolvedTheme);
  }, []);

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition"
        style={{
          color: "var(--foreground)",
          backgroundColor: "var(--surface-muted)",
        }}
      >
        <span className="flex items-center gap-2">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </span>
        <span
          className="text-xs uppercase tracking-wide"
          style={{ color: "var(--muted)" }}
        >
          {theme === "dark" ? "On" : "Off"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
        color: "var(--foreground)",
      }}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
