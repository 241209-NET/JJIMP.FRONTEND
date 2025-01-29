import { Box, Typography, Button } from "@mui/material";
import { useIssueStore } from "../util/store/issueStore";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
interface CommentProps {
  comment: IssueComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { issues, updateIssue } = useIssueStore();
  const issue = issues.find((issue) => issue.id === comment.issueId);

  if (!issue || !comment.postedBy) {
    return null;
  }

  //Delete comment logic goes here
  const handleDeleteComment = async () => {
    if (!issue.comments) return;

    //1. payload
    const updatedComments = issue.comments.filter((c) => c.id !== comment.id);
    //2. Axios call

    console.log(comment.id);
    try {
      const response = await axios.delete(
        `${baseURL}/api/Comment/${comment.id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      //3. Update state
      if (response) {
        updateIssue(issue.id, {
          comments: [...updatedComments],
        });
      }
    } catch (error: any) {
      console.error("Error deleting comment:", error, error?.response?.data);
      throw error;
    }
  };

  return (
    <Box className="border p-2 mb-2 rounded shadow-sm">
      <Typography variant="body1">{comment.content}</Typography>
      <Typography variant="caption" className="text-gray-500">
        Posted by User {comment.postedBy.name} on{" "}
        {comment.createdAt
          ? new Date(String(comment.createdAt)).toLocaleString()
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
