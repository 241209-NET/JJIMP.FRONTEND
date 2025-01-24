import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../util/auth/AuthContext";
import { useNavigate } from "react-router";
import { useThemeStore } from "../util/store/themeStore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Navbar() {
  const { id, logout } = useAuth();
  const navigate = useNavigate();
  const pages = ["Home", "Project", "Users"];
  const settings = id ? ["Profile", "Logout"] : ["Login"];
  const { mode, toggleTheme } = useThemeStore();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateToHome = () => navigate("/");
  const navigateToLogin = () => navigate("/login");
  const navigateToProject = () => navigate("/project");
  const navigateToUsers = () => navigate("/userlist");

  return (
    <AppBar position="fixed" sx={{}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={navigateToHome}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            JJIMP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    if (page === "Home") {
                      navigateToHome();
                    } else if (page === "Project") {
                      navigateToProject();
                    } else {
                      navigateToUsers();
                    }
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={navigateToHome}
          >
            JJIMP Ticketing
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() =>
                  page === "Home"
                    ? navigateToHome()
                    : page === "Project"
                    ? navigateToProject()
                    : navigateToUsers()
                }
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <IconButton onClick={toggleTheme} sx={{ mx: 2 }} color="inherit">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: 1,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                transformOrigin: { vertical: "bottom", horizontal: "right" },
              }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Logout"
                      ? logout
                      : setting === "Login"
                      ? navigateToLogin
                      : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
