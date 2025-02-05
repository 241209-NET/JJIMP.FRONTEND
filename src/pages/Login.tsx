import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../util/auth/AuthContext";
import { Link, useNavigate } from "react-router";
import { useSnackAlert } from "../components/SnackAlert";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { SnackAlert } = useSnackAlert();

  /** Handle form submission when user clicks login button */
  const handleLogin = async () => {
    setIsLoading(true);
    await login({ name, email, password });

    navigate("/");

    //refreshing app
    window.location.reload();

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
            label="Name"
            disabled={isLoading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "30ch" }}
          />
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
