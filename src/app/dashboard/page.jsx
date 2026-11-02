"use use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
        <p className="mt-2 text-gray-600">
          
        </p>
      </div>
    </ProtectedRoute>
  );
}