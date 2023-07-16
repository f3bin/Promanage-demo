import React, { useState } from "react";
import './CreateTaskForm.scss'

function CreateTaskForm({ userlist, projects,teamlead }) {
  const [taskName, setTaskName] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const handleTaskCreate = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName,
        assignedEmployee,
        projectId: selectedProject,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task created successfully:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="create-task-form">
      <h1>Create Task</h1>
      <form onSubmit={handleTaskCreate}>
        <input
          type="text"
          name="taskName"
          placeholder="Task Name"
          required
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select
          value={assignedEmployee}
          onChange={(e) => setAssignedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {userlist.map((user) =>
            user.role === "employee" ? (
              <option key={user.id} value={user.username}>
                {user.username}
              </option>
            ) : null
          )}
        </select>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((project) => {
              if (project.assignedTeamLead === teamlead) {
                return (
                  <option key={project.id} value={project.id}>
                    {project.projectName}
                  </option>
                );
              }
              return null;
            })}

        </select>
        <button type="submit" className="submit-button">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTaskForm;
