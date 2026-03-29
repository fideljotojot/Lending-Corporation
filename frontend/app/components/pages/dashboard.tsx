type DashboardPageProps = {
  user: {
    id: string;
    first_name?: string;
    username: string;
    email?: string;
  };
  onLogout: () => void;
};

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const displayName = user.first_name || user.username;

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
        Welcome {displayName}
      </h1>

      <div
        style={{
          backgroundColor: "#f8fafc",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Session Login</h2>
        <p style={{ marginBottom: "0.5rem" }}>
          <strong>Username:</strong> {user.username}
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Email:</strong> {user.email || "No email available"}
        </p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        style={{
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#1d4ed8",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </section>
  );
}
