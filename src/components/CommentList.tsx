import { useState } from "react";
import { useIssueStore } from "../util/store/issueStore";
import { Box, TextField, Button, Typography } from "@mui/material";
import Comment from "./Comment";
import { useCurrentUserStore } from "../util/store/currentUserStore";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

interface CommentListProps {
  issueId: number;
}

const CommentList: React.FC<CommentListProps> = ({ issueId }) => {
  const { issues, updateIssue } = useIssueStore();
  const { currentUser } = useCurrentUserStore();
  const issue = issues.find((issue) => issue.id === issueId);
  const [commentText, setCommentText] = useState("");

  console.log(issue);
  if (!issue) return null;

  //Posting comment logic goes here
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const payload = {
      content: commentText,
      issueId: issueId,
      postedById: currentUser?.id,
    };

    try {
      const response = await axios.post(`${baseURL}/api/Comment`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const newComment = response.data;

      updateIssue(issueId, {
        comments: issue.comments
          ? [...issue.comments, newComment]
          : [newComment],
      });
      setCommentText("");
    } catch (error: any) {
      console.error("Error creating comment:", error, error?.response?.data);
      throw error;
    }
  };

  return (
    <Box className="">
      <TextField
        fullWidth
        label="Add a comment"
        multiline
        rows={2}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleAddComment}
      >
        Post Comment
      </Button>
      <Box
        className="mt-6 max-h-130 overflow-y-auto border p-2 rounded"
        sx={{
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          All Comments
        </Typography>
        {issue.comments &&
          issue.comments.map((comment: IssueComment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </Box>
    </Box>
  );
};

export default CommentList;
