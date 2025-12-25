import { useAppState } from "../context/AppStateContext";

export default function SuccessMessage() {
  const { successMessage } = useAppState();

  if (!successMessage) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        padding: "var(--spacing-md)",
        background: "var(--success-bg)",
        color: "var(--success)",
        border: "1px solid var(--success)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {successMessage}
    </div>
  );
}
