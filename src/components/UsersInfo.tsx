import { Typography } from "@mui/material";
import { useState } from "react";

function Message() {
  const d = "2021-03-25";
  const dOne = "2025-01-25";
  const dTwo = "1990-03-25";

  let Users = [
    {
      id: 1,
      name: "Marlis",
      email: "marc@gooseribbon.com",
      last_activity: d,
      created_at: d,
      updated_at: dOne,
    },
    {
      id: 2,
      name: "Cuong",
      email: "sales@gooseribbon.com",
      last_activity: d,
      created_at: dTwo,
      updated_at: d,
    },
    {
      id: 3,
      name: "Jude",
      email: "contact@gooseribbon.com",
      last_activity: dOne,
      created_at: d,
      updated_at: dTwo,
    },
    {
      id: 4,
      name: "Issac",
      email: "newsletter@gooseribbon.com",
      last_activity: dTwo,
      created_at: dOne,
      updated_at: dTwo,
    },
    {
      id: 5,
      name: "Jason",
      email: "newsletter@gooseribbon.com",
      last_activity: dOne,
      created_at: dOne,
      updated_at: d,
    },
    {
      id: 6,
      name: "Puneet",
      email: "newsletter@gooseribbon.com",
      last_activity: d,
      created_at: dOne,
      updated_at: dTwo,
    },
  ];

  //Users = [];
  const [myIndex, setMyIndex] = useState(-1);
  const [selectedUserEmail, setSelectedUserEmail] = useState(" ");
  const [selectedUserName, setSelectedUserName] = useState(" ");
  const [selectedUserLastActivity, setSelectedUserLastActivity] = useState(" ");
  const [selectedUserCreatedAt, setSelectedUserCreatedAt] = useState(" ");
  const [selectedUserUpdatedAt, setSelectedUserUpdatedAt] = useState(" ");
  return (
    <>
      <div>
        <div>
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              color="textSecondary"
              component="h2"
              gutterBottom
            >
              All Users
            </Typography>
            <div style={{ textAlign: "center" }}>
              {Users.length === 0 && <p>No Users Found!</p>}
              <ul>
                {Users.map((user) => (
                  <li
                    className={
                      myIndex === user.id
                        ? " list-group-item active"
                        : "list-group"
                    }
                    key={user.id}
                    onClick={() => {
                      setMyIndex(user.id);
                      setSelectedUserEmail(user.email);
                      setSelectedUserName(user.name);
                      setSelectedUserCreatedAt(user.created_at);
                      setSelectedUserLastActivity(user.last_activity);
                      setSelectedUserUpdatedAt(user.updated_at);
                    }}
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              color="textSecondary"
              component="h2"
              gutterBottom
            >
              User's Profile
            </Typography>
            <div>
              <div>
                <img
                  src="src/assets/images/9lazvdzy.bmp"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "5px",
                    width: "150px",
                    float: "left",
                  }}
                />
                <img
                  src="src/assets/images/ueb7xgxz.bmp"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "5px",
                    width: "150px",
                  }}
                />
              </div>

              <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
              >
                Name: {selectedUserName}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
              >
                Email: {selectedUserEmail}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
              >
                Last Activity Date: {selectedUserLastActivity}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
              >
                Created Date: {selectedUserCreatedAt}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
              >
                Updated Date: {selectedUserUpdatedAt}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
