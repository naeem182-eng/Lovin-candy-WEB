
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    today: 0,
    month: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (!res.ok || json?.success === false) throw new Error();

      const orders = json.data || [];
      const now = new Date();

      const todayOrders = orders.filter((o) => {
        const d = new Date(o.createdAt);
        return (
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      });

      const monthOrders = orders.filter((o) => {
        const d = new Date(o.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      setSummary({
        today: todayOrders.length,
        month: monthOrders.length,
        pending: orders.filter((o) => o.status === "PENDING").length,
        inTransit: orders.filter((o) => o.status === "IN-TRANSIT").length,
        delivered: orders.filter((o) => o.status === "DELIVERED").length,
      });
    } catch (e) {
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ title, value, color }) => (
    <div className={`rounded-2xl p-6 shadow bg-${color}-100`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-[#FAF3F3] px-6 py-8">
      <h2 className="font-['Jua'] text-2xl md:text-3xl mb-6">Dashboard</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Orders Today" value={summary.today} color="yellow" />
          <Card title="Orders This Month" value={summary.month} color="pink" />
          <Card title="Pending Orders" value={summary.pending} color="gray" />
          <Card title="In Transit" value={summary.inTransit} color="blue" />
          <Card title="Delivered" value={summary.delivered} color="green" />
        </div>
      )}
    </section>
  );
}
