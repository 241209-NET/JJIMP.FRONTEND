import { useState } from "react";
import { useIssueStore } from "../util/store/issueStore";
import { Box, TextField, Button, Typography } from "@mui/material";
import Comment from "./Comment";

interface CommentListProps {
  issueId: number;
}

const CommentList: React.FC<CommentListProps> = ({ issueId }) => {
  const { issues, updateIssue } = useIssueStore();
  const issue = issues.find((issue) => issue.id === issueId);
  const [commentText, setCommentText] = useState("");

  if (!issue) return null;

  //Posting comment logic goes here
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment: IssueComment = {
      id: Date.now(),
      content: commentText,
      issue_id: issueId,
      posted_by: 1, // Placeholder until authentication is added
      created_at: new Date().toISOString(),
      updated_at: new Date().toDateString(),
    };
    updateIssue(issueId, {
      commentObjs: issue.commentObjs
        ? [...issue.commentObjs, newComment]
        : [newComment],
    });
    setCommentText("");
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
        {issue.commentObjs &&
          issue.commentObjs.map((comment: IssueComment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </Box>
    </Box>
  );
};

export default CommentList;
