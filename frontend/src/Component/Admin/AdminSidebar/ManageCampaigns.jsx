import { useEffect, useState } from "react";
import Campaigns from "../../NavbarComponents/Campaigns";
import axios from "axios";
import CampaignCard from "../../Cards/CampaignCard";
import { toast } from "react-toastify";

const ManageCampaigns = ({ setAdminView, setFormMode, setEditCampaign }) => {
  const [allCampaigns, setAllCampaigns] = useState({
    allCampaigns: [],
    pendingCampaigns: [],
    approvedCampaigns: [],
    rejectedCampaigns: [],
    fundedCampaigns: [],
  });
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchAllCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8815/admin/campaign/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
      }
      setAllCampaigns({
        ...allCampaigns,
        allCampaigns: [...res.data.campaigns],
        pendingCampaigns: [...res.data.pendingCampaigns],
        approvedCampaigns: [...res.data.approvedCampaigns],
        rejectedCampaigns: [...res.data.rejectedCampaigns],
        fundedCampaigns: [...res.data.fundedCampaigns]
      })
      // toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAllCampaigns()
  }, [])

  const getCampaigns = () => {
    switch (status) {
      case "pending":
        return allCampaigns.pendingCampaigns;
      case "approved":
        return allCampaigns.approvedCampaigns;
      case "rejected":
        return allCampaigns.rejectedCampaigns;
      case "funded":
        return allCampaigns.fundedCampaigns;
      case "all":
        return allCampaigns.allCampaigns;
      default:
        return allCampaigns.allCampaigns;
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
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700  transition ${status === "funded" ? "bg-green-200 text-gray-900" : "hover:bg-green-200 hover:text-gray-900"}`}
          onClick={() => setStatus("funded")}
        >
          Funded
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 ">

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
          </div>
        ) : getCampaigns().length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
            <div className="text-6xl mb-4">📢</div>
            <h3 className="text-2xl font-semibold text-red-900 mb-2">
              No {status} campaigns found
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-md">
              users haven't created any {status === "all" ? "campaigns" : status + " campaigns"} yet. Start one now or check back later.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                fetchAllCampaigns();
              }}
              className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
            >
              Refresh Campaigns
            </button>
          </div>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {
              getCampaigns().map((campaign) => (
                <CampaignCard
                  key={campaign._id}
                  campaign={campaign}
                  setDashboardView={setAdminView}
                  setFormMode={setFormMode}
                  setEditCampaign={setEditCampaign}
                  refreshCampaigns={fetchAllCampaigns}
                />
              ))
            }
          </div>
        )}

      </div>
    </div>
  )
}
export default ManageCampaigns;
