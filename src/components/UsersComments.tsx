import { useState } from "react";

function UsersComments() {
  const [myIndex, setMyIndex] = useState(-1);

  let CommentsWorker = [];

  let Comments = [
    {
      id: 1,
      content: "This comment should not be listed",
    },
    {
      id: 2,
      content: "This is my 2nd recent comment",
    },
    {
      id: 3,
      content: "This is my 3rd recent comment",
    },
    {
      id: 4,
      content: "This is my 4th recent comment",
    },
    {
      id: 5,
      content: "This is my 5th recent comment",
    },
    {
      id: 6,
      content: "This is my most recent comment",
    },
  ];

  for (let i = Comments.length - 5; i < Comments.length; i++) {
    if (Comments.length > 5) {
      CommentsWorker.push(Comments[i]);
    }
  }

  return (
    <>
      <div className="Users_List_Two">
        {Comments.length === 0 && <p>No items found</p>}
        <ul className="list-group">
          {CommentsWorker.map((comment) => (
            <li
              className={
                myIndex === comment.id ? "list-group-item active" : "list-group"
              }
              key={comment.id}
              onClick={() => {
                setMyIndex(comment.id);
              }}
            >
              <div className="text_descriptions">Id:</div>
              {comment.id}
              <div className="text_descriptions">Description:</div>
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UsersComments;
