"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.displayName || user?.name || "");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 1024 * 1024) {
      setError("File size must be less than 1MB");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (file) {
        formData.append("photo", file);
      }

      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        credentials: "include",
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profile updated successfully!");
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white mb-6">User Profile</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Profile Photo (Max 1MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}