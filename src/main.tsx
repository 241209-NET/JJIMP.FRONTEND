import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useThemeStore } from "./util/store/themeStore.ts"; // Zustand store for theme management
import { deepmerge } from "@mui/utils"; // Helps merge themes
import "./Index.css";
import "bootstrap/dist/css/bootstrap.css";

export default function RootComponent() {
  const { mode } = useThemeStore(); // Get theme mode from Zustand

  const defaultDarkTheme = createTheme({ palette: { mode: "dark" } });
  const customLightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ede7f6", // Soft lavender
      },
      secondary: {
        main: "#b1a1f7", // Softer accents
      },
      background: {
        default: "#f5f3fc",
        paper: "#ffffff",
      },
    },
  });

  const theme = useMemo(() => {
    return mode === "light"
      ? customLightTheme
      : deepmerge(defaultDarkTheme, {});
  }, [mode]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<RootComponent />);
