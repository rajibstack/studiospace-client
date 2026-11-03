"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

// 🎨 Branded Skeleton Loader Component for Studio Cards
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
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    fetch("http://localhost:5000/api/studios")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudios(data);
        } else if (data.studios && Array.isArray(data.studios)) {
          setStudios(data.studios);
        } else {
          setStudios([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch studios:", err);
        setStudios([]);
        setLoading(false);
      });
  }, []);

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
          <h1 className="text-3xl font-bold text-white">
            {selectedCategory ? `${selectedCategory}s` : "Explore Creative Studios"}
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
          <p className="text-neutral-400">No studios available for this category at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudios.map((studio) => (
            <div key={studio._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"}
                    alt={studio.title || studio.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-neutral-800 uppercase">
                    {studio.category || "Studio"}
                  </div>
                  <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-neutral-800">
                    ${studio.price || studio.pricePerHour} / hr
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{studio.title || studio.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-neutral-400 mb-3">
                    <MapPin className="w-4 h-4 text-amber-500" /> {studio.location}
                  </p>
                  <p className="text-sm text-neutral-300 line-clamp-2">{studio.overview || studio.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/studios/${studio._id}`}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-amber-500 hover:text-black text-white font-medium py-2.5 rounded-xl transition-colors"
                >
                  View Details & Book <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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