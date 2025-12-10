import axios from "axios";
import Logo from "../assets/HHO-logo.png";
import ProfileInfo from "./Cards/ProfileInfo";
import { MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = ({ setView, toggleSidebar, refreshProfile, setRefreshProfile, activeView }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userData, setUserData] = useState(null);
  const getUserInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8815/auth/get/${currentUser.userId}`, {
        withCredentials: true
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setUserData(res.data.user);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setRefreshProfile(false)
    }

  };

  useEffect(() => {
    getUserInfo();
  }, [refreshProfile]);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Menu Icon + Logo + Title */}
      <div className="flex items-center space-x-3">
        <button
          title="User menu"
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 hover:text-red-900 focus:outline-none"
        >
          <MdMenu />
        </button>
        <img src={Logo} alt="HHO Logo" className="w-12 h-12 object-contain" />
        <h1 onClick={() => setView("home")} className="text-xl font-bold text-red-900 cursor-pointer">
          Helping Hands Organization
        </h1>
      </div>

      {/* Right: Navigation Links + Profile */}
      <div className="flex space-x-6 items-center text-gray-700 font-medium">
        <button onClick={() => setView("home")} className="hover:text-red-900 font-semibold">Home</button>
        <button onClick={() => setView("campaigns")} className={`font-semibold ${activeView === "campaigns" ? "text-red-900 font-bold" : "hover:text-red-900"}`}>Campaigns</button>
        <button onClick={() => setView("gallery")} className={`font-semibold ${activeView === "gallery" ? "text-red-900 font-bold" : "hover:text-red-900"}`}>Gallery</button>
        <button onClick={() => setView("events")} className={`font-semibold ${activeView === "events" ? "text-red-900 font-bold" : "hover:text-red-900"}`}>Events</button>
        <div onClick={() => setView("profile")}>
          {userData && <ProfileInfo userInfo={userData} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;