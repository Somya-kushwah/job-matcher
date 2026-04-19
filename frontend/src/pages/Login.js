import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    // ✅ Validation
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8082/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.text();

      console.log("Response:", data); // 🔥 debug

      // ✅ Flexible check
      if (data.toLowerCase().includes("successful")) {
        localStorage.setItem("user", username);
        setUser(username);
        navigate("/");
      } else {
        alert(data || "Login failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server not reachable ❌");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "SIGN IN"}
        </button>

        <p onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
          Don't have account? Sign up
        </p>
      </div>
    </div>
  );
}

export default Login;