"use client";

import Link from "next/link";
import { Camera, Sun, Moon, LogOut, LayoutDashboard, PlusCircle, Building, BookmarkCheck, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about-us" },
  ];

  if (!mounted) {
    return <header className="sticky top-0 z-50 w-full h-16 bg-neutral-950/80 border-b border-neutral-800" />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white tracking-wider">
          <div className="p-2 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-xl text-black">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <span>Studio<span className="text-amber-500">Space</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-amber-400 text-neutral-400"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-800 text-neutral-300 hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-300 hover:text-white px-3 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold text-black bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-lg transition-colors shadow-lg shadow-amber-500/10"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                <img
                  src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                  alt={user.name || "User"}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500/50"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 z-50 text-neutral-200">
                  <div className="px-4 py-2 border-b border-neutral-800">
                    <p className="text-sm font-semibold text-white">{user.name || "Creator User"}</p>
                    <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                  </div>
                  
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-amber-500" /> Profile Settings
                  </Link>

                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-500" /> Dashboard
                  </Link>
                  <Link
                    href="/add-studio"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4 text-amber-500" /> Add New Studio
                  </Link>
                  <Link
                    href="/my-listings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors"
                  >
                    <Building className="w-4 h-4 text-amber-500" /> My Studio Listings
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors"
                  >
                    <BookmarkCheck className="w-4 h-4 text-amber-500" /> My Bookings
                  </Link>
                  <div className="border-t border-neutral-800 my-1"></div>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-neutral-800 text-neutral-300 hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-neutral-900 border-b border-neutral-800 shadow-2xl py-4 px-6 z-50 text-neutral-200 flex flex-col gap-2">
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-neutral-800 mb-2">
              <img
                src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                alt={user.name || "User"}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/50"
              />
              <div>
                <p className="text-sm font-semibold text-white">{user.name || "Creator User"}</p>
                <p className="text-xs text-neutral-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-2 px-3 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}

          <div className="border-t border-neutral-800 my-2"></div>

          {user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <User className="w-4 h-4 text-amber-500" /> Profile Settings
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-500" /> Dashboard
              </Link>
              <Link
                href="/add-studio"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-amber-500" /> Add New Studio
              </Link>
              <Link
                href="/my-listings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <Building className="w-4 h-4 text-amber-500" /> My Studio Listings
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 text-sm hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <BookmarkCheck className="w-4 h-4 text-amber-500" /> My Bookings
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 py-2 px-3 text-sm text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors mt-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-neutral-300 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-black bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors shadow-lg shadow-amber-500/10"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}