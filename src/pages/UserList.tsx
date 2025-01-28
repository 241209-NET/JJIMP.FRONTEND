import UsersInfo from "../components/UsersInfo";
import UsersIssues from "../components/UsersIssues";
import UsersProjects from "../components/UsersProjects";
import UsersComments from "../components/UsersComments";

function UserList() {
  return (
    <div>
      <div className="jumbotron text-center"></div>

      <br></br>
      <br></br>
      <div>
        <div
          style={{
            backgroundColor: "#F0F0F0",
            height: "500px",
            width: " 780px",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <h3
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "15px",
              fontFamily: "verdana",
              textAlign: "left",
            }}
          >
            User
          </h3>
          <UsersInfo />
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div
              style={{
                backgroundColor: "#F0F0F0",
                padding: "50px",
                margin: "auto",
              }}
            >
              <h3
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "15px",
                  fontFamily: "verdana",
                  textAlign: "left",
                  borderBlockStyle: "inset",
                }}
              >
                Recent Issues
              </h3>
              <UsersIssues />
            </div>
          </div>
          <div className="col-sm-4">
            <div
              style={{
                backgroundColor: "#F0F0F0",
                padding: "50px",
                margin: "auto",
              }}
            >
              <h3
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "15px",
                  fontFamily: "verdana",
                  textAlign: "left",
                  borderBlockStyle: "inset",
                }}
              >
                Recent Projects
              </h3>
              <UsersProjects />
            </div>
          </div>
          <div className="col-sm-4">
            <div
              style={{
                backgroundColor: "#F0F0F0",
                padding: "50px",
                margin: "auto",
              }}
            >
              <h3
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "15px",
                  fontFamily: "verdana",
                  textAlign: "left",
                  borderBlockStyle: "inset",
                }}
              >
                Recent Comments
              </h3>
              <UsersComments />
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default UserList;
