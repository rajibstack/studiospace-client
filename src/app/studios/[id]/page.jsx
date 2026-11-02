"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { MapPin, DollarSign, Users, Star, ShieldCheck, CheckCircle2, User } from "lucide-react";
import { toast } from "sonner";

function StudioDetailContent() {
  const { id } = useParams();
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingHours, setBookingHours] = useState(1);

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

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate) {
      toast.error("Please select a date for booking!");
      return;
    }
    toast.success("Studio booked successfully!");
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="text-center py-20 text-neutral-400">Loading studio details...</div>;
  }

  if (!studio) {
    return <div className="text-center py-20 text-neutral-400">Studio not found.</div>;
  }

  const hostPhoto = studio.ownerImage || studio.userPhoto || studio.photo || studio.photoURL || studio.user?.photoURL;
  const hostName = studio.ownerName || studio.hostName || studio.name || "Studio Owner";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      {/* Header Info */}
      <div className="mb-6">
        <span className="text-xs font-semibold text-amber-500 uppercase px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
          {studio.category || "Studio"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-2">{studio.title || studio.name}</h1>
        <p className="flex items-center gap-2 text-neutral-400 text-sm">
          <MapPin className="w-4 h-4 text-amber-500" /> {studio.location}
          <span className="mx-2">•</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" /> {studio.rating || "4.9"} (24 reviews)
          </span>
        </p>
      </div>

      {/* Gallery / Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="md:col-span-2 h-[350px] sm:h-[450px] rounded-2xl overflow-hidden border border-neutral-800">
          <img
            src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"}
            alt={studio.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-[350px] sm:h-[450px]">
          <div className="h-full rounded-2xl overflow-hidden border border-neutral-800">
            <img
              src={studio.image2 || studio.image || "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=800&auto=format&fit=crop&q=80"}
              alt="Studio detail 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-full rounded-2xl overflow-hidden border border-neutral-800">
            <img
              src={studio.image3 || studio.image || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80"}
              alt="Studio detail 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content & Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">About This Space</h2>
            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
              {studio.overview || studio.description || "No overview provided."}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Studio Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block text-xs mb-1">Max Capacity</span>
                <span className="font-semibold flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-500" /> {studio.maxCapacity || "10"} Persons
                </span>
              </div>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block text-xs mb-1">Security Deposit</span>
                <span className="font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> ${studio.securityDeposit || "50"}
                </span>
              </div>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block text-xs mb-1">Hourly Rate</span>
                <span className="font-semibold flex items-center gap-1.5 text-amber-400">
                  <DollarSign className="w-4 h-4" /> ${studio.price || studio.pricePerHour} / hr
                </span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {studio.amenities && studio.amenities.length > 0 && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Amenities & Equipment</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {studio.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host Details */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center text-amber-500 font-bold text-xl border border-neutral-700 flex-shrink-0">
              {hostPhoto ? (
                <img
                  src={hostPhoto}
                  alt={hostName}
                  className="w-full h-full object-cover"
                />
              ) : (
                hostName?.[0] || <User className="w-6 h-6" />
              )}
            </div>
            <div>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">Hosted by</span>
              <h3 className="text-lg font-bold text-white">{hostName}</h3>
              <p className="text-xs text-neutral-400">Verified Host</p>
            </div>
          </div>
        </div>

        {/* Booking Sidebar Box */}
        <div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sticky top-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-2xl font-bold text-amber-400">${studio.price || studio.pricePerHour}</span>
                <span className="text-neutral-400 text-sm"> / hour</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-amber-400 bg-neutral-950 px-2.5 py-1 rounded-full border border-neutral-800">
                <Star className="w-3 h-3 fill-amber-400" /> {studio.rating || "4.9"}
              </div>
            </div>

            <div className="space-y-4 mb-6 text-sm text-neutral-300">
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span>Security Deposit</span>
                <span className="font-semibold">${studio.securityDeposit || "50"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span>Max Capacity</span>
                <span className="font-semibold">{studio.maxCapacity || "10"} Guests</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors cursor-pointer text-center block"
            >
              Book This Studio
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4">Book {studio.title || studio.name}</h3>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Select Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Hours Needed</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={bookingHours}
                  onChange={(e) => setBookingHours(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Rate ({bookingHours} hrs)</span>
                  <span>${(studio.price || studio.pricePerHour) * bookingHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Security Deposit</span>
                  <span>${studio.securityDeposit || 50}</span>
                </div>
                <div className="border-t border-neutral-800 pt-2 flex justify-between font-bold text-amber-400">
                  <span>Total Amount</span>
                  <span>${((studio.price || studio.pricePerHour) * bookingHours) + Number(studio.securityDeposit || 50)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-sm font-bold transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudioDetailsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-neutral-400">Loading studio details...</div>}>
      <StudioDetailContent />
    </Suspense>
  );
}