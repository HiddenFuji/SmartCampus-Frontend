import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
  };

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem(
          "userId",
          String(res.data.user.id)
        );

        localStorage.setItem(
          "name",
          res.data.user.name
        );

      if (res.data.user.role === "student") {
        navigate("/dashboard");
      } else {
        navigate("/staff");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          🎓 Smart Campus
        </h1>

        <input
          style={inputStyle}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            backgroundColor: "#1E3A8A",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            cursor: "pointer",
            color: "#1E3A8A",
          }}
          onClick={() => navigate("/register")}
        >
          Create an account
        </p>
      </div>
    </div>
  );
}