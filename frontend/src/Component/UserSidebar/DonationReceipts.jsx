import { useEffect, useState } from "react";
import DonationReceiptCard from "../Cards/DonationReceiptCard";
import axios from "axios";
import { toast } from "react-toastify";


const DonationReceipts = ({ setView, setFormMode, setEditReceipt }) => {
  const [myReceipts, setMyReceipts] = useState({
    allDonationReceipts: [],
    pendingDonationReceipts: [],
    approvedDonationReceipts: [],
    rejectedDonationReceipts: [],
  })
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchReceipts = async () => {
    try {
      const res = await axios.get("http://localhost:8815/receipt/all", { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message)
        return;
      }
      setMyReceipts({
        ...myReceipts,
        allDonationReceipts: [...res.data.receipts],
        pendingDonationReceipts: [...res.data.pendingDonationReceipts],
        approvedDonationReceipts: [...res.data.approvedDonationReceipts],
        rejectedDonationReceipts: [...res.data.rejectedDonationReceipts],
      })
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReceipts();
  }, [])
  const getReceipts = () => {
    switch (status) {
      case "pending":
        return myReceipts.pendingDonationReceipts;
      case "approved":
        return myReceipts.approvedDonationReceipts;
      case "rejected":
        return myReceipts.rejectedDonationReceipts;
      case "all":
        return myReceipts.allDonationReceipts;
      default:
        return myReceipts.allDonationReceipts;
    }
  };

  return (
    <div className="flex mt-4 flex-col">
      <div className=" w-full p-4 space-x-6 text-lg font-bold drop-shadow-md">
        <button
          onClick={() => setStatus("all")}
          className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-blue-200 hover:text-gray-900 transition"
        >
          All
        </button>

        <button
          onClick={() => setStatus("pending")}
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700  transition ${status === "pending" ? "bg-yellow-200 text-gray-900" : "hover:bg-yellow-200 hover:text-gray-900"}`}
        >
          Pending
        </button>

        <button
          onClick={() => setStatus("approved")}
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700  transition ${status === "approved" ? "bg-green-200 text-gray-900" : "hover:bg-green-200 hover:text-gray-900"}`}
        >
          Approved
        </button>
        <button
          onClick={() => setStatus("rejected")}
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700  transition ${status === "rejected" ? "bg-red-200 text-gray-900" : "hover:bg-red-200 hover:text-gray-900"}`}
        >
          Rejected
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6">

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
          </div>
        ) : getReceipts().length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
            <div className="text-6xl mb-4">🧾</div>
            <h3 className="text-2xl font-semibold text-red-900 mb-2">
              No {status} receipts found
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-md ">
              You haven't submitted any receipts in this category yet. Try uploading one or check back later.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                fetchReceipts();
              }}
              className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
            >
              Refresh Receipts
            </button>
          </div>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {getReceipts().map((receipt) => (
              <DonationReceiptCard
                key={receipt._id}
                receipt={receipt}
                setDashboardView={setView}
                setFormMode={setFormMode}
                setEditReceipt={setEditReceipt}
                refreshReceipts={fetchReceipts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationReceipts;