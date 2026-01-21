import { useEffect, useMemo, useState } from "react";

const RAW_API = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const API_BASE = useMemo(() => {
    if (!RAW_API) return "";
    return RAW_API.endsWith("/api") ? RAW_API : `${RAW_API}/api`;
  }, []);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      if (!API_BASE) throw new Error("VITE_API_URL is missing");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found in localStorage. Please login first.");

      const res = await fetch(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to fetch users");

      setUsers(json.data || []);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_BASE]);

  const deleteAddress = async (userId) => {
    if (!confirm("Delete user address?")) return;

    const token = localStorage.getItem("token");

    await fetch(`${API_BASE}/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <section className="p-6 bg-[#FAF3F3] min-h-screen">
      <h2 className="text-2xl font-['Jua'] mb-4">Users Management</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Address</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="border-t text-sm">
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">{u.address || "-"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteAddress(u._id)}
                      className="px-3 py-1 bg-pink-300 rounded-lg hover:bg-pink-400"
                    >
                      Delete Address
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
