import {
  Box,
  Paper,
  Typography,
  Stack,
  List,
  ListItemButton,
  Divider,
  Avatar,
} from "@mui/material";

interface MessageProps {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

const Message: React.FC<MessageProps> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  if (!selectedUser) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>No user selected yet or loading...</Typography>
      </Box>
    );
  }

  // 2) If your user list might also be empty, handle that:
  if (!users || users.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>No users found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      {/* Title Section */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        User Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          width: "100%",
          maxWidth: 900,
        }}
      >
        {/* User List Section */}
        <Paper
          elevation={3}
          sx={{ flex: 1, p: 3, borderRadius: 2, minWidth: 250 }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            All Users
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List disablePadding>
            {users.map((user) => (
              <ListItemButton
                key={user.id}
                // Use optional chaining so it doesn't crash if selectedUser is undefined
                selected={selectedUser?.id === user.id}
                onClick={() => setSelectedUser(user)}
                sx={{
                  borderRadius: 1,
                  py: 1,
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                  "&.Mui-selected": {
                    backgroundColor: "primary.dark",
                    color: "inherit",
                    "&:hover": { backgroundColor: "secondary.dark" },
                  },
                }}
              >
                <Typography variant="body1">{user.name}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Paper>

        {/* User Profile Section */}
        <Paper
          elevation={3}
          sx={{ flex: 2, p: 3, borderRadius: 2, minWidth: 300 }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            User Profile
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Profile Images */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "center", mb: 3 }}
          >
            <Avatar
              src="src/assets/images/9lazvdzy.bmp"
              sx={{ width: 80, height: 80, border: "2px solid #ddd" }}
            />
            <Avatar
              src="src/assets/images/ueb7xgxz.bmp"
              sx={{ width: 80, height: 80, border: "2px solid #ddd" }}
            />
          </Stack>

          {/* User Information (safe because we returned early if !selectedUser) */}
          <Typography variant="body1">
            <strong>Name:</strong> {selectedUser.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {selectedUser.email}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;
