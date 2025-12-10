import {
  MdDashboard,
  MdCampaign,
  MdAssignmentTurnedIn,
  MdPeople,
  MdPerson,
  MdLogout,
  MdImage,
  MdEvent,
  MdHome,
} from "react-icons/md";
import { FaReceipt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../../../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const AdminMenu = ({ setAdminView, activeView, setSelectedUserId }) => {
  const dispatch = useDispatch()

  const onSignout = async () => {
    try {
      dispatch(signOutStart());
      const res = await axios.get("http://localhost:8815/auth/signout",
        { withCredentials: true }
      );
      if (res.data.success === false) {
        toast.error(res.data.message)
        dispatch(signOutFailure(res.data.message));
        return
      }
      toast.success(res.data.message)
      dispatch(signOutSuccess())
      setAdminView("signin");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
      dispatch(signOutFailure(error));
    }
  }


  return (
    <aside className="w-64 h-[calc(100vh-48px)] bg-white shadow-md p-6 mt-5 fixed top-16 left-0 z-40">
      <h2 className="text-lg font-bold text-red-900 mb-3">Admin Panel</h2>

      <div className="flex flex-col gap-4 text-gray-700 font-medium">
        <button onClick={() => setAdminView("admin-home")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "admin-home" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <MdDashboard className="text-xl" />
          <span className="font-semibold">Home</span>
        </button>

        <button onClick={() => setAdminView("landingpage-home")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "landingpage-home" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <MdHome className="text-xl" />
          <span className="font-semibold">Landing Page Home</span>
        </button>

        <button onClick={() => setAdminView("manage-campaigns")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "manage-campaigns" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <MdCampaign className="text-xl" />
          <span className="font-semibold">Manage Campaigns</span>
        </button>
        <button onClick={() => setAdminView("applications")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "applications" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <MdAssignmentTurnedIn className="text-xl" />
          <span className="font-semibold">Applications</span>
        </button>
        <button onClick={() => setAdminView("admin-donation-receipts")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "admin-donation-receipts" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <FaReceipt className="text-xl" />
          <span className="font-semibold">Donation Receipts</span>
        </button>
        <button onClick={() => setAdminView("manage-gallery")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "manage-gallery" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <MdImage className="text-xl" />
          <span className="font-semibold">Manage Gallery</span>
        </button>
        <button onClick={() => setAdminView("manage-events")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "manage-events" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <MdEvent className="text-xl" />
          <span className="font-semibold">Manage Events</span>
        </button>
        <button onClick={() => setAdminView("manage-users")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "manage-users" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <MdPeople className="text-xl" />
          <span className="font-semibold">Manage Users</span>
        </button>
        <button onClick={() => {
          setSelectedUserId(null);
          setAdminView("admin-profile")
        }}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "admin-profile" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}>
          <MdPerson className="text-xl" />
          <span className="font-semibold">Profile</span>
        </button>
        <button onClick={onSignout} className="flex items-center gap-3 hover:text-red-900 transition">
          <MdLogout className="text-xl" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminMenu;