export type ThemeMode = "light" | "dark";

export function applyTheme(nextTheme: ThemeMode) {
  const root = document.documentElement;
  const body = document.body;
  const isDark = nextTheme === "dark";

  root.classList.toggle("dark", isDark);
  root.setAttribute("data-theme", nextTheme);
  root.style.colorScheme = nextTheme;
  root.style.setProperty("--background", isDark ? "#050816" : "#f8fafc");
  root.style.setProperty("--foreground", isDark ? "#f8fafc" : "#0f172a");
  root.style.setProperty("--surface", isDark ? "#0f172a" : "#ffffff");
  root.style.setProperty("--surface-muted", isDark ? "#111827" : "#f1f5f9");
  root.style.setProperty("--border", isDark ? "#334155" : "#e2e8f0");
  root.style.setProperty("--muted", isDark ? "#94a3b8" : "#64748b");
  root.style.setProperty("--accent", isDark ? "#34d399" : "#10b981");

  body.classList.toggle("dark", isDark);
  body.style.backgroundColor = isDark ? "#050816" : "#f8fafc";
  body.style.color = isDark ? "#f8fafc" : "#0f172a";
  body.style.colorScheme = nextTheme;
  body.setAttribute("data-theme", nextTheme);
  window.localStorage.setItem("theme", nextTheme);
}

export function resolveTheme(): ThemeMode {
  const storedTheme = window.localStorage.getItem("theme") as ThemeMode | null;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return storedTheme ?? (prefersDark ? "dark" : "light");
}
