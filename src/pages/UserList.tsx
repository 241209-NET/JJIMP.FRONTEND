import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import CommentIcon from "@mui/icons-material/Comment";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UsersInfo from "../components/UsersInfo";
import Drawer from "@mui/material/Drawer";
import UsersComments from "../components/UsersComments";
import UsersIssues from "../components/UsersIssues";

function UserList() {
  return (
    <Container>
      <Drawer
        sx={{
          width: 240,
        }}
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: { width: 210, backgroundColor: "#B39DDB" },
        }}
      >
        <div style={{ padding: 15, margin: 15 }}>
          <Typography
            variant="h5"
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            Recent Comments
          </Typography>
          <UsersComments />
        </div>
      </Drawer>
      <Drawer
        sx={{
          width: 240,
        }}
        variant="permanent"
        anchor="right"
        PaperProps={{
          sx: { width: 210, backgroundColor: "#B39DDB" },
        }}
      >
        <div style={{ padding: 15, margin: 15 }}>
          <Typography
            variant="h5"
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            Recent Issues
          </Typography>
          <UsersIssues />
        </div>
      </Drawer>
      <Typography
        variant="h3"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        User's Information
        <Button
          onClick={() =>
            console.log(
              "you clicked me/but need to open up drawer with user info"
            )
          }
          type="submit"
          color="success"
          variant="outlined"
          startIcon={<ManageAccountsIcon />}
        >
          Details
        </Button>
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ border: "inset", color: "#B39DDB", padding: 25 }}>
          <UsersInfo />
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <ButtonGroup color="success" variant="contained">
        <Button startIcon={<AccountTreeIcon />}>Projects</Button>
        <Button startIcon={<CommentIcon />}>Comments</Button>
        <Button startIcon={<BugReportIcon />}>Issues</Button>
      </ButtonGroup>
    </Container>
  );
}

export default UserList;
