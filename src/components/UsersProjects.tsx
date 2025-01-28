import { useState } from "react";
import {
  Typography,
  Paper,
  List,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";

function UsersProjects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const Projects = [
    { id: 2, description: "This is my 2nd recent project" },
    { id: 3, description: "This is my 3rd recent project" },
    { id: 4, description: "This is my 4th recent project" },
    { id: 5, description: "This is my 5th recent project" },
    { id: 6, description: "This is my most recent project" },
    { id: 7, description: "This is my 7th recent project" },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        width: "100%",
        minWidth: 300,
        maxWidth: 400,
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Projects
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {Projects.length === 0 ? (
        <Typography color="textSecondary">No Projects Found</Typography>
      ) : (
        <List disablePadding>
          {Projects.map((project) => (
            <ListItemButton
              key={project.id}
              selected={selectedIndex === project.id}
              onClick={() => setSelectedIndex(project.id)}
              sx={{
                borderRadius: 1,
                py: 1.5,
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Project ID: {project.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default UsersProjects;
