"use client";

import { useState, useEffect } from "react";
import { MapPin, DollarSign, Star } from "lucide-react";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    fetch(`${apiUrl}/api/studios/featured`)
      .then((res) => res.json())
      .then((data) => {
        // ডেটা যদি সরাসরি অ্যারে না হয়ে অবজেক্টের ভেতর থাকে, তবে ডেটা প্রপার্টি অনুযায়ী সেট করুন
        if (Array.isArray(data)) {
          setStudios(data);
        } else if (data.success && Array.isArray(data.data)) {
          setStudios(data.data);
        } else {
          setStudios([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch featured studios:", err);
        setStudios([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-16 text-neutral-400">Loading featured studios...</div>;
  }

  // যদি studios অ্যারে না হয় বা খালি থাকে, তবে ক্র্যাশ না করে নিরাপদে রিটার্ন করবে
  if (!Array.isArray(studios) || studios.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div
            key={studio._id || Math.random()}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col hover:border-amber-500/50 transition-colors"
          >
            <div className="relative h-48 w-full">
              <img
                src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop&q=80"}
                alt={studio.title || "Studio"}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-neutral-800 uppercase">
                {studio.category || "Studio"}
              </div>
              <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-neutral-800 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {studio.rating || "4.9"}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{studio.title}</h3>
                <p className="text-xs text-neutral-400 flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {studio.location || "Location not specified"}
                </p>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-amber-400 font-bold flex items-center">
                    <DollarSign className="w-4 h-4" />
                    {studio.price || "0"} / hr
                  </span>
                </div>
              </div>

              <a
                href={`/studios/${studio._id}`}
                className="w-full text-center py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl text-sm transition-colors"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}