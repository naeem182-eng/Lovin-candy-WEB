import ProfileElementA from "../../components/MyProfile/ProfileElementA";
import ProfileElementB from "../../components/MyProfile/ProfileElementB";
import "../../components/MyProfile/ProfileElement.css";
import ProfileElementC from "../../components/MyProfile/ProfileElementC";
import ProfileElementD from "../../components/MyProfile/ProfileElementD";
import { useState, useEffect } from 'react';
import axios from "axios";
import { EditModal } from "../../components/MyProfile/EditModal";

export default function MyProfile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(0);

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${apiBase}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserData(res.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

  fetchData();
}, [apiBase, triggerFetch]);

  const handleSuccess = () => {
      setTriggerFetch(prev => prev + 1);
    };

  return (
    <>
      <div className="my-profile">
        <div className="profile-a">
          <ProfileElementA />
        </div>

        <div className="flex flex-col gap-5 w-full min-w-0 overflow-hidden">
          <div className="flex justify-between">
            <h1 className="text-5xl ml-6 mt-5">My Profile</h1>
            <button
              className="mr-5 mt-5 text-2xl bg-white px-6 py-2 rounded-lg shadow-xl hover:text-white hover:bg-[#FF74B1] transition duration-400 hover:scale-105"
              onClick={() => setIsEditOpen(true)}
            >
              Edit Profile
            </button>
          </div>
          <div className="profile-b">
            <ProfileElementB data={userData}/>
          </div>
          <div className="profile-c">
            <ProfileElementC data={userData}/>
          </div>
          <div className="profile-d">
            <ProfileElementD />
          </div>

          {isEditOpen && (
        <EditModal 
          key={userData?._id || "edit-modal"}
          userData={userData}
          isOpen={isEditOpen} 
          onClose={() => setIsEditOpen(false)} 
          initialData={userData}
          onSuccess={handleSuccess}
        />
      )}

        </div>
      </div>
    </>
  );
}
