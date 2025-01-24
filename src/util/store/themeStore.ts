import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      mode: "light", // default
      toggleTheme: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        })),
    }),
    { name: "theme-storage" }
  )
);
