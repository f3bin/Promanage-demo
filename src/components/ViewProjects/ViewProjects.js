import React, { useEffect, useState } from "react";
import './ViewProjects.scss'

///// View all added projects

function ViewProjects() {
  const [projects, setProjects] = useState([]);

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
    // Fetch project data from the database
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('/api/projects') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setProjects(data.projects))
      .catch(error => console.error('Error fetching projects:', error));
  };

  const handleDelete = (projectId) => {
    // Make a DELETE request to the API to delete the project
    fetch(`http://localhost:8000/projects/${projectId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // If the project was successfully deleted, fetch the updated projects list
          fetchProjects();
        }
      })
      .catch(error => console.error('Error deleting project:', error));
  };


  return (
    <table className="table">
    <thead>
      <tr>
        <th>Project Name</th>
        <th>Assigned Team Lead</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {projects.map((project) => (
        <tr key={project.id}>
          <td>{project.projectName}</td>
          <td>{project.assignedTeamLead}</td>
          <td>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
}

export default ViewProjects;



