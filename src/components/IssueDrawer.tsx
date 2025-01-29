import { useIssueStore } from "../util/store/issueStore";
import { useEffect, useState } from "react";
import { Drawer, Box, Typography, TextField, Button } from "@mui/material";
import CommentList from "./CommentList";
import axios from "axios";

interface IssueDrawerProps {
  issueId: number | null;
  onClose: () => void;
}

const baseURL = import.meta.env.VITE_BASE_URL;

const IssueDrawer: React.FC<IssueDrawerProps> = ({ issueId, onClose }) => {
  const { issues, updateIssue, deleteIssue } = useIssueStore();
  const issue = issues.find((issue) => issue.id === issueId);
  const [description, setDescription] = useState(issue?.description || "");
  const [updating, setUpdating] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // need this useeffect for smooth drawer opening
  useEffect(() => {
    if (issueId) {
      setOpenDrawer(true);
    }
  }, [issueId]);

  const handleClose = () => {
    setOpenDrawer(false);
    setTimeout(() => {
      onClose(); // Reset issueId after animation completes
    }, 300); // Adjust timing to match MUI's transition duration (default is 300ms)
  };

  if (!issue) return null;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${baseURL}/api/Issue/${issueId}`);

      deleteIssue(response.data.id);

      alert("Issue deleted successfully!");
    } catch (error) {
      console.error("Error deleting issue:", error);
      alert("Failed to delete issue.");
    }
  };

  //PUT request goes here
  const handleUpdateDescription = async () => {
    const updatedIssue = issue;

    const payload = updatedIssue && {
      id: issueId,
      description: description,
    };

    try {
      await axios.put(`${baseURL}/api/Issue`, payload, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("PUT request failed:", error);
    }

    updateIssue(issue.id, { description });
    setUpdating(false);
  };

  return (
    <Drawer anchor="right" open={openDrawer} onClose={handleClose}>
      <Box sx={{ width: 350, p: 2, display: "flex", flexDirection: "column" }}>
        <div className="flex justify-between">
          <Typography variant="h5" className="mb-2">
            {issue.title}
          </Typography>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
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
