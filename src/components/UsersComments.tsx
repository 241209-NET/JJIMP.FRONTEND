import { useState } from "react";
import {
  Typography,
  Paper,
  List,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";

interface UsersCommentsProp {
  comments?: IssueComment[];
}

const UsersComments: React.FC<UsersCommentsProp> = ({ comments }) => {
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
        Recent Comments
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {comments && comments.length > 0 ? (
        <List disablePadding>
          {comments.map((comment) => (
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
      ) : (
        <Typography color="textSecondary">No Comments Found</Typography>
      )}
    </Paper>
  );
};

export default UsersComments;
