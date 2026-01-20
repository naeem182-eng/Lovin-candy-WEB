import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/users`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Fetch failed");

      setUsers(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const deleteAddress = async (id) => {
    if (!confirm("Delete address?")) return;

    await fetch(`${API}/api/users/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

 
  const updateAddress = async (id) => {
    const address = prompt("New address:");
    if (!address) return;

    await fetch(`${API}/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
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
            {users.map((u) => (
              <tr key={u._id} className="border-t text-sm">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.address || "-"}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => updateAddress(u._id)}
                    className="px-3 py-1 bg-yellow-200 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAddress(u._id)}
                    className="px-3 py-1 bg-pink-300 rounded-lg"
                  >
                    Delete Address
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
