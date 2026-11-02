"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudiosPage() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/studios")
      .then((res) => res.json())
      .then((data) => {
        setStudios(data.studios || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Explore Production Spaces</h1>

      {loading ? (
        <p className="text-neutral-400">Loading available spaces...</p>
      ) : studios.length === 0 ? (
        <p className="text-neutral-400">No studios available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <div key={studio._id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
              <img src={studio.image} alt={studio.name} className="w-full h-48 object-cover" />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-white">{studio.name}</h3>
                <p className="text-sm text-neutral-400 mt-1">{studio.location}</p>
                <div className="mt-4 flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
                  <span className="text-indigo-400 font-bold">${studio.pricePerHour} / hr</span>
                  <Link
                    href={`/studios/${studio._id}`}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}