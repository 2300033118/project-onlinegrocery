import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8084/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Invalid response from server" };
      }

      console.log("Response:", data);

      if (response.ok && data.status === "success") {
        alert("✅ " + data.message);

        // ✅ Save token & role
        localStorage.setItem("token", data.token || "dummy-admin-token");
        localStorage.setItem("user", JSON.stringify(data.user || { role: "ADMIN" }));

        // Redirect to portal
        navigate("/adminportal");
      } else {
        alert("❌ " + (data.message || "Login failed!"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Unable to connect to backend. Make sure Spring Boot is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Portal</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Admin ID</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Admin ID"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing in..." : "SIGN IN"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "80px auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f8d7da",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#6c757d",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default AdminLogin;
