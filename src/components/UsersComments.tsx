import { useState } from "react";
import {
  Typography,
  Paper,
  List,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";

function UsersComments() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const Comments = [
    { id: 2, content: "This is my 2nd recent comment" },
    { id: 3, content: "This is my 3rd recent comment" },
    { id: 4, content: "This is my 4th recent comment" },
    { id: 5, content: "This is my 5th recent comment" },
    { id: 6, content: "This is my most recent comment" },
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
        Recent Comments
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {Comments.length === 0 ? (
        <Typography color="textSecondary">No Comments Found</Typography>
      ) : (
        <List disablePadding>
          {Comments.map((comment) => (
            <ListItemButton
              key={comment.id}
              selected={selectedIndex === comment.id}
              onClick={() => setSelectedIndex(comment.id)}
              sx={{
                borderRadius: 1,
                py: 1.5,
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Comment ID: {comment.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {comment.content}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default UsersComments;
