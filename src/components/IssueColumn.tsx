import { Droppable } from "@hello-pangea/dnd";
import IssueCard from "./IssueCard.tsx";
import { useThemeStore } from "../util/store/themeStore.ts";

interface IssueColumnProps {
  status: IssueStatus;
  issues: Issue[];
}

const IssueColumn = ({ status, issues = [] }: IssueColumnProps) => {
  const { mode } = useThemeStore();
  const bgColor = mode === "light" ? "bg-gray-200" : "bg-gray-800";

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={` h-140 p-4 rounded ${bgColor}`}
        >
          <h3 className="font-bold mb-2">{status}</h3>
          <div
            className="h-125 overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {issues.map((issue, index) => (
              <IssueCard key={issue.id} issue={issue} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default IssueColumn;
