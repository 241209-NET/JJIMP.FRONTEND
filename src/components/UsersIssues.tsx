import { useState } from "react";
import {
  Typography,
  Paper,
  List,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";

interface UsersIssuesProp {
  issues?: Issue[];
}

const UsersIssues: React.FC<UsersIssuesProp> = ({ issues }) => {
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
        Recent Issues
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {issues && issues.length > 0 ? (
        <List disablePadding>
          {issues.map((issue) => (
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
      ) : (
        <Typography color="textSecondary">No Issues Found</Typography>
      )}
    </Paper>
  );
};

export default UsersIssues;
