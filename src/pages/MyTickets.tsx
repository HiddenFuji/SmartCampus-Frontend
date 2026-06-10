import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const res = await api.get(`/tickets/user/${userId}`);

        setTickets(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

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
      <h1>My Tickets</h1>

      {loading && <p>Loading tickets...</p>}

      {!loading && tickets.length === 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          No tickets submitted yet.
        </div>
      )}

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
        ))}
    </Layout>
  );
}