import { Box, Stack } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./util/auth/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Project from "./pages/Project";
import IssueBoard from "./pages/IssueBoard";
import UserList from "./pages/UserList";

export default function App() {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        minHeight: "100vh",
        background: "inherit",
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
                mt: "4rem",
                maxWidth: "1250px",
                padding: "1rem",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Project />} />
                <Route path="/project/:id" element={<IssueBoard />} />
                <Route path="/userlist" element={<UserList />} />
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
