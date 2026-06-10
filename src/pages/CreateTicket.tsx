import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/axios";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await api.post("/tickets", {
        title,
        description,
        created_by: userId,
      });

      alert("Ticket created successfully!");
      navigate("/my-tickets");
    } catch {
      alert("Failed to create ticket");
    }
  };

  return (
    <Layout>
      <h1>Create Ticket</h1>

      <input
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "12px",
        }}
        placeholder="Ticket Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={{
          width: "100%",
          minHeight: "150px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
        placeholder="Describe your issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={submit}
        style={{
          backgroundColor: "#16A34A",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Submit Ticket
      </button>
    </Layout>
  );
}