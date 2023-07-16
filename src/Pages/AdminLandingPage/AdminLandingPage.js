// AdminLandingPage.js
import React, { useState } from "react";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
// import Projects from "../../components/Projects/Projects";
import ViewProjects from "../../components/ViewProjects/ViewProjects"

function AdminLandingPage({ user, onLogout }) {
  const [projectForm, setProjectForm] = useState(false)

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

      <WelcomeMessage username={user.username} />

      <button   onClick={()=>setProjectForm(!projectForm)}
      style={{width:'120px',height:'30px',background:'green',border:'none',color:'white',margin:'20px 0 30px'}}
      >Create Project</button>
      {
        projectForm &&
        <CreateProjectForm />
      }

      {/* <Projects /> */}

      <ViewProjects />
      <LogoutButton onLogout={onLogout} />



    </div>
  );
}

export default AdminLandingPage;
