import { useState } from "react";
import { IssueStatus } from "../util/mockdata/mockData";
import { useThemeStore } from "../util/store/themeStore";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";

interface IssueFormProps {
  onSubmit: (issue: Issue) => void;
  onClose: () => void;
  projectId: number;
}

const IssueForm: React.FC<IssueFormProps> = ({
  onSubmit,
  onClose,
  projectId,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(IssueStatus.Inactive);
  const [assignee, setAssignee] = useState("");
  const { mode } = useThemeStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newIssue = {
      id: Date.now(),
      title,
      description,
      status,
      assignee: assignee ? [Number(assignee)] : [],
      project_id: projectId,
      comments: [],
      created_by: 1, // placeholder until user login works
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    onSubmit(newIssue);
  };

  return (
    <Box className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Box
        className={`p-6 rounded shadow-lg w-96 ${
          mode === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <Typography variant="h6" className="mb-4">
          Create Issue
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <Select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value as IssueStatus)}
            displayEmpty
            margin="dense"
          >
            {Object.values(IssueStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Assignee (User ID)"
            type="number"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            margin="normal"
          />
          <Box className="flex justify-end gap-2 mt-4">
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default IssueForm;
