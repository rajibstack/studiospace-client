"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Clock, MapPin, DollarSign, CheckCircle2 } from "lucide-react";

function StudioDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token } = useAuth();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/studios/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudio(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch studio details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      router.push("/login");
      return;
    }

    if (!bookingDate || !startTime || !endTime) {
      setError("Please fill in all booking fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studioId: id,
          date: bookingDate,
          startTime,
          endTime,
          totalPrice: studio.pricePerHour,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed. Slot might be occupied.");
      }

      setSuccess("Studio booked successfully!");
      setTimeout(() => {
        router.push("/my-bookings");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-neutral-400">Loading studio details...</div>;
  }

  if (!studio) {
    return <div className="text-center py-20 text-rose-500">Studio not found!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Studio Image & Info */}
        <div>
          <img
            src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"}
            alt={studio.name}
            className="w-full h-96 object-cover rounded-2xl shadow-lg border border-neutral-800"
          />
          <h1 className="text-3xl font-bold text-white mt-6">{studio.name}</h1>
          <p className="flex items-center gap-2 text-neutral-400 mt-2">
            <MapPin className="w-4 h-4 text-amber-500" /> {studio.location}
          </p>
          <p className="text-neutral-300 mt-4 leading-relaxed">{studio.description}</p>
          
          <div className="mt-6 flex items-center gap-4 bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
            <DollarSign className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-xs text-neutral-400">Hourly Rate</p>
              <p className="text-xl font-bold text-white">${studio.pricePerHour} / hour</p>
            </div>
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl h-fit">
          <h2 className="text-xl font-bold text-white mb-6">Book This Studio</h2>

          {error && <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg text-sm">{error}</div>}
          {success && <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{success}</div>}

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Select Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-amber-500/10"
            >
              Confirm Booking
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default function StudioDetailsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-neutral-400">Loading...</div>}>
      <StudioDetailsContent />
    </Suspense>
  );
}