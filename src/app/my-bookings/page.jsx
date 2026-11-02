"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Clock, MapPin, Trash2 } from "lucide-react";

export default function MyBookingsPage() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const handleDeleteBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-neutral-400">Loading bookings...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>

      {error && <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg text-sm">{error}</div>}

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <p className="text-neutral-400">You have no active studio bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{booking.studioId?.name || "Studio Workspace"}</h3>
                <div className="space-y-2 text-sm text-neutral-300 mt-4">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" /> Date: {booking.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" /> Time: {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" /> Location: {booking.studioId?.location || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-lg font-bold text-amber-500">${booking.totalPrice}</span>
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-sm font-medium rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}