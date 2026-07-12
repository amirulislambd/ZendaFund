"use client";

import { useEffect } from "react";
import { applyTheme, resolveTheme } from "@/lib/theme";

export default function ThemeInitializer() {
  useEffect(() => {
    const nextTheme = resolveTheme();
    applyTheme(nextTheme);
  }, []);

  return null;
}
