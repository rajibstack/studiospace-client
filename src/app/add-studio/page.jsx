"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle, Building, MapPin, DollarSign, Image as ImageIcon, FileText, CheckCircle2 } from "lucide-react";

export default function AddStudioPage() {
  const router = useRouter();
  const { token, user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pricePerHour: "",
    image: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      router.push("/login");
      return;
    }

    if (!formData.name || !formData.location || !formData.pricePerHour || !formData.description) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/studios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add studio.");
      }

      setSuccess("Studio added successfully!");
      setTimeout(() => {
        router.push("/studios");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-amber-500" /> Add New Studio Listing
          </h1>
          <p className="text-neutral-400 text-sm mt-1">List your creative space or recording suite for creators to book.</p>
        </div>

        {error && <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-sm">{error}</div>}
        {success && <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Studio Name</label>
            <div className="relative">
              <Building className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Apex Sound Lab"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Price Per Hour ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  placeholder="e.g. 45"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your studio facilities, equipment, and environment..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-amber-500 text-sm resize-none"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-amber-500/10 disabled:opacity-50"
          >
            {loading ? "Publishing Studio..." : "Publish Studio"}
          </button>
        </form>
      </div>
    </div>
  );
}