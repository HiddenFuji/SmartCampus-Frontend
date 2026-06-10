import { useNavigate } from "react-router-dom";
import { colors } from "../styles/theme";

export default function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: colors.primary,
        color: "white",
      }}
    >
      <h2
        style={{ margin: 0, cursor: "pointer" }}
        onClick={() =>
          navigate(
            role === "staff"
              ? "/staff"
              : "/dashboard"
          )
        }
      >
        🎓 Smart Campus
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {role === "student" && (
          <>
            <button
              style={buttonStyle}
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Dashboard
            </button>

            <button
              style={buttonStyle}
              onClick={() =>
                navigate("/create-ticket")
              }
            >
              Create Ticket
            </button>

            <button
              style={buttonStyle}
              onClick={() =>
                navigate("/my-tickets")
              }
            >
              My Tickets
            </button>
          </>
        )}

        {role === "staff" && (
          <button
            style={buttonStyle}
            onClick={() => navigate("/staff")}
          >
            Staff Dashboard
          </button>
        )}

        <button
          style={buttonStyle}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}