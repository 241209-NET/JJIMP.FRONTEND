import { Box, Stack } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./util/auth/AuthContext";
import Navbar from "./components/Navbar";
import { Home } from "@mui/icons-material";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(45deg, #181c1d 30%, #1a1c1f 90%)",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Stack>
            <Navbar />
            <Box
              sx={{
                margin: "0 auto",
                "margin-top": "4rem",
                maxWidth: "1250px",
                padding: "1rem",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Stack>
        </AuthProvider>
      </BrowserRouter>
    </Box>
  );
}
