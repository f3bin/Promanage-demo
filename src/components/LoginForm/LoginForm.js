import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserList } from "../../store/appSlice";
import './LoginForm.scss'

function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setUserList(data));
        const loggedInUser = data.find(
          (user) => user.username === username && user.password === password
        );
        dispatch(setUser(loggedInUser));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;




