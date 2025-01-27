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
  const [updating, setUpdating] = useState(false);

  if (!issue) return null;

  //PUT request goes here
  const handleUpdateDescription = () => {
    updateIssue(issue.id, { description });
    setUpdating(false);
  };

  return (
    <Drawer anchor="right" open={Boolean(issueId)} onClose={onClose}>
      <Box className="w-96 p-4 flex-col space-y-2">
        <Typography variant="h5" className="mb-2">
          {issue.title}
        </Typography>
        <Typography variant="body2" className="text-gray-400" sx={{ mt: 1 }}>
          Status: {issue.status}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Description: {issue.description}
        </Typography>
        {!updating && (
          <div>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setUpdating(true)}
            >
              Update Description
            </Button>
          </div>
        )}
        {updating && (
          <div>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleUpdateDescription}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2, ml: 1 }}
              onClick={() => setUpdating(false)}
            >
              Cancel
            </Button>
          </div>
        )}
        <Box className="mt-4">
          <Typography variant="h6">Comments</Typography>
          <CommentList issueId={issue.id} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default IssueDrawer;
