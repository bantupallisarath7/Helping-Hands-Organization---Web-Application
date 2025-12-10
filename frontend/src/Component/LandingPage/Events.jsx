import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import LandpageEventCard from "../Cards/LandpageEventCard";

const Events = () => {
  const [allEvents, setAllEvents] = useState({
    upcomingEvents: [],
    liveEvents: [],
    cancelledEvents: []
  });
  const [status, setStatus] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8815/admin/event/all", {
        withCredentials: true,
      });
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      setAllEvents({
        upcomingEvents: [...res.data.upcomingEvents],
        liveEvents: [...res.data.liveEvents],
        cancelledEvents: [...res.data.cancelledEvents],

      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateEventStatus = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8815/admin/event/autoupdate/all",
        {},
        { withCredentials: true }
      );
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    const syncEvents = async () => {
      await updateEventStatus();
      await fetchAllEvents();
    };
    syncEvents();
  }, []);

  const getEvents = () => {
    switch (status) {
      case "upcoming":
        return allEvents.upcomingEvents;
      case "live":
        return allEvents.liveEvents;
      case "cancelled":
        return allEvents.cancelledEvents;
      default:
        return allEvents.upcomingEvents;
    }
  };

  return (
    <div className="flex mt-4 flex-col">
      <div className="w-full p-4 space-x-6 text-lg font-bold drop-shadow-md">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 transition ${status === "upcoming"
              ? "bg-yellow-200 text-gray-900"
              : "hover:bg-yellow-200 hover:text-gray-900"
            }`}
          onClick={() => setStatus("upcoming")}
        >
          Upcoming
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 transition ${status === "live"
              ? "bg-green-200 text-gray-900"
              : "hover:bg-green-200 hover:text-gray-900"
            }`}
          onClick={() => setStatus("live")}
        >
          Live
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 transition ${status === "cancelled"
              ? "bg-red-200 text-gray-900"
              : "hover:bg-red-200 hover:text-gray-900"
            }`}
          onClick={() => setStatus("cancelled")}
        >
          Cancelled
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
          </div>
        ) : getEvents().length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
            <div className="text-6xl mb-4 ">🗓️</div>
            <h3 className="text-2xl font-semibold text-red-900 mb-2">
              No {status} events found
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-md">
              It looks like there are no events in this category right now. Please check back later or try refreshing.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                updateEventStatus().then(fetchAllEvents);
              }}
              className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
            >
              Refresh Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {getEvents().map((event) => (
              <LandpageEventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;