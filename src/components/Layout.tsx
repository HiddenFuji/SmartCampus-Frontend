import Navbar from "./Navbar";
import { colors } from "../styles/theme";

export default function Layout({ children }: any) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}