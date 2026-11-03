"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Calendar, Clock, Trash2, CheckCircle2, Clock3, XCircle, AlertCircle, MapPin } from "lucide-react";

export default function MyBookingsPage() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : "");

    fetch(`http://localhost:5000/api/bookings/my-bookings?email=${user.email}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
  };

  useEffect(() => {
    fetchBookings();
  }, [user, token]);

const handleCancelBooking = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : "");

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      setBookings(
        bookings.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b))
      );
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      console.error("Cancel error:", err);
      alert(err.message || "Failed to connect to the server.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return {
          bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          icon: Clock3,
          label: "Pending",
        };
      case "Confirmed":
        return {
          bg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
          icon: CheckCircle2,
          label: "Confirmed",
        };
      case "Completed":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          icon: CheckCircle2,
          label: "Completed",
        };
      case "Cancelled":
        return {
          bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          icon: XCircle,
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-neutral-800 border-neutral-700 text-neutral-400",
          icon: AlertCircle,
          label: status || "Pending",
        };
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
          {bookings.map((booking) => {
            const badge = getStatusBadge(booking.status);
            const BadgeIcon = badge.icon;

            return (
              <div key={booking._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  {booking.studioImage && (
                    <img
                      src={booking.studioImage}
                      alt={booking.studioTitle}
                      className="w-full h-40 object-cover rounded-xl mb-4 border border-neutral-800"
                    />
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 border text-xs font-semibold rounded-full flex items-center gap-1 ${badge.bg}`}>
                      <BadgeIcon className="w-3 h-3" /> {badge.label}
                    </span>
                    <span className="text-sm font-bold text-amber-500">${booking.totalPrice || booking.totalAmount}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{booking.studio?.name || booking.studioTitle || "Studio Session"}</h3>
                  
                  {booking.location && (
                    <p className="text-neutral-400 text-sm flex items-center gap-1.5 mb-3">
                      <MapPin className="w-4 h-4 text-amber-500" /> {booking.location}
                    </p>
                  )}

                  <div className="space-y-2 mt-4 text-sm text-neutral-300 border-t border-neutral-800 pt-3">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" /> Date: {booking.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" /> Hours Needed: {booking.hours || 1} hrs
                    </p>
                  </div>
                </div>

                {booking.status === "Pending" && (
                  <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" /> Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}