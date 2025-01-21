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

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { id, register } = useAuth();
  const navigate = useNavigate();
  const { SnackAlert, alert } = useSnackAlert();

  // If the user is already logged in, redirect them to the home page
  useEffect(() => {
    if (!!id) navigate("/");
  }, [id]);

  /** Handle form submission when user clicks register button */
  const handleRegister = async () => {
    setIsLoading(true);
    const success = await register({ name, email, password });
    if (!success) alert.setError("Failed to register");
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
          <Typography variant="h5">New user registration</Typography>
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
          <Link to="/login">Existing user? Log in here.</Link>
          <Button
            variant="contained"
            onClick={handleRegister}
            disabled={isLoading}
          >
            Register
          </Button>
        </Stack>
      </Paper>
      <SnackAlert />
    </Box>
  );
}
