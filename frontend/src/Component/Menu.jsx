import {
  MdFavorite,
  MdCampaign,
  MdBookmark,
  MdAssignment,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import { FaReceipt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Menu = ({ setView, activeView, setFormMode, setEditCampaign }) => {
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
      dispatch(signOutSuccess())
      toast.success(res.data.message)
      setView("signin");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
      dispatch(signOutFailure(error));
    }
  }



  return (
    <aside className="w-64 h-[calc(100vh-72px)] bg-white shadow-md p-6 mt-6 fixed top-18 left-0 z-40">
      <h2 className="text-lg font-bold text-red-900 mb-6">Menu</h2>

      <div className="flex flex-col gap-4 text-gray-700 font-medium">
        <button
          onClick={() => setView("mydonations")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "mydonations" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}
        >
          <MdFavorite className="text-xl" />
          <span className="font-semibold">My Donations</span>
        </button>

        <button
          onClick={() => setView("mycampaigns")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "mycampaigns" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}
        >
          <MdCampaign className="text-xl" />
          <span className="font-semibold">My Campaigns</span>
        </button>

        {/* <button
          onClick={() => setView("savedcampaigns")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${ activeView === "savedcampaigns" ?"bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}
        >
          <MdBookmark className="text-xl" />
          <span className="font-semibold">Saved Campaigns</span>
        </button> */}

        <button
          onClick={() => {
            setFormMode("add")
            setEditCampaign(null)
            setView("campaignform")
          }}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "campaignform" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}
        >
          <MdAssignment className="text-xl" />
          <span className="font-semibold">Campaign Form</span>
        </button>

        <button
          onClick={() => setView("donationreceipts")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "donationreceipts" ? "bg-red-100 text-red-900 rounded font-bold" : "hover:text-red-900"}`}
        >
          <FaReceipt className="text-xl" />
          <span className="font-semibold">Donation Receipts</span>
        </button>

        <button
          onClick={() => setView("profile")}
          className={`flex items-center gap-3 hover:text-red-900 transition
            ${activeView === "profile" ? "bg-red-100 text-red-900  rounded font-bold" : "hover:text-red-900"}`}
        >
          <MdPerson className="text-xl" />
          <span className="font-semibold">Profile</span>
        </button>

        <button
          onClick={onSignout}
          className="flex items-center gap-3 hover:text-red-900 transition"
        >
          <MdLogout className="text-xl" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Menu;