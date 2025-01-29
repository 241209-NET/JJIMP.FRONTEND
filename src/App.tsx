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
import Project2 from "./pages/Project2";
import { useEffect } from "react";
import { useAuth } from "./util/auth/AuthContext";
import Profile from "./pages/Profile";

const baseURL = import.meta.env.VITE_BASE_URL;

//Adding route protection
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { id } = useAuth();
  if (!id) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { id } = useAuth();
  if (id) {
    return <Navigate to="/" replace />;
  }
  return children;
};

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
                <Route
                  path="/login"
                  element={
                    <AuthRoute>
                      <Login />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthRoute>
                      <Register />
                    </AuthRoute>
                  }
                />

                {/* Protected routes */}
                <Route
                  path="/project"
                  element={
                    <ProtectedRoute>
                      <Project2 />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project/:id"
                  element={
                    <ProtectedRoute>
                      <IssueBoard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userlist"
                  element={
                    <ProtectedRoute>
                      <UserList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Stack>
        </AuthProvider>
      </BrowserRouter>
    </Box>
  );
}
