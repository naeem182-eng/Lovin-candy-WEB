import ProfileElementA from "../../components/MyProfile/ProfileElementA";
import '../../components/MyProfile/ProfileElement.css';
import ProfileAddress from "../../components/MyProfile/ProfileAddress";
import { Link } from "react-router-dom";

export default function MyAddress() {
  return (
    <>
      <div className="my-profile">
        <div className="profile-a">
          <ProfileElementA />
        </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between items-end px-6 mt-5">
            <h1 className="text-5xl">My Address</h1>
            <Link 
            to="/profile/address/edit"
            className="bg-yellow-200 px-5 py-2 rounded-lg text-2xl font-bold hover:bg-yellow-300 transition-colors cursor-pointer mb-2">
              Edit Address
            </Link>
          </div>
          <div className="profile-c">
            <ProfileAddress />
          </div>
      </div>
    </div>
  </>
  )
}