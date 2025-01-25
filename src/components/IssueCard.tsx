import { Draggable } from "@hello-pangea/dnd";
import { useThemeStore } from "../util/store/themeStore";

interface IssueCardProps {
  issue: Issue;
  index: number;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, index }) => {
  const { mode } = useThemeStore();
  const bgColor = mode === "light" ? "bg-white" : "bg-gray-700";
  const textColor = mode === "light" ? "text-gray-900" : "text-gray-100";

  return (
    <Draggable draggableId={String(issue.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 mb-2 shadow rounded cursor-pointer transition-all hover:shadow-md ${bgColor} ${textColor}`}
        >
          <h4 className="font-semibold">{issue.title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Assignee:{" "}
            {issue.assignee.length > 0
              ? issue.assignee.join(", ")
              : "Unassigned"}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default IssueCard;
