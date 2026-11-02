"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/studios")
      .then((res) => res.json())
      .then((data) => {
        // নিশ্চিত হওয়া যে ডাটাটি অ্যারে ফরম্যাটে আসছে কি না
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

  if (loading) {
    return <div className="text-center py-20 text-neutral-400">Loading studios...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Explore Creative Studios</h1>
        <p className="text-neutral-400 mt-2">Discover and book professional production spaces, recording suites, and photography hubs.</p>
      </div>

      {!Array.isArray(studios) || studios.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <p className="text-neutral-400">No studios available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio) => (
            <div key={studio._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"}
                    alt={studio.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-neutral-800">
                    ${studio.pricePerHour} / hr
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{studio.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-neutral-400 mb-3">
                    <MapPin className="w-4 h-4 text-amber-500" /> {studio.location}
                  </p>
                  <p className="text-sm text-neutral-300 line-clamp-2">{studio.description}</p>
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