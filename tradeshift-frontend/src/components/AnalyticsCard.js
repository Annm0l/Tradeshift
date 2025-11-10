export default function AnalyticsCard({ title, data }) {
  if (!data) return null;
  return (
    <div className="card">
      <h4>{title}</h4>
      <ul>
        {Object.entries(data).map(([k, v]) => (
          <li key={k}>
            {k}: {Number(v).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
          </li>
        ))}
      </ul>
    </div>
  );
}
