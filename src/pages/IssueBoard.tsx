import { useParams } from "react-router";

function IssueBoard() {
  const { id } = useParams();
  return <div>IssueBoard - {id}</div>;
}

export default IssueBoard;
