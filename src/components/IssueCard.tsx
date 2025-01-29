import { Draggable } from "@hello-pangea/dnd";
import { useThemeStore } from "../util/store/themeStore";
import { useState } from "react";
import IssueDrawer from "./IssueDrawer";

interface IssueCardProps {
  issue: Issue;
  index: number;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, index }) => {
  const { mode } = useThemeStore();
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);
  const bgColor = mode === "light" ? "bg-white" : "bg-gray-700";
  const textColor = mode === "light" ? "text-gray-900" : "text-gray-100";

  return (
    <>
      <Draggable draggableId={String(issue.id)} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-3 mb-2 shadow rounded cursor-pointer transition-all hover:shadow-md ${bgColor} ${textColor}`}
            onClick={() => setSelectedIssue(issue.id)}
          >
            <h4 className="font-semibold">{issue.title}</h4>
            <div className="flex-wrap lg:flex justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong> Assignee:</strong>{" "}
                {issue.assignee?.name ?? "Unassigned"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong> Deadline:</strong>{" "}
                {issue.deadline
                  ? new Date(issue.deadline).toLocaleDateString()
                  : "Unassigned"}
              </p>
            </div>
          </div>
        )}
      </Draggable>
      {selectedIssue && (
        <IssueDrawer
          issueId={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </>
  );
};

export default IssueCard;
