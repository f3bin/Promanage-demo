import React from "react";
import './WelcomeMessage.scss'

function WelcomeMessage({ username }) {
  return <h1 className="welcome-message">Welcome, {username}!</h1>;
}

export default WelcomeMessage;
