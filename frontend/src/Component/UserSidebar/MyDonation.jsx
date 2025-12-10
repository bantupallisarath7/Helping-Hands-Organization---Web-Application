import { useState } from "react";
import Donation from "../Cards/Donation";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const MyDonations = () => {
    const [myDonations, setMyDonations] = useState([]);
    const [donatedAmount, setDonatedAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchDonations = async () => {
        try {
            const res = await axios.get("http://localhost:8815/receipt/all", { withCredentials: true });
            if (res.data.success === false) {
                toast.error(res.data.message);
                return
            }
            setMyDonations(res.data.approvedDonationReceipts);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }
    const fetchDonationAmount = async () => {
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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDonations();
        fetchDonationAmount();
    }, [])


    return (
        <div className="relative">
            <p className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow w-fit max-w-xs text-sm font-medium z-50">
                Total: ₹{donatedAmount.toLocaleString()}
            </p>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
                </div>
            ) : myDonations.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center mt-20 py-16 px-4">
                    <div className="text-6xl mb-4">🧾</div>
                    <h3 className="text-2xl font-semibold text-red-900 mb-2">
                        You haven't made any donations yet
                    </h3>
                    <p className="text-sm text-gray-500 text-center max-w-md">
                        Once you donate, your receipts will appear here. Start supporting a campaign today!
                    </p>
                    <button
                        onClick={() => {
                            setLoading(true);
                            fetchDonations();
                            fetchDonationAmount();
                        }}
                        className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
                    >
                        Refresh Donations
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-4">
                    {myDonations.map((donation) => (
                        <Donation key={donation._id} data={donation} />
                    ))}
                </div>
            )}
        </div>
    )
}
export default MyDonations;
