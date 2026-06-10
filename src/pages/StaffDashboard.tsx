import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function StaffDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    try {
      const res = await api.get("/tickets");

      setTickets(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    try {
      await api.put(`/tickets/${id}`, {
        status,
        reply: `Ticket marked as ${status}`,
      });

      loadTickets();
    } catch (error) {
      console.error(error);
      alert("Failed to update ticket");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Resolved":
        return {
          backgroundColor: "#DCFCE7",
          color: "#166534",
        };

      case "In Progress":
        return {
          backgroundColor: "#FEF3C7",
          color: "#92400E",
        };

      default:
        return {
          backgroundColor: "#FEE2E2",
          color: "#991B1B",
        };
    }
  };

  return (
    <Layout>
      <h1>Staff Dashboard</h1>

      {loading && <p>Loading tickets...</p>}

      {!loading &&
        tickets.map((ticket) => (
          <div
            key={ticket.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginTop: "15px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{ticket.title}</h3>

            <p>{ticket.description}</p>

            <div
              style={{
                marginTop: "10px",
                marginBottom: "15px",
              }}
            >
              <span
                style={{
                  ...getStatusStyle(ticket.status),
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontWeight: "bold",
                }}
              >
                {ticket.status}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  updateStatus(
                    ticket.id,
                    "In Progress"
                  )
                }
                style={{
                  backgroundColor: "#F59E0B",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                In Progress
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    ticket.id,
                    "Resolved"
                  )
                }
                style={{
                  backgroundColor: "#16A34A",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Resolve
              </button>
            </div>
          </div>
        ))}
    </Layout>
  );
}