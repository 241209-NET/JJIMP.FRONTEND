import { useState } from "react";
import {
  Typography,
  Paper,
  List,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";

interface UserProjectProps {
  projects?: Project[];
}

const UsersProjects: React.FC<UserProjectProps> = ({ projects }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

      {projects && projects?.length > 0 ? (
        <List disablePadding>
          {projects?.map((project) => (
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
                  Project: {project.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Typography color="textSecondary">No Projects Found</Typography>
      )}
    </Paper>
  );
};

export default UsersProjects;
