import { Typography } from "@mui/material";
import { useState } from "react";

function UsersIssues() {
  let IssuesWorker = [];

  let Issues = [
    {
      id: 1,
      description: "This issue should not be listed",
    },
    {
      id: 2,
      description:
        "This is my jjjj jjjjjjsldf jlsj flsjfs ldjf;sdfds2nd recent issue",
    },
    {
      id: 3,
      description: "This is my 3dfksdf ;lsjdfsj adf; lsdkfrd recent issue",
    },
    {
      id: 4,
      description:
        "This is msd fsdj kf;lsjf;ls adjkf;l asdjfy 4th recent issue",
    },
    {
      id: 5,
      description: "This is my 5th recent issue",
    },
    {
      id: 6,
      description: "This is my most recent issue",
    },
  ];

  const [myIndex, setMyIndex] = useState(-1);

  for (let i = Issues.length - 5; i < Issues.length; i++) {
    if (Issues.length > 5) {
      IssuesWorker.push(Issues[i]);
    }
  }

  return (
    <div className="Users_List_Two">
      {Issues.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {IssuesWorker.map((issue) => (
          <li
            className={
              myIndex === issue.id ? "list-group-item active" : "list-group"
            }
            key={issue.id}
            onClick={() => {
              setMyIndex(issue.id);
            }}
          >
            <Typography
              variant="h5"
              color="textSecondary"
              component="h2"
              gutterBottom
            >
              Id:
            </Typography>
            {issue.id}
            <Typography
              variant="h5"
              color="textSecondary"
              component="h2"
              gutterBottom
            >
              Description:
            </Typography>
            {issue.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersIssues;
