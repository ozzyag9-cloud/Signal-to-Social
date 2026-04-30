export default function Card({ title, children }: any) {
  return (
    <div style={{ padding: 12, border: "1px solid #ccc", borderRadius: 12 }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
