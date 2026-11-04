"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import StudioCard from "@/components/StudioCard";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function WishlistPage() {
  const { user } = useAuth();
  const [savedStudios, setSavedStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/wishlist/my-studios?email=${user.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSavedStudios(data);
        } else {
          setSavedStudios([]);
        }
      })
      .catch((err) => console.error("Wishlist fetch error:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleWishlistToggle = (studioId, isSaved) => {
    if (!isSaved) {
      setSavedStudios((prev) => prev.filter((s) => s._id !== studioId));
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-neutral-400">
        Loading your saved studios...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-neutral-400">
        Please login to view your saved wishlist studios.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-500 flex items-center gap-2">
          <Heart className="w-8 h-8 fill-amber-500 text-amber-500" /> Saved Studios
        </h1>
        <p className="text-neutral-400 mt-2">
          Your bookmarked creative spaces and favorite suites.
        </p>
      </div>

      {savedStudios.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl max-w-2xl mx-auto my-10">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-amber-500 mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Saved Studios Yet</h3>
          <p className="text-neutral-400 text-sm max-w-md mb-6">
            Click the heart icon on any studio card to save it here for quick access later.
          </p>
          <Link
            href="/studios"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
          >
            Explore Studios <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedStudios.map((studio) => (
            <StudioCard
              key={studio._id}
              studio={studio}
              isSavedInitially={true}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}