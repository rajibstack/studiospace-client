"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={user?.photoURL || user?.image || "/default-avatar.png"}
              alt={user?.displayName || user?.name || "User"}
              className="w-20 h-20 rounded-full border-2 border-indigo-500 object-cover"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user?.displayName || user?.name || "Creator"}!
              </h1>
              <p className="text-neutral-400 text-sm mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white">Explore Studios</h3>
            <p className="text-neutral-400 text-sm mt-2">
              Browse available production spaces, recording suites, and photography hubs.
            </p>
            <Link
              href="/studios"
              className="inline-block mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              Browse Spaces &rarr;
            </Link>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white">My Bookings</h3>
            <p className="text-neutral-400 text-sm mt-2">
              Check your reserved studio slots, status, and upcoming sessions.
            </p>
            <Link
              href="/my-bookings"
              className="inline-block mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              View Bookings &rarr;
            </Link>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white">Account Settings</h3>
            <p className="text-neutral-400 text-sm mt-2">
              Update your profile information and avatar image (Max 1MB).
            </p>
            <Link
              href="/profile"
              className="inline-block mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              Manage Profile &rarr;
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}