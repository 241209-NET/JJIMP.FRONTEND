import { Box, Typography, Button } from "@mui/material";
import { useIssueStore } from "../util/store/issueStore";

interface CommentProps {
  comment: IssueComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { issues, updateIssue } = useIssueStore();
  const issue = issues.find((issue) => issue.id === comment.issue_id);

  if (!issue) return null;

  const handleDeleteComment = () => {
    const updatedComments = issue.comments.filter((c) => c !== comment.id);
    updateIssue(issue.id, { comments: updatedComments });
  };

  return (
    <Box className="border p-2 mb-2 rounded shadow-sm">
      <Typography variant="body1">{comment.content}</Typography>
      <Typography variant="caption" className="text-gray-500">
        Posted by User {comment.posted_by} on{" "}
        {comment.created_at
          ? new Date(String(comment.created_at)).toLocaleString()
          : "Unknown"}
      </Typography>
      <Button
        variant="text"
        color="secondary"
        size="small"
        onClick={handleDeleteComment}
        className="mt-2"
      >
        Delete
      </Button>
    </Box>
  );
};

export default Comment;
