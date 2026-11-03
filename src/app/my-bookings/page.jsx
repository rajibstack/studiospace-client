"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import jsPDF from "jspdf";
import {
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  MapPin,
  FolderSearch,
  ArrowRight,
  FileDown,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function SkeletonCard() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl animate-pulse flex flex-col justify-between space-y-4">
      <div className="w-full h-40 bg-neutral-800 rounded-xl" />
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="w-24 h-6 bg-neutral-800 rounded-full" />
          <div className="w-16 h-6 bg-neutral-800 rounded-md" />
        </div>
        <div className="w-3/4 h-6 bg-neutral-800 rounded-md" />
        <div className="w-1/2 h-4 bg-neutral-800 rounded-md" />
      </div>
      <div className="pt-4 border-t border-neutral-800 space-y-2">
        <div className="w-full h-4 bg-neutral-800 rounded-md" />
        <div className="w-2/3 h-4 bg-neutral-800 rounded-md" />
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

function EmptyState({
  title = "No bookings found",
  description = "You haven't scheduled any studio sessions yet. Explore our professional creative spaces and book your first session today.",
  actionLabel = "Explore Studios",
  actionHref = "/studios",
  icon: Icon = FolderSearch,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl max-w-2xl mx-auto my-10">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
        <div className="relative p-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-amber-500 shadow-inner">
          <Icon className="w-8 h-8" />
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      {actionHref && (
        <a
          href={actionHref}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
        >
          {actionLabel} <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = () => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/bookings/my-bookings?email=${user.email}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (data.bookings && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load bookings");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      setBookings(
        bookings.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b))
      );
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  // 📄 jsPDF দিয়ে ইনভয়েস ডাউনলোড করার ফাংশন
  const downloadInvoice = (booking) => {
    try {
      const doc = new jsPDF();
      const studioTitle =
        booking.studio?.name || booking.studioTitle || "Studio Session";
      const amount = booking.totalPrice || booking.totalAmount || "0";

      // Header Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(245, 158, 11); // Amber Color
      doc.text("StudioSpace", 20, 25);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("Creative Workspace Sharing Marketplace", 20, 32);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("BOOKING RECEIPT / INVOICE", 120, 25);

      // Separator Line
      doc.setDrawColor(220, 220, 220);
      doc.line(20, 38, 190, 38);

      // Details Section
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Invoice ID: ${booking._id}`, 20, 50);
      doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 20, 58);
      doc.text(`Customer Email: ${user?.email || "N/A"}`, 20, 66);

      doc.line(20, 74, 190, 74);

      // Table Header
      doc.setFont("helvetica", "bold");
      doc.text("Studio Details", 20, 85);
      doc.text("Booking Info", 120, 85);

      doc.setFont("helvetica", "normal");
      doc.text(`Studio Name: ${studioTitle}`, 20, 95);
      doc.text(`Location: ${booking.location || "Online / Standard"}`, 20, 103);
      doc.text(`Scheduled Date: ${booking.date}`, 120, 95);
      doc.text(`Duration: ${booking.hours || 1} Hours`, 120, 103);
      doc.text(`Status: ${booking.status || "Pending"}`, 120, 111);

      doc.line(20, 120, 190, 120);

      // Pricing Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`Total Amount Paid: $${amount}`, 120, 135);

      // Footer Section
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(
        "Thank you for choosing StudioSpace for your creative projects!",
        20,
        160
      );

      // Trigger Download
      doc.save(`StudioSpace-Invoice-${booking._id.slice(-6)}.pdf`);
      toast.success("Invoice downloaded successfully!");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF invoice");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return {
          bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          icon: Clock3,
          label: "Pending",
        };
      case "Confirmed":
        return {
          bg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
          icon: CheckCircle2,
          label: "Confirmed",
        };
      case "Completed":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          icon: CheckCircle2,
          label: "Completed",
        };
      case "Cancelled":
        return {
          bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          icon: XCircle,
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-neutral-800 border-neutral-700 text-neutral-400",
          icon: AlertCircle,
          label: status || "Pending",
        };
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-500">My Bookings</h1>
          <p className="text-neutral-400 mt-2">
            Manage your scheduled studio sessions and active reservations.
          </p>
        </div>
        <SkeletonGrid />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-neutral-400">
        Please login to view your bookings.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-500">My Bookings</h1>
        <p className="text-neutral-400 mt-2">
          Manage your scheduled studio sessions and active reservations.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <EmptyState
          title="No Active Bookings Yet"
          description="You haven't scheduled any studio sessions yet. Explore our professional creative spaces and book your first session today."
          actionLabel="Explore Studios"
          actionHref="/studios"
          icon={Calendar}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const badge = getStatusBadge(booking.status);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={booking._id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {booking.studioImage && (
                    <img
                      src={booking.studioImage}
                      alt={booking.studioTitle}
                      className="w-full h-40 object-cover rounded-xl mb-4 border border-neutral-800"
                    />
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 border text-xs font-semibold rounded-full flex items-center gap-1 ${badge.bg}`}
                    >
                      <BadgeIcon className="w-3 h-3" /> {badge.label}
                    </span>
                    <span className="text-sm font-bold text-amber-500">
                      ${booking.totalPrice || booking.totalAmount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {booking.studio?.name ||
                      booking.studioTitle ||
                      "Studio Session"}
                  </h3>

                  {booking.location && (
                    <p className="text-neutral-400 text-sm flex items-center gap-1.5 mb-3">
                      <MapPin className="w-4 h-4 text-amber-500" />{" "}
                      {booking.location}
                    </p>
                  )}

                  <div className="space-y-2 mt-4 text-sm text-neutral-300 border-t border-neutral-800 pt-3">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" /> Date:{" "}
                      {booking.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" /> Hours Needed:{" "}
                      {booking.hours || 1} hrs
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => downloadInvoice(booking)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" /> Invoice PDF
                  </button>

                  {booking.status === "Pending" && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" /> Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}