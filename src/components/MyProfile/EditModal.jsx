import axios from "axios";
import { useState } from "react";

export function EditModal ({ userData, onClose, onSuccess }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    username: userData?.username || "",
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
    email: userData?.email || "",
    phone: userData?.phone || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${apiBase}/users/update-profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.success) {
      onSuccess();
      onClose();
    }

      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-3xl font-['Jua'] mb-6 text-[#2B3A55]">Edit Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 font-['Jua']">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Username</label>
            <input 
              className="border-b-2 border-pink-100 py-2 outline-none focus:border-pink-400 transition"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">First Name</label>
              <input 
                className="border-b-2 border-pink-100 py-2 outline-none focus:border-pink-400 transition"
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Last Name</label>
              <input 
                className="border-b-2 border-pink-100 py-2 outline-none focus:border-pink-400 transition"
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Email</label>
            <input 
              type="email"
              className="border-b-2 border-pink-100 py-2 outline-none focus:border-pink-400 transition"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Phone Number</label>
            <input 
              className="border-b-2 border-pink-100 py-2 outline-none focus:border-pink-400 transition"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2 rounded-full bg-[#FF9ECF] text-white font-bold hover:bg-[#FF7FBF] shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}