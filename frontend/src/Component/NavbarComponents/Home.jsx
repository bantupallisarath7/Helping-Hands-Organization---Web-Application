import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = ({ setView }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [donatedAmount, setDonatedAmount] = useState(0);
  const [approvedCampaigns, setApprovedCampaigns] = useState([])
  const [pendingDonations, setPendingDonations] = useState([])
  const stats = {
    activeCampaigns: 12,
    savedCampaigns: 5,
    lastDonation: "₹2,000 to 'Books for Bihar'",
  };

  const fetchApprovedCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8815/campaign/all", { withCredentials: true });
      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      setApprovedCampaigns(res.data.approvedCampaigns)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  const fetchPendingDonations = async () => {
    try {
      const res = await axios.get("http://localhost:8815/receipt/all", { withCredentials: true })
      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      setPendingDonations(res.data.pendingDonationReceipts)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  const fetchDonatedAmount = async () => {
    try {
      const res = await axios.get("http://localhost:8815/receipt/all/donatedamount", { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      setDonatedAmount(res.data.amount)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }
  useEffect(() => {
    fetchDonatedAmount()
    fetchApprovedCampaigns()
    fetchPendingDonations()
  }, [])

  return (
    <div className="space-y-12">
      {/* Welcome Message */}
      <section className="text-red-900 text-center py-6">
        <h1 className="text-3xl font-bold">Welcome back, {currentUser.fullName}  👋</h1>
        <p className="text-gray-700 mt-2">Here's a quick look at your impact and activity.</p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-900">Total Donations</h2>
          <p className="text-2xl font-bold mt-2">{donatedAmount.toLocaleString()}</p>
        </div>
        <div onClick={() => setView("mycampaigns")} className="bg-white p-6 rounded shadow hover:shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-900">Active Campaigns</h2>
          <p className="text-2xl font-bold mt-2">{approvedCampaigns.length}</p>
        </div>
        <div onClick={() => setView("donationreceipts")} className="bg-white p-6 rounded shadow hover:shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-900">Pending Donations</h2>
          <p className="text-2xl font-bold mt-2">{pendingDonations.length}</p>
        </div>
      </section>


      <section>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setView("campaignform")}
            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Start New Campaign
          </button>
          <button
            onClick={() => setView("mydonations")}
            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            View My Donations
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-bold text-red-900 mb-4">Recent Activity</h2>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-700">
            <span className="font-semibold text-red-900">Last Donation:</span> {stats.lastDonation}
          </p>
        </div>
      </section>

      {/* Shortcuts */}

    </div>
  );
};

export default Home;