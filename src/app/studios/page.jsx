"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import StudioCard from "@/components/StudioCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function StudioCardSkeleton() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl animate-pulse flex flex-col justify-between">
      <div>
        <div className="w-full h-56 bg-neutral-800" />
        <div className="p-6 space-y-3">
          <div className="w-3/4 h-6 bg-neutral-800 rounded-md" />
          <div className="w-1/2 h-4 bg-neutral-800 rounded-md" />
          <div className="space-y-2 pt-2">
            <div className="w-full h-3 bg-neutral-800 rounded-md" />
            <div className="w-4/5 h-3 bg-neutral-800 rounded-md" />
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="w-full h-10 bg-neutral-800 rounded-xl" />
      </div>
    </div>
  );
}

function StudiosSkeletonGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 space-y-2 animate-pulse">
        <div className="w-64 h-8 bg-neutral-800 rounded-lg" />
        <div className="w-96 h-4 bg-neutral-800 rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StudioCardSkeleton />
        <StudioCardSkeleton />
        <StudioCardSkeleton />
        <StudioCardSkeleton />
        <StudioCardSkeleton />
        <StudioCardSkeleton />
      </div>
    </div>
  );
}

function StudioListContent() {
  const { user } = useAuth();
  const [studios, setStudios] = useState([]);
  const [savedStudioIds, setSavedStudioIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchStudios = fetch(`${API_URL}/api/studios`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudios(data);
        } else if (data.studios && Array.isArray(data.studios)) {
          setStudios(data.studios);
        } else if (data.data && Array.isArray(data.data)) {
          setStudios(data.data);
        } else {
          setStudios([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch studios:", err);
        setStudios([]);
      });

    const fetchWishlist = user?.email
      ? fetch(`${API_URL}/api/wishlist/my-ids?email=${user.email}`, {
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

    Promise.all([fetchStudios, fetchWishlist]).finally(() => {
      setLoading(false);
    });
  }, [user]);

  const filteredStudios = selectedCategory
    ? studios.filter((studio) => studio.category === selectedCategory)
    : studios;

  if (loading) {
    return <StudiosSkeletonGrid />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-500">
            {selectedCategory
              ? `${selectedCategory}s`
              : "Explore Creative Studios"}
          </h1>
          <p className="text-neutral-400 mt-2">
            {selectedCategory
              ? `Showing professional spaces for ${selectedCategory}`
              : "Discover and book professional production spaces, recording suites, and photography hubs."}
          </p>
        </div>
        {selectedCategory && (
          <Link
            href="/studios"
            className="text-xs bg-neutral-800 hover:bg-neutral-700 text-amber-400 px-4 py-2 rounded-xl transition-colors border border-neutral-700"
          >
            Clear Filter &times;
          </Link>
        )}
      </div>

      {!Array.isArray(filteredStudios) || filteredStudios.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <p className="text-neutral-400">
            No studios available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudios.map((studio) => (
            <StudioCard
              key={studio._id || studio.id}
              studio={studio}
              isSavedInitially={savedStudioIds.includes((studio._id || studio.id)?.toString())}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExploreStudiosPage() {
  return (
    <Suspense fallback={<StudiosSkeletonGrid />}>
      <StudioListContent />
    </Suspense>
  );
}