import { useEffect, useState } from "react";
import DonationReceiptCard from "../../Cards/DonationReceiptCard";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDonationReceipts = ({ setAdminView, setFormMode, setEditReceipt }) => {
  const [allReceipts, setAllReceipts] = useState({
    allReceipts: [],
    pendingReceipts: [],
    approvedReceipts: [],
    rejectedReceipts: [],
  });
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchAllReceipts = async () => {
    try {
      const res = await axios.get("http://localhost:8815/admin/receipt/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
        return
      }
      setAllReceipts({
        ...allReceipts,
        allReceipts: [...res.data.receipts],
        pendingReceipts: [...res.data.pendingReceipts],
        approvedReceipts: [...res.data.approvedReceipts],
        rejectedReceipts: [...res.data.rejectedReceipts],
      })
      // toast.success(res.data.message)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAllReceipts()
  }, [])

  const getReceipts = () => {
    switch (status) {
      case "pending":
        return allReceipts.pendingReceipts;
      case "approved":
        return allReceipts.approvedReceipts;
      case "rejected":
        return allReceipts.rejectedReceipts;
      case "all":
        return allReceipts.allReceipts;
      default:
        return allReceipts.allReceipts;
    }
  };

  return (
    <div className=" flex mt-4 flex-col">
      <div className="w-full p-4 space-x-6 text-lg font-bold drop-shadow-md">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700  transition hover:bg-blue-200 hover:text-gray-900`}
          onClick={() => setStatus("all")}
        >
          All
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700  transition ${status === "pending" ? "bg-yellow-200 text-gray-900" : "hover:bg-yellow-200 hover:text-gray-900"}`}
          onClick={() => setStatus("pending")}
        >
          Pending
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700  transition ${status === "approved" ? "bg-green-200 text-gray-900" : "hover:bg-green-200 hover:text-gray-900"}`}
          onClick={() => setStatus("approved")}
        >
          Approved
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700  transition ${status === "rejected" ? "bg-red-200 text-gray-900" : "hover:bg-red-200 hover:text-gray-900"}`}
          onClick={() => setStatus("rejected")}
        >
          Rejected
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 ">
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
              Receipts submitted by users in this category will appear here once available
            </p>
            <button
              onClick={() => {
                setLoading(true);
                fetchAllReceipts();
              }}
              className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
            >
              Refresh Receipts
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {
              getReceipts().map((receipt) => (
                <DonationReceiptCard
                  key={receipt._id}
                  receipt={receipt}
                  setDashboardView={setAdminView}
                  setFormMode={setFormMode}
                  setEditReceipt={setEditReceipt}
                  refreshReceipts={fetchAllReceipts}
                />
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminDonationReceipts;