import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  role,
}: any) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return (
      <Navigate
        to={
          userRole === "staff"
            ? "/staff"
            : "/dashboard"
        }
      />
    );
  }

  return children;
}