import { IssueStatus } from "../util/mockdata/mockData.ts";
import { useIssueStore } from "../util/store/issueStore";
import IssueColumn from "./IssueColumn.tsx";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

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
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    updateIssue(parseInt(draggableId), {
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
