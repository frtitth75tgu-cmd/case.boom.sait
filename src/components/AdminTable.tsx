export function AdminTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel" style={{ padding: 14, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>
    </div>
  );
}

export function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ textAlign: "left", padding: 12, color: "rgba(255,255,255,.55)", fontSize: 12, textTransform: "uppercase" }}>{children}</th>;
}

export function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.07)" }}>{children}</td>;
}
