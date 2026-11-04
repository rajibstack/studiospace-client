"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import StudioCard from "@/components/StudioCard";

export default function FeaturedStudios() {
  const { user } = useAuth();
  const [studios, setStudios] = useState([]);
  const [savedStudioIds, setSavedStudioIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    // 1. Fetch Featured Studios
    const fetchFeatured = fetch(`${apiUrl}/api/studios/featured`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudios(data);
        } else if (data.success && Array.isArray(data.data)) {
          setStudios(data.data);
        } else if (data.studios && Array.isArray(data.studios)) {
          setStudios(data.studios);
        } else {
          setStudios([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch featured studios:", err);
        setStudios([]);
      });

    // 2. Fetch User Wishlist IDs (if logged in)
    const fetchWishlist = user?.email
      ? fetch(`${apiUrl}/api/wishlist/my-ids?email=${user.email}`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((savedIds) => {
            if (Array.isArray(savedIds)) {
              setSavedStudioIds(savedIds);
            }
          })
          .catch((err) => console.error("Failed to fetch wishlist IDs:", err))
      : Promise.resolve();

    Promise.all([fetchFeatured, fetchWishlist]).finally(() => {
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <div className="text-center py-16 text-neutral-400">Loading featured studios...</div>;
  }

  if (!Array.isArray(studios) || studios.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Featured Studios</h2>
          <p className="text-neutral-400 text-sm">Explore our top-rated and newly added creative spaces.</p>
        </div>
        <a
          href="/studios"
          className="hidden sm:inline-flex text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
        >
          View All Studios &rarr;
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.map((studio) => (
          <StudioCard
            key={studio._id || studio.id}
            studio={studio}
            isSavedInitially={savedStudioIds.includes((studio._id || studio.id)?.toString())}
          />
        ))}
      </div>
    </section>
  );
}