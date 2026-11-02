"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [categories, setCategories] = useState([
    { name: "Photo Studios" },
    { name: "Sound Stages" },
    { name: "Podcast Rooms" },
    { name: "Music Suites" },
    { name: "Art Workshops" },
  ]);

  useEffect(() => {
    // ব্যাকএন্ড থেকে স্টুডিও ডাটা এনে ইউনিক ক্যাটাগরিগুলো ডাইনামিকভাবে লোড করার জন্য
    fetch("http://localhost:5000/api/studios")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // ডুপ্লিকেট ক্যাটাগরি বাদ দিয়ে ইউনিক ক্যাটাগরি ফিল্টার করা
          const uniqueCategories = [...new Set(data.map((studio) => studio.category))]
            .filter(Boolean)
            .map((cat) => ({ name: cat }));

          if (uniqueCategories.length > 0) {
            setCategories(uniqueCategories);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories for footer:", err);
      });
  }, []);

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white tracking-wider">
            <div className="p-2 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-xl text-black">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span>Studio<span className="text-amber-500">Space</span></span>
          </Link>
          <p className="text-sm leading-relaxed text-neutral-400">
            Peer-to-peer marketplace connecting creators with world-class production spaces, recording suites, and workshops.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li><Link href="/studios" className="hover:text-amber-400 transition-colors">Explore Studios</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</Link></li>
            <li><Link href="/#about-us" className="hover:text-amber-400 transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  href={`/studios?category=${encodeURIComponent(cat.name)}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Newsletter</h3>
          <p className="text-sm mb-3">Subscribe to get host updates & studio discount offers.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p>© 2026 StudioSpace Platform. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <svg className="w-4 h-4 fill-current hover:text-white transition-colors cursor-pointer" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}