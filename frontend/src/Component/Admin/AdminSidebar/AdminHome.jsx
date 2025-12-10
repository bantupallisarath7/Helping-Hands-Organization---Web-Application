import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminHome = ({ setAdminView }) => {
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [countPendingCampaigns, setCountPendingCampaigns] = useState(0);
  const [countApprovedCampaigns, setCountApprovedCampaigns] = useState(0);
  const [pendingReceipts, setPendingReceipts] = useState(0);
  const [loading, setLoading] = useState(true);
  const stats = {
    lastApproved: "₹5,000 for 'Medical Aid for Rani'"
  };

  const fetchCollectedAmount = async () => {
    try {
      const res = await axios.get("http://localhost:8815/receipt/all/collectedamount", { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      setCollectedAmount(res.data.amount)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8815/admin/campaign/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
      }
      setCountPendingCampaigns(res.data.pendingCampaigns.length)
      setCountApprovedCampaigns(res.data.approvedCampaigns.length)
      // toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  const fetchPendingReceipts = async () => {
    try {
      const res = await axios.get("http://localhost:8815/admin/receipt/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
      }
      setPendingReceipts(res.data.pendingReceipts.length)
      // toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }






  useEffect(() => {
    fetchCollectedAmount();
    fetchCampaigns();
    fetchPendingReceipts();
  }, [])


  return (
    <div className="space-y-12">
      {/* Welcome Message */}
      <section className="text-red-900 text-center py-6">
        <h1 className="text-3xl font-bold">Welcome Admin 👋</h1>
        <p className="text-gray-700 mt-2">Here's a overview of platform activity and pending actions.</p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg text-center ">
          <h2 className="text-xl font-semibold text-red-900">Total Donations</h2>
          <p className="text-2xl font-bold mt-2">₹{collectedAmount}</p>
        </div>
        <div onClick={() => setAdminView("applications")} className="bg-white p-6 rounded shadow hover:shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-900">New Campaigns</h2>
          <p className="text-2xl font-bold mt-2">{countPendingCampaigns}</p>
        </div>
        <div onClick={() => setAdminView("manage-campaigns")} className="bg-white p-6 rounded shadow hover:shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-900">Live Campaigns</h2>
          <p className="text-2xl font-bold mt-2">{countApprovedCampaigns}</p>
        </div>
        <div onClick={() => setAdminView("admin-donation-receipts")} className="bg-white p-6 rounded shadow hover:shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-900">Pending Receipts</h2>
          <p className="text-2xl font-bold mt-2">{pendingReceipts}</p>
        </div>
      </section>

      {/* Admin Actions */}
      <section>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setAdminView("manage-campaigns")}
            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Review Campaigns
          </button>
          <button
            onClick={() => setAdminView("applications")}
            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Approve Applications
          </button>
          <button
            onClick={() => setAdminView("admin-donation-receipts")}
            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Verify Donations
          </button>
        </div>
      </section>

      {/* Recent Admin Activity */}
      <section>
        <h2 className="text-xl font-bold text-red-900 mb-4">Recent Admin Activity</h2>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-700">
            <span className="font-semibold text-red-900">Last Approved:</span> {stats.lastApproved}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;