"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Building, MapPin, DollarSign, Trash2 } from "lucide-react";

export default function MyListingsPage() {
  const { user, token } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/studios/my-listings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch your listings");
        return res.json();
      })
      .then((data) => {
        const studioData = Array.isArray(data) ? data : data.studios || [];
        setListings(studioData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load your studio listings");
        setLoading(false);
      });
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this studio listing?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/studios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete studio");

      setListings(listings.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-neutral-400">Loading your studio listings...</div>;
  }

  if (!user) {
    return <div className="text-center py-20 text-neutral-400">Please login to view your listings.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Studio Listings</h1>
        <p className="text-neutral-400 mt-2">Manage the studios you have listed on StudioSpace.</p>
      </div>

      {error && <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl">{error}</div>}

      {listings.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <p className="text-neutral-400">You haven't added any studios yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((studio) => (
            <div key={studio._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div>
                <img
                  src={studio.image || studio.coverImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"}
                  alt={studio.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{studio.name}</h3>
                  <p className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
                    <MapPin className="w-4 h-4 text-amber-500" /> {studio.location}
                  </p>
                  <p className="flex items-center gap-2 text-sm font-semibold text-amber-500">
                    <DollarSign className="w-4 h-4" /> ${studio.pricePerHour} / hour
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex justify-end">
                <button
                  onClick={() => handleDelete(studio._id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}