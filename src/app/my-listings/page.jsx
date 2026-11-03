"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { Edit3, Trash2, MapPin, DollarSign, X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function MyListingsPage() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingStudio, setEditingStudio] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  const fetchMyStudios = async () => {
    try {
      // টোকেন বা হেডার পাঠানোর প্রয়োজন নেই, কুকি স্বয়ংক্রিয়ভাবে পাস হবে
      const res = await fetch(`${API_URL}/api/studios/my-listings`, {
        credentials: "include", // <-- কুকি পাঠানোর জন্য জরুরি
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch listings");
      }
      setStudios(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyStudios();
  }, []);

  const handleDelete = async (studioId) => {
    const id = studioId?._id || studioId; // ID অবজেক্ট হলে _id এক্সট্রাক্ট করা
    if (!id) {
      alert("Invalid Studio ID!");
      return;
    }

    if (!confirm("Are you sure you want to delete this studio listing?")) return;

    try {
      const res = await fetch(`${API_URL}/api/studios/${id}`, {
        method: "DELETE",
        credentials: "include", // <-- কুকি পাঠানোর জন্য জরুরি
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete studio");
      }

      setStudios(studios.filter((s) => (s._id?.toString() || s._id) !== id.toString()));
      alert("Studio deleted successfully!");
    } catch (err) {
      alert(err.message || "Failed to delete studio");
    }
  };

  const openEditModal = (studio) => {
    setEditingStudio(studio);
    setEditFormData({
      title: studio.title || "",
      location: studio.location || "",
      price: studio.price || "",
      image: studio.image || "",
      description: studio.description || "",
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const id = editingStudio?._id;
    if (!id) {
      alert("Studio ID not found for updating!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/studios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization হেডার বাদ দেওয়া হয়েছে
        },
        body: JSON.stringify(editFormData),
        credentials: "include", // <-- কুকি পাঠানোর জন্য জরুরি
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update studio");
      }

      alert("Studio updated successfully!");
      setEditingStudio(null);
      fetchMyStudios();
    } catch (err) {
      alert(err.message || "Failed to update studio");
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Studio Listings</h1>
            <p className="text-sm text-neutral-400 mt-1">Manage and update your published creative studios.</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-neutral-400">Loading your listings...</div>
        ) : error ? (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        ) : studios.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800 rounded-2xl bg-neutral-900/50">
            <p className="text-neutral-400 text-base mb-4">You haven't listed any studio spaces yet.</p>
            <a
              href="/add-studio"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl text-sm transition-colors"
            >
              Add Your First Studio
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => {
              const studioId = studio._id;
              return (
                <div
                  key={studioId}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop&q=80"}
                      alt={studio.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-neutral-800 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {studio.price} / hr
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{studio.title}</h3>
                      <p className="text-xs text-neutral-400 flex items-center gap-1.5 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {studio.location}
                      </p>
                      <p className="text-sm text-neutral-400 line-clamp-2 mb-4">{studio.description}</p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
                      <button
                        onClick={() => openEditModal(studio)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-xl transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4 text-amber-500" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(studioId)}
                        className="flex items-center justify-center p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl transition-colors cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Edit Modal */}
        {editingStudio && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingStudio(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-white mb-4">Edit Studio Listing</h2>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Studio Name</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={editFormData.location}
                      onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                      required
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Price Per Hour ($)</label>
                    <input
                      type="number"
                      value={editFormData.price}
                      onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                      required
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editFormData.image}
                    onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingStudio(null)}
                    className="flex-1 py-2.5 border border-neutral-800 rounded-xl text-sm font-medium text-neutral-300 hover:bg-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-xl transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}