"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Camera, Mic, Music, Video, Palette, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import FeaturedStudios from "@/components/FeaturedStudios";
import StudioCategories from "@/components/StudioCategories";
import HowItWorks from "@/components/HowItWorks";
import HostGuarantee from "@/components/HostGuarantee";

function HomeSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 w-full animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative h-[85vh] w-full bg-neutral-900 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
          <div className="w-36 h-7 bg-neutral-800 rounded-full" />
          <div className="w-3/4 sm:w-1/2 h-16 bg-neutral-800 rounded-2xl" />
          <div className="w-full sm:w-96 h-12 bg-neutral-800 rounded-xl" />
          <div className="flex gap-4 pt-4">
            <div className="w-40 h-12 bg-neutral-800 rounded-xl" />
            <div className="w-40 h-12 bg-neutral-800 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Content Skeleton Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
        <div className="w-64 h-8 bg-neutral-900 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="h-36 bg-neutral-900 rounded-2xl border border-neutral-800" />
          <div className="h-36 bg-neutral-900 rounded-2xl border border-neutral-800" />
          <div className="h-36 bg-neutral-900 rounded-2xl border border-neutral-800" />
          <div className="h-36 bg-neutral-900 rounded-2xl border border-neutral-800" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 w-full">
      
      {/* Hero Slider Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect={"fade"}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          <SwiperSlide className="relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&auto=format&fit=crop&q=80')` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
            </div>
            <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                Premier P2P Creative Spaces
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-2xl tracking-tight leading-tight mb-4">
                Discover World-Class <span className="text-amber-500">Production Spaces</span>
              </h1>
              <p className="text-lg text-neutral-300 max-w-xl mb-8">
                Connect with creators, filmmakers, and podcasters. Reserve cyc walls, sound stages, and music suites instantly with transparent hourly pricing.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/studios" className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20">
                  Explore Studios <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/add-studio" className="border border-neutral-700 hover:border-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                  Host Your Space
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&auto=format&fit=crop&q=80')` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
            </div>
            <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                Acoustic Perfection
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-2xl tracking-tight leading-tight mb-4">
                Record & Mix in Professional <span className="text-amber-500">Sound Stages</span>
              </h1>
              <p className="text-lg text-neutral-300 max-w-xl mb-8">
                State-of-the-art recording suites and mixing stages designed for top-tier musicians, podcasters, and sound engineers.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/studios" className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20">
                  Explore Studios <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/add-studio" className="border border-neutral-700 hover:border-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                  Host Your Space
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&auto=format&fit=crop&q=80')` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
            </div>
            <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                Inspiring Atmosphere
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-2xl tracking-tight leading-tight mb-4">
                Unleash Creativity in <span className="text-amber-500">Podcast Lounges</span>
              </h1>
              <p className="text-lg text-neutral-300 max-w-xl mb-8">
                Fully equipped podcast and interview rooms featuring multi-cam setups, broadcast microphones, and cozy lounge aesthetics.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/studios" className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20">
                  Explore Studios <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/add-studio" className="border border-neutral-700 hover:border-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                  Host Your Space
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Main Sections */}
      <StudioCategories />
      <FeaturedStudios />
      <HowItWorks />
      <HostGuarantee />

    </div>
  );
}