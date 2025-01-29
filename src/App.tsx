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
import axios from "axios";
import { useCurrentUserStore } from "./util/store/currentUserStore";
import { useProjectStore } from "./util/store/projectStore";
import { useUserStore } from "./util/store/userStore";
import { useIssueStore } from "./util/store/issueStore";
import { IssueStatus } from "./util/mockdata/mockData";

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
  const { setCurrentUser } = useCurrentUserStore();
  const { setProjects } = useProjectStore();
  const { setUsers } = useUserStore();
  const { setIssues } = useIssueStore();

  const mapIssueStatus = (status: number): IssueStatus => {
    const statusMap: { [key: number]: IssueStatus } = {
      0: IssueStatus.Inactive,
      1: IssueStatus.Active,
      2: IssueStatus.Review,
      3: IssueStatus.Complete,
    };
    return statusMap[status] || IssueStatus.Inactive; // Default to Inactive if undefined
  };

  useEffect(() => {
    //autologin
    const autoLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Fetch user details using the new "current" endpoint
          const userResponse = await axios.get<User>(
            `${baseURL}/api/User/current`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Set the current user and fetch tweets
          setCurrentUser(userResponse.data);
        } catch (error) {
          console.error("Auto-login error:", error);
          localStorage.removeItem("token"); // Remove invalid token if auto-login fails
        }
      }
    };
    autoLogin();

    // if there's a user logged in

    //fetch users,projects,issues and store in zustand
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>(`${baseURL}/api/Project`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching Projects:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${baseURL}/api/User`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    const fetchIssues = async () => {
      try {
        const response = await axios.get<Issue[]>(`${baseURL}/api/Issue`);

        // Map the response to adjust the status field
        const adjustedIssues = response.data.map((issue) => ({
          ...issue,
          status: mapIssueStatus(issue.status as unknown as number), // Convert status from number to enum
        }));

        setIssues(adjustedIssues);
      } catch (error) {
        console.error("Error fetching Issues:", error);
      }
    };

    fetchIssues();
    fetchProjects();
    fetchUsers();
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
