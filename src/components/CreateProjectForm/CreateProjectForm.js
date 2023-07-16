import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../../store/appSlice";
import './CreateProjectForm.scss'

function CreateProjectForm() {
  const dispatch = useDispatch();
  const userlist = useSelector((state) => state.app.userlist);
  const [projectName, setProjectName] = useState("");
  const [assignedTeamLead, setAssignedTeamLead] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setUserList(data));
      })
      .catch((error) => console.error("Error:", error));
  }, [dispatch]);

  const handleProjectCreate = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        assignedTeamLead,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Project created successfully:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="create-project-form">
      <h1>Create Project</h1>
      <form onSubmit={handleProjectCreate}>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          required
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
       
       <select value={assignedTeamLead} onChange={(e)=>setAssignedTeamLead(e.target.value)}>
       <option>select</option>
          {userlist.map((user) =>
         
            user.role === 'teamlead' ? (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ) : null
          )}
        </select> 
        <button type="submit" className="submit-button">
          Create Project
        </button>
      </form>
    </div>
  );
  
}

export default CreateProjectForm;
