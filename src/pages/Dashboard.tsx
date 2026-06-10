import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const name = localStorage.getItem("name");

export default function Dashboard() {
  const navigate = useNavigate();

  const cardStyle = {
    background: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    flex: 1,
  };

  return (
    <Layout>
      <h1>
        Welcome, {name} 👋
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Create Ticket</h3>
          <p>Submit a support request.</p>

          <button
            onClick={() => navigate("/create-ticket")}
            style={{
              backgroundColor: "#1E3A8A",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Go
          </button>
        </div>

        <div style={cardStyle}>
          <h3>My Tickets</h3>
          <p>View all submitted tickets.</p>

          <button
            onClick={() => navigate("/my-tickets")}
            style={{
              backgroundColor: "#1E3A8A",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            View
          </button>
        </div>
      </div>
    </Layout>
  );
}