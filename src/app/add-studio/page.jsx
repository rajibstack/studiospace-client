"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddStudioPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Recording Studio",
    price: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    image: "",
    amenities: "",
    overview: "",
  });

  const categories = [
    "Recording Studio",
    "Photography Studio",
    "Dance Studio",
    "Film/Video Stage",
    "Podcast Studio",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        toast.error("Please login first!");
        window.location.href = "/login";
        return;
      }

      const studioPayload = {
        title: formData.title,
        category: formData.category,
        price: Number(formData.price),
        securityDeposit: Number(formData.securityDeposit),
        maxCapacity: Number(formData.maxCapacity),
        location: formData.location,
        image: formData.image,
        amenities: formData.amenities ? formData.amenities.split(",").map((item) => item.trim()) : [],
        overview: formData.overview,
        description: formData.overview,
        ownerName: user?.name || "",
        ownerEmail: user?.email || "",
      };

      const res = await fetch(`${API_URL}/api/studios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioPayload),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add studio");
      }

      toast.success("Studio added successfully!");
      window.location.href = "/my-listings";
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Add New Studio</h1>
          <p className="text-sm text-neutral-400 mb-6">
            List your creative space or recording suite for creators to book.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Read-only Owner Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">Owner Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-300 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">Owner Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-300 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Studio Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Studio Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Studio Title"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rates and Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Hourly Rate ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="60"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Security Deposit ($)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  required
                  placeholder="100"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Max Capacity (Persons)</label>
                <input
                  type="number"
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  required
                  placeholder="6"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Location & Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Location"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Amenities (Comma separated)</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Sound Proof, Vocal Booth, Air Conditioning, Wi-Fi"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Overview / Description */}
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Overview / Description</label>
              <textarea
                name="overview"
                rows="4"
                value={formData.overview}
                onChange={handleChange}
                required
                placeholder="Overview or detailed description of the studio..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Publishing Studio..." : "Publish Studio Listing"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}