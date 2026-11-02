"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      fetchBookings();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings/my-bookings", {
        credentials: "include"
      });
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (res.ok) {
          setBookings(data.bookings || []);
        }
      }
    } catch (err) {
      console.error("Failed to parse or fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-6">My Booked Sessions</h1>
        {loading ? (
          <p className="text-neutral-400">Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-neutral-400">No active bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {booking.studioId?.name || "Studio Space"}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Date: {booking.date} | Time: {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="text-sm text-indigo-400 mt-1">
                    Total: ${booking.totalPrice}
                  </p>
                </div>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="px-4 py-2 text-xs bg-red-600/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}