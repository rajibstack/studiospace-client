"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Heart, ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Global Toast Event Dispatcher
const showGlobalToast = (message) => {
  let existingContainer = document.getElementById("global-toast-container");
  if (!existingContainer) {
    existingContainer = document.createElement("div");
    existingContainer.id = "global-toast-container";
    existingContainer.className = "fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(existingContainer);
  }

  const toastEl = document.createElement("div");
  toastEl.className = "pointer-events-auto flex items-center gap-3 bg-amber-500 text-black font-semibold px-5 py-3 rounded-xl shadow-2xl transition-all transform translate-y-[-20px] opacity-0 duration-300 border border-amber-400";
  toastEl.innerHTML = `
    <div class="w-5 h-5 rounded-full bg-black text-amber-400 flex items-center justify-center text-xs">✓</div>
    <span>${message}</span>
  `;
  
  existingContainer.appendChild(toastEl);

  setTimeout(() => {
    toastEl.classList.remove("translate-y-[-20px]", "opacity-0");
  }, 10);

  setTimeout(() => {
    toastEl.classList.add("translate-y-[-20px]", "opacity-0");
    setTimeout(() => {
      toastEl.remove();
    }, 300);
  }, 3000);
};

export default function StudioCard({ studio, isSavedInitially = false, onWishlistToggle }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const [loading, setLoading] = useState(false);

  const studioId = studio._id || studio.id;
  const studioTitle = studio.title || studio.name || "Creative Studio";
  const studioPrice = studio.price ?? studio.pricePerHour ?? 0;
  const studioCategory = studio.category || "General Studio";
  const studioImage = studio.image || studio.imageUrl || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80";
  const studioLocation = studio.location || "Location unavailable";
  const studioOverview = studio.overview || studio.description || "Explore professional studio facilities.";

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login to save studios to your wishlist.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/wishlist/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ studioId, email: user.email }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSaved(data.saved);
        
        // 👈 Triggering the exact global toast shown in your screenshot
        const msg = data.saved ? "Added to wishlist successfully!" : "Removed from wishlist successfully!";
        showGlobalToast(msg);

        if (onWishlistToggle) {
          onWishlistToggle(studioId, data.saved);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
      <div>
        <div className="relative h-56 overflow-hidden">
          <img
            src={studioImage}
            alt={studioTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-neutral-800 uppercase">
            {studioCategory}
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className="bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-neutral-800">
              ${studioPrice} / hr
            </div>
            <button
              onClick={handleWishlistClick}
              disabled={loading}
              className="p-2 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-300 hover:text-rose-500 transition-colors cursor-pointer"
              aria-label="Save Studio"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? "fill-rose-500 text-rose-500" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
            {studioTitle}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-neutral-400 mb-3">
            <MapPin className="w-4 h-4 text-amber-500" />
            {studioLocation}
          </p>
          <p className="text-sm text-neutral-300 line-clamp-2">
            {studioOverview}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Link
          href={`/studios/${studioId}`}
          className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-amber-500 hover:text-black text-white font-medium py-2.5 rounded-xl transition-colors"
        >
          View Details & Book <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}