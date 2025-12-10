import axios from "axios";
import CampaignCard from "../../Cards/CampaignCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Applications = ({ setAdminView, setFormMode, setEditCampaign }) => {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPendingCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8815/admin/campaign/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
      }
      setPendingCampaigns(res.data.pendingCampaigns)
      // toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPendingCampaigns()
  }, [])

  return (
    <div className=" flex mt-4 flex-col">
      <div className="flex-1 overflow-y-auto py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
          </div>
        ) : pendingCampaigns.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-semibold text-red-900 mb-2">
              No pending campaigns found
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-md">
              All caught up! There are currently no campaigns awaiting review. Check back later for new submissions.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                fetchPendingCampaigns();
              }}
              className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {
              pendingCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign._id}
                  campaign={campaign}
                  setDashboardView={setAdminView}
                  setFormMode={setFormMode}
                  setEditCampaign={setEditCampaign}
                  refreshCampaigns={fetchPendingCampaigns}
                />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;