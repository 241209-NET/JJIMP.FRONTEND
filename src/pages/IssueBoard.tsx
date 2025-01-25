import { useParams } from "react-router";
import IssueBoardComponent from "../components/IssueBoard";
import { useIssueStore } from "../util/store/issueStore";
import { useState } from "react";
import IssueForm from "../components/IssueForm.tsx";

function IssueBoard() {
  const { id } = useParams();
  const { addIssue } = useIssueStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddIssue = (newIssue: Issue) => {
    addIssue(newIssue);
    setIsFormOpen(false);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 mt-10">Issue Board {id}</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        + Add Issue
      </button>
      {isFormOpen && (
        <IssueForm
          onSubmit={handleAddIssue}
          onClose={() => setIsFormOpen(false)}
          projectId={Number(id)}
        />
      )}
      <IssueBoardComponent />
    </div>
  );
}

export default IssueBoard;
