import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock authentication: Assume "teacher" as username and "password" as password
    if (username === "teacher" && password === "password") {
      onLogin({ role: "teacher" }); // Pass user data to parent
      navigate("/teacherdashboard"); // Redirect to TeacherDashBoard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Teacher Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          style={{
            display: "block",
            margin: "10px 0",
            padding: "8px",
            width: "100%",
          }}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            display: "block",
            margin: "10px 0",
            padding: "8px",
            width: "100%",
          }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
