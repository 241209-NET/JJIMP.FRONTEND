import { useState } from "react";
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

function Message() {
  const d = "2021-03-25";
  const dOne = "2025-01-25";
  const dTwo = "1990-03-25";

  let Users = [
    {
      id: 1,
      name: "Marlis",
      email: "marc@gooseribbon.com",
      last_activity: d,
      created_at: d,
      updated_at: dOne,
    },
    {
      id: 2,
      name: "Cuong",
      email: "sales@gooseribbon.com",
      last_activity: d,
      created_at: dTwo,
      updated_at: d,
    },
    {
      id: 3,
      name: "Jude",
      email: "contact@gooseribbon.com",
      last_activity: dOne,
      created_at: d,
      updated_at: dTwo,
    },
    {
      id: 4,
      name: "Issac",
      email: "newsletter@gooseribbon.com",
      last_activity: dTwo,
      created_at: dOne,
      updated_at: dTwo,
    },
    {
      id: 5,
      name: "Jason",
      email: "newsletter@gooseribbon.com",
      last_activity: dOne,
      created_at: dOne,
      updated_at: d,
    },
    {
      id: 6,
      name: "Puneet",
      email: "newsletter@gooseribbon.com",
      last_activity: d,
      created_at: dOne,
      updated_at: dTwo,
    },
  ];

  const [selectedUser, setSelectedUser] = useState(Users[0]);

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

          {Users.length === 0 ? (
            <Typography color="textSecondary">No Users Found!</Typography>
          ) : (
            <List disablePadding>
              {Users.map((user) => (
                <ListItemButton
                  key={user.id}
                  selected={selectedUser.id === user.id}
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
          )}
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

          {/* User Information */}
          <Typography variant="body1">
            <strong>Name:</strong> {selectedUser.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {selectedUser.email}
          </Typography>
          <Typography variant="body1">
            <strong>Last Activity:</strong> {selectedUser.last_activity}
          </Typography>
          <Typography variant="body1">
            <strong>Created At:</strong> {selectedUser.created_at}
          </Typography>
          <Typography variant="body1">
            <strong>Updated At:</strong> {selectedUser.updated_at}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Message;
