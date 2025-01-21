import { Button, Box, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../util/auth/AuthContext";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { id, logout } = useAuth();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ px: 5, py: 2, bgcolor: "#aebdf550" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            onClick={navigateToHome}
            sx={{ cursor: "pointer" }}
          >
            JJIMP Ticketing System
          </Typography>
          {id ? (
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button variant="contained" onClick={navigateToLogin}>
              Login
            </Button>
          )}
        </Stack>
      </AppBar>
    </Box>
  );
}
