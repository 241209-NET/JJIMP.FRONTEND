import { useParams } from "react-router";
import IssueBoardComponent from "../components/IssueBoard";
import { useIssueStore } from "../util/store/issueStore";
import { useState } from "react";
import IssueForm from "../components/IssueForm.tsx";
import Button from "@mui/material/Button";

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
      <div className="flex justify-between items-center mb-4 mt-10">
        <h1 className="text-4xl font-bold">Issue Board</h1>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            minWidth: "auto",
            padding: "6px 12px",
            fontSize: "0.875rem",
            height: "fit-content",
          }}
          onClick={() => setIsFormOpen(true)}
        >
          + Add Issue
        </Button>
      </div>
      {isFormOpen && (
        <IssueForm
          onSubmit={handleAddIssue}
          onClose={() => setIsFormOpen(false)}
          projectId={Number(id)}
        />
      )}
      <IssueBoardComponent projectId={Number(id)} />
    </div>
  );
}

export default IssueBoard;
