// App.js
import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm/LoginForm";
import AdminLandingPage from "./Pages/AdminLandingPage/AdminLandingPage";
import TeamLeadLandingPage from "./Pages/TeamLeadLandingPage/TeamLeadLandingPage";
import UserLandingPage from "./Pages/UserLandingPage/UserLandingPage";

function App() {
  const user = useSelector((state) => state.app.user);
  const project = useSelector((state=>state.app.projects))
  const handleLogout = () => {
    // Dispatch action to clear the user state
  };

  const renderApp = () => {
    if (!user) {
      return <LoginForm />;
    } else if (user.role === "admin") {
      return <AdminLandingPage user={user} onLogout={handleLogout} />;
    } else if (user.role === "teamlead") {
      return <TeamLeadLandingPage user={user} onLogout={handleLogout} />;
    } else {
      return <UserLandingPage user={user} onLogout={handleLogout} />;
    }
  };

  return <div className="App">{renderApp()}</div>;
}

export default App;



// // App.js  
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {  Routes, Route, useNavigate } from "react-router-dom";
// import LoginForm from "./components/LoginForm/LoginForm";
// import AdminLandingPage from "./Pages/AdminLandingPage/AdminLandingPage";
// import TeamLeadLandingPage from "./Pages/TeamLeadLandingPage/TeamLeadLandingPage";
// import UserLandingPage from "./Pages/UserLandingPage/UserLandingPage";

// function App() {
//   const user = useSelector((state) => state.app.user);
//   const navigate = useNavigate();

//   const handleLogin = (credentials) => {
//     // Perform login logic
//     // The user role is already available in the user object from useSelector
//     if (user && user.role === "admin") {
//       navigate("/admin");
//     } else if (user && user.role === "teamlead") {
//       navigate("/teamlead");
//     } else if (user && user.role === "user") {
//       navigate("/user");
//     } else {
//       // Handle invalid login
//     }
//   };

//   const handleLogout = () => {
//     // Dispatch action to clear the user state
//   };

//   return (
    
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
//           <Route
//             path="/admin"
//             element={user?.role === "admin" ? <AdminLandingPage user={user} onLogout={handleLogout} /> : <LoginForm />}
//           />
//           <Route
//             path="/teamlead"
//             element={user?.role === "teamlead" ? <TeamLeadLandingPage user={user} onLogout={handleLogout} /> : <LoginForm />}
//           />
//           <Route
//             path="/user"
//             element={user?.role ? <UserLandingPage user={user} onLogout={handleLogout} /> : <LoginForm />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




