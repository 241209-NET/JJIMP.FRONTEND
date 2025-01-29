import axios from "axios";
import { IssueStatus, mapStatusToNumber } from "../util/mockdata/mockData.ts";
import { useIssueStore } from "../util/store/issueStore";
import IssueColumn from "./IssueColumn.tsx";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

const baseURL = import.meta.env.VITE_BASE_URL;

interface IssueBoardProps {
  projectId: number;
}

const IssueBoard: React.FC<IssueBoardProps> = ({ projectId }) => {
  const { issues, updateIssue } = useIssueStore();

  console.log(issues);
  console.log(projectId);
  const filteredIssues = issues.filter(
    (issue) => issue.projectId === projectId
  );

  //PUT request goes here for status
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const issueID = parseInt(draggableId);
    console.log(issueID);
    const updatedIssue = issues.find((iss) => iss.id === issueID);

    console.log(updatedIssue);
    const numericStatus =
      updatedIssue && mapStatusToNumber(destination.droppableId as IssueStatus);

    const payload = updatedIssue && {
      id: updatedIssue.id,
      title: updatedIssue.title,
      description: updatedIssue.description,
      status: numericStatus,
      deadline: updatedIssue.deadline,
      assigneeId: updatedIssue.assignee.id,
    };

    console.log(payload);

    try {
      await axios.put(`${baseURL}/api/Issue`, payload, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("PUT request failed:", error);
    }

    updateIssue(issueID, {
      status: destination.droppableId as IssueStatus,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid mt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {Object.values(IssueStatus).map((status) => (
          <IssueColumn
            key={status}
            status={status}
            issues={filteredIssues.filter((issue) => issue.status === status)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default IssueBoard;
