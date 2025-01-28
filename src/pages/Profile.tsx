import { useCurrentUserStore } from "../util/store/currentUserStore";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router";

function Profile() {
  const { currentUser, clearCurrentUser } = useCurrentUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  if (!currentUser) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5">Please log in to view your profile</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 3,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: "2.5rem",
              bgcolor: "primary.main",
              mb: 2,
            }}
          >
            {currentUser.name.substring(0, 2).toUpperCase()}
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentUser.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {currentUser.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                User ID
              </Typography>
              <Typography variant="body1">{currentUser.id}</Typography>
            </Box>
          </CardContent>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ px: 4 }}
          >
            Logout
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Profile;
