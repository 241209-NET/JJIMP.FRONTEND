import { useState } from "react";
import { IssueStatus } from "../util/mockdata/mockData";
import { useThemeStore } from "../util/store/themeStore";

interface IssueFormProps {
  onSubmit: (issue: {
    id: number;
    title: string;
    description: string;
    status: IssueStatus;
    assignee: number[];
    project_id: number;
    comments: any[];
    created_by: number;
    created_at: string;
    updated_at: string;
  }) => void;
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

  const bgColor =
    mode === "light" ? "bg-white text-black" : "bg-gray-800 text-white";
  const inputBg =
    mode === "light" ? "bg-gray-100 text-black" : "bg-gray-700 text-white";
  const borderColor = mode === "light" ? "border-gray-300" : "border-gray-600";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className={`p-6 rounded shadow-lg w-96 ${bgColor}`}>
        <h2 className="text-xl font-bold mb-4">Create Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 border rounded ${inputBg} ${borderColor}`}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 border rounded ${inputBg} ${borderColor}`}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as IssueStatus)}
              className={`w-full p-2 border rounded ${inputBg} ${borderColor}`}
            >
              {Object.values(IssueStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block font-medium">Assignee (User ID)</label>
            <input
              type="number"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className={`w-full p-2 border rounded ${inputBg} ${borderColor}`}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
