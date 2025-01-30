import { useState } from "react";
import axios from "axios";
import {
  IssueStatus,
  mapIssueStatus,
  mapStatusToNumber,
} from "../util/mockdata/mockData";
import { useThemeStore } from "../util/store/themeStore";
import { useCurrentUserStore } from "../util/store/currentUserStore";
import { useUserStore } from "../util/store/userStore";
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

const baseURL = import.meta.env.VITE_BASE_URL;

const IssueForm: React.FC<IssueFormProps> = ({
  onSubmit,
  onClose,
  projectId,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(IssueStatus.Inactive);
  const [assigneeId, setAssigneeId] = useState<number | "">("");
  const [deadline, setDeadline] = useState<string | "">("");

  const { currentUser } = useCurrentUserStore();
  const { users } = useUserStore();

  const { mode } = useThemeStore();

  // 🛠 Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1️⃣ Prepare payload
    const newIssue = {
      title: title.trim(),
      description: description.trim(),
      status: mapStatusToNumber(status), // parsing to number cause backend stores it as numbers
      deadline: deadline && deadline.length ? deadline : null,
      assigneeId: assigneeId ? Number(assigneeId) : null,
      createdById: currentUser?.id ?? null,
      projectId: Number(projectId),
    };

    console.log(newIssue);

    try {
      // 2️⃣ Send POST request to backend
      const response = await axios.post(`${baseURL}/api/Issue`, newIssue, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Issue created:", response.data);

      //decoding status again
      const createdIssue = {
        ...response.data,
        status: mapIssueStatus(response.data.status as unknown as number),
      };

      onSubmit(createdIssue);
    } catch (error) {
      console.error("Error creating issue:", error);
      alert("Failed to create issue.");
    }

    // 4️⃣ Close the form
    onClose();
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
            sx={{ mb: 1 }}
          >
            {Object.values(IssueStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>

          <Select
            fullWidth
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value as number)}
            displayEmpty
            margin="dense"
          >
            <MenuItem value="">Select Assignee</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            fullWidth
            label="Deadline"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
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
