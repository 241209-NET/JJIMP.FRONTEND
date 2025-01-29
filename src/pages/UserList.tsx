import { useState } from "react";
import { Button, Typography, Drawer, Box, Paper, Stack } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import CommentIcon from "@mui/icons-material/Comment";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import UsersInfo from "../components/UsersInfo";
import UsersComments from "../components/UsersComments";
import UsersIssues from "../components/UsersIssues";
import UsersProjects from "../components/UsersProjects";
import { useUserStore } from "../util/store/userStore";

function UserList() {
  // Drawer states
  const [openProjects, setOpenProjects] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [openIssues, setOpenIssues] = useState(false);
  const { users } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: 4 }}>
      {/* User Info Section */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        User Information
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          my: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          maxWidth: 500,
          mx: "auto",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <UsersInfo
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Paper>

      {/* Button Group to Open Drawers */}
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 3 }}>
        <Button
          onClick={() => setOpenProjects(true)}
          variant="contained"
          color="primary"
          startIcon={<AccountTreeIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Projects
        </Button>
        <Button
          onClick={() => setOpenComments(true)}
          variant="contained"
          color="secondary"
          startIcon={<CommentIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Comments
        </Button>
        <Button
          onClick={() => setOpenIssues(true)}
          variant="contained"
          color="error"
          startIcon={<BugReportIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Issues
        </Button>
      </Stack>

      {/* Drawer for Projects */}
      <Drawer
        anchor="right"
        open={openProjects}
        onClose={() => setOpenProjects(false)}
      >
        <Box sx={{ width: 350, p: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Assigned Projects
          </Typography>
          <UsersProjects />
        </Box>
      </Drawer>

      {/* Drawer for Comments */}
      <Drawer
        anchor="right"
        open={openComments}
        onClose={() => setOpenComments(false)}
      >
        <Box sx={{ width: 350, p: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            User's Recent Comments
          </Typography>
          <UsersComments />
        </Box>
      </Drawer>

      {/* Drawer for Issues */}
      <Drawer
        anchor="right"
        open={openIssues}
        onClose={() => setOpenIssues(false)}
      >
        <Box sx={{ width: 350, p: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Recent Issues
          </Typography>
          <UsersIssues />
        </Box>
      </Drawer>
    </Box>
  );
}

export default UserList;
