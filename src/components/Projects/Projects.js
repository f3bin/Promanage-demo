import React from "react";
import { useSelector } from "react-redux";
import './Projects.scss'

function Projects() {
  const user = useSelector((state) => state.app.user);
  const projects = useSelector((state) => state.app.projects);

  const handleTaskCreate = (projectID, taskName, assignedEmployee) => {
    fetch(`http://localhost:8000/projects/${projectID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName,
        assignedEmployee,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task added successfully:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project.projectID} className="project-item">
          <h2>{project.projectName}</h2>
          <ul>
            {project.tasks &&
              project.tasks.map((task) => (
                <li key={task.taskID}>{task.taskName}</li>
              ))}
          </ul>
          {user.role === "teamlead" && (
            <form
              onSubmit={handleTaskCreate}
              className="task-form"
            >
              <input
                type="text"
                name="taskName"
                placeholder="Task Name"
                required
                className="task-input"
              />
              <input
                type="text"
                name="assignedEmployee"
                placeholder="Assigned Employee"
                required
                className="task-input"
              />
              <button type="submit" className="task-button">
                Add Task
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}

 export default Projects;
