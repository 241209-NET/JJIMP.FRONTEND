import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../util/auth/AuthContext";
import { Link, useNavigate } from "react-router";
import { useSnackAlert } from "../components/SnackAlert";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { id, login } = useAuth();
  const navigate = useNavigate();
  const { SnackAlert, alert } = useSnackAlert();

  // If the user is already logged in, redirect them to the home page
  useEffect(() => {
    if (!!id) navigate("/");
  }, [id]);

  /** Handle form submission when user clicks login button */
  const handleLogin = async () => {
    setIsLoading(true);
    const success = await login({ email, password });
    if (!success) {
      alert.setError(
        "Failed to log in, ensure your username and password are valid"
      );
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <Paper
        sx={{
          borderRadius: "1rem",
        }}
      >
        <Stack
          component="form"
          spacing={2}
          sx={{
            px: 12,
            py: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Existing user login</Typography>
          <TextField
            label="Email"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "30ch" }}
          />
          <TextField
            label="Password"
            type="password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "30ch" }}
          />
          <Link to="/register">New user? Register here.</Link>
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={isLoading}
          >
            Log in
          </Button>
        </Stack>
      </Paper>
      <SnackAlert />
    </Box>
  );
}
