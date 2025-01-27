import { useIssueStore } from "../util/store/issueStore";
import { useState } from "react";
import { Drawer, Box, Typography, TextField, Button } from "@mui/material";
import CommentList from "./CommentList";

interface IssueDrawerProps {
  issueId: number | null;
  onClose: () => void;
}

const IssueDrawer: React.FC<IssueDrawerProps> = ({ issueId, onClose }) => {
  const { issues, updateIssue } = useIssueStore();
  const issue = issues.find((issue) => issue.id === issueId);
  const [description, setDescription] = useState(issue?.description || "");

  if (!issue) return null;

  const handleUpdateDescription = () => {
    updateIssue(issue.id, { description });
  };

  return (
    <Drawer anchor="right" open={Boolean(issueId)} onClose={onClose}>
      <Box className="w-96 p-4">
        <Typography variant="h6" className="mb-2">
          {issue.title}
        </Typography>
        <Typography variant="body2" className="text-gray-500 mb-4">
          Status: {issue.status}
        </Typography>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateDescription}
        >
          Update Description
        </Button>
        <Box className="mt-4">
          <Typography variant="h6" className="mb-2">
            Comments
          </Typography>
          <CommentList issueId={issue.id} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default IssueDrawer;
