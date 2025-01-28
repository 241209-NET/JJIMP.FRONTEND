import { Box, Stack } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./util/auth/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
// import Project from "./pages/Project";
import IssueBoard from "./pages/IssueBoard";
import UserList from "./pages/UserList";
<<<<<<< HEAD
import Project2 from "./pages/Project2";
import { useEffect } from "react";
=======
>>>>>>> 6d3bfe3 (MUI updates)

export default function App() {
  useEffect(() => {
    //fetch users,projects,issues
    //store in zustand
  }, []);

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
                marginInline: "auto",
                mt: "4rem",
                width: "100% !important", // forcing width that was being override by margin
                maxWidth: "1400px !important",
                padding: "1rem",
                minHeight: "calc(100vh - 4rem)",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Project2 />} />
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
