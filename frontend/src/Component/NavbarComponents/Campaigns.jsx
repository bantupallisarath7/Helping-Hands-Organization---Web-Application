import axios from "axios";
import { useEffect, useState } from "react";
import LiveCampaignCard from "../Cards/LiveCampaignCard"
import { toast } from "react-toastify";

const Campaigns = ({ setView, setFormMode, setEditReceipt }) => {
  const [approvedCampaign, setApprovedCampaign] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApprovedCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8815/campaign/approved/all", {
        withCredentials: true,
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setApprovedCampaign(res.data.approvedCampaigns);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApprovedCampaigns();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto py-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
        </div>
      ) : approvedCampaign.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center mt-20 py-16 px-4">
          <div className="text-6xl mb-4">📢</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No active campaigns yet
          </h3>
          <p className="text-sm text-gray-500 text-center max-w-md">
            Campaigns will appear here once they are approved. Please check back later.
          </p>
          <button
            onClick={() => {
              setLoading(true);
              getApprovedCampaigns();
            }}
            className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
          >
            Refresh Campaigns
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 py-4">
          {approvedCampaign.map((campaign) => (
            <LiveCampaignCard
              key={campaign._id}
              campaign={campaign}
              isAdmin={false}
              onEdit={() => alert("Edit clicked")}
              onDelete={() => alert("Delete clicked")}
              onBookmark={() => alert("Bookmark")}
              onAddAmount={() => alert("Add amount")}
              setView={setView}
              setFormMode={setFormMode}
              setEditReceipt={setEditReceipt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;