// TeamLeadLandingPage.js
import React from "react";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Projects from "../../components/Projects/Projects";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import {useState,useEffect} from "react";

function TeamLeadLandingPage({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [userlist, setUserlist] = useState([]);
  useEffect(() => {
    // Fetch projects from the database
    fetch("http://localhost:8000/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error:", error));

  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        setUserlist(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <WelcomeMessage username={user.username} />
    
      {/* <Projects /> */}
      <h1>The Projects assigned to you are  :</h1>
      {projects.map((project) => {
        return project.assignedTeamLead === user.username ? (
          <div key={project.id}>
          <h1><i></i>{project.projectName}</h1></div>
        ) : null;
      })}
      <CreateTaskForm userlist={userlist} projects={projects} teamlead={user.username} />
      <LogoutButton onLogout={onLogout} />
    </div>
  );
}

export default TeamLeadLandingPage;
