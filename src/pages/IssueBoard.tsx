import { useParams } from "react-router";
import IssueBoardComponent from "../components/IssueBoard";
import { useIssueStore } from "../util/store/issueStore";
import { IssueStatus } from "../util/mockdata/mockData.ts";

function IssueBoard() {
  const { id } = useParams();
  const { addIssue } = useIssueStore();

  const handleAddIssue = () => {
    const newIssue = {
      id: Date.now(),
      title: "New Issue",
      description: "No description provided.", // ✅ Added required field
      status: IssueStatus.Inactive, // ✅ Ensure correct enum type
      assignee: [],
      project_id: Number(id),
      comments: [],
      created_by: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addIssue(newIssue);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 mt-10">Issue Board {id}</h1>
      <button
        onClick={handleAddIssue}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        + Add Issue
      </button>
      <IssueBoardComponent />
    </div>
  );
}

export default IssueBoard;
