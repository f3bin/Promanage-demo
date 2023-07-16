import React, { useState, useEffect } from "react";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

function UserLandingPage({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

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
    // Fetch tasks from the database
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  const userTasks = tasks.filter(
    (task) => task.assignedEmployee === user.username
  );

  const projectIdsWithTasks = userTasks.map((task) => parseInt(task.projectId));

  const projectsWithTasks = projects.filter((project) =>
    projectIdsWithTasks.includes(project.id)
  );

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <WelcomeMessage username={user.username} />


      <h1>Projects:</h1>
      {projectsWithTasks.map((project) => (
        <div key={project.id}>
          <h2>{project.projectName}</h2>
          <ul>
            {userTasks
              .filter((task) => parseInt(task.projectId) === project.id)
              .map((task) => (
                <li key={task.id}>{task.taskName}</li>
              ))}
          </ul>
        </div>
      ))}

      <LogoutButton onLogout={onLogout} />
    </div>
  );
}

export default UserLandingPage;
