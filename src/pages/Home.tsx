import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Code,
  DragIndicator,
  Comment,
  RocketLaunch,
  Login,
} from "@mui/icons-material";

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: <DragIndicator fontSize="large" color="primary" />,
      title: "Drag & Drop Kanban",
      description:
        "Visualize workflow with our intuitive drag-and-drop interface",
    },
    {
      icon: <Code fontSize="large" color="secondary" />,
      title: "Project Management",
      description: "Create and organize projects with a click of a button",
    },
    {
      icon: <Comment fontSize="large" color="success" />,
      title: "Real-time Collaboration",
      description: "Comment and track changes to individual tickets",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: 15,
          textAlign: "center",
          background: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "common.white",
          borderRadius: 1,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Agile Project Management Simplified
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Organize, track, and deliver projects faster with our Jira-like
            platform
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<RocketLaunch />}
              onClick={handleSignUp}
              sx={{ px: 4, py: 1.5 }}
            >
              Sign up Today
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              startIcon={<Login />}
              onClick={handleLogIn}
              sx={{ px: 4, py: 1.5 }}
            >
              Log in
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Powerful Features for Agile Teams
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mt: 4,
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", sm: "48%", lg: "30%" },
                minWidth: 300,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          bgcolor: "secondary.main",
          color: "common.white",
          borderRadius: 1,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Ready to Transform Your Workflow?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Join the BILLIONS of teams already shipping faster with our platform
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<RocketLaunch />}
            onClick={handleSignUp}
            sx={{ px: 6, py: 2, fontSize: "1.1rem" }}
          >
            Sign up Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
