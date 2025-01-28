import { useState } from "react";

function UsersProjects() {
  const [myIndex, setMyIndex] = useState(-1);

  let ProjectsWorker = [];

  let Projects = [
    {
      id: 1,
      description: "This project should not be listed",
    },
    {
      id: 2,
      description: "This is my 2nd recent project",
    },
    {
      id: 3,
      description: "This is my 3rd recent project",
    },
    {
      id: 4,
      description: "This is my 4th recent project",
    },
    {
      id: 5,
      description: "This is my 5th recent project",
    },
    {
      id: 6,
      description: "This is my most recent project",
    },
    {
      id: 7,
      description: "This is my most 7th recent project",
    },
  ];

  for (let i = Projects.length - 5; i < Projects.length; i++) {
    if (Projects.length > 5) {
      ProjectsWorker.push(Projects[i]);
    }
  }

  return (
    <div className="Users_List_Two">
      {Projects.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {ProjectsWorker.map((project) => (
          <li
            className={
              myIndex === project.id ? "list-group-item active" : "list-group"
            }
            key={project.id}
            onClick={() => {
              setMyIndex(project.id);
            }}
          >
            <div className="text_descriptions">Id:</div>
            {project.id}
            <div className="text_descriptions">Description:</div>
            {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersProjects;
