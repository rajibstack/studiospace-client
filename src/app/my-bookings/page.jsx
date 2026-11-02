"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Clock, Trash2, CheckCircle2 } from "lucide-react";

export default function MyBookingsPage() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (data.bookings && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load bookings");
        setLoading(false);
      });
  }, [token]);

  const handleCancelBooking = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res =- await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to cancel booking");

      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-neutral-400">Loading your bookings...</div>;
  }

  if (!user) {
    return <div className="text-center py-20 text-neutral-400">Please login to view your bookings.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Bookings</h1>
        <p className="text-neutral-400 mt-2">Manage your scheduled studio sessions and active reservations.</p>
      </div>

      {error && <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl">{error}</div>}

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <p className="text-neutral-400">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Confirmed
                  </span>
                  <span className="text-sm font-bold text-amber-500">${booking.totalPrice}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{booking.studio?.name || booking.studioName || "Studio Session"}</h3>
                
                <div className="space-y-2 mt-4 text-sm text-neutral-300">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" /> Date: {booking.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" /> Time: {booking.startTime} - {booking.endTime}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}