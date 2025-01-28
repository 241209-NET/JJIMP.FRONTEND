import { useState } from "react";
import {
  Typography,
  Paper,
  List,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";

function UsersIssues() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const Issues = [
    { id: 2, description: "This is my 2nd recent issue" },
    { id: 3, description: "This is my 3rd recent issue" },
    { id: 4, description: "This is my 4th recent issue" },
    { id: 5, description: "This is my 5th recent issue" },
    { id: 6, description: "This is my most recent issue" },
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
        Recent Issues
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {Issues.length === 0 ? (
        <Typography color="textSecondary">No Issues Found</Typography>
      ) : (
        <List disablePadding>
          {Issues.map((issue) => (
            <ListItemButton
              key={issue.id}
              selected={selectedIndex === issue.id}
              onClick={() => setSelectedIndex(issue.id)}
              sx={{
                borderRadius: 1,
                py: 1.5,
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Issue ID: {issue.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {issue.description}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default UsersIssues;
