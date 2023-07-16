import React from "react";
import "./LogoutButton.scss"

function LogoutButton({ onLogout }) {
    return <button className="logout-button" onClick={onLogout}>Logout</button>;
}

export default LogoutButton;
