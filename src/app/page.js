"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Camera, Mic, Music, Video, Palette, ShieldCheck, Clock, CheckCircle2, ArrowRight, Star, MapPin } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import FeaturedStudios from "@/components/FeaturedStudios";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { name: "Photo Studios", icon: Camera, count: "42 Spaces", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=80" },
    { name: "Sound Stages", icon: Video, count: "18 Spaces", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80" },
    { name: "Podcast Rooms", icon: Mic, count: "29 Spaces", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80" },
    { name: "Music Suites", icon: Music, count: "35 Spaces", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80" },
    { name: "Art Workshops", icon: Palette, count: "15 Spaces", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80" },
  ];

  const featuredStudios = [
    { id: "1", title: "Cyc Wall Studio Prime", category: "Photo Studios", rate: 120, rating: 4.9, location: "Downtown Manhattan", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=80" },
    { id: "2", title: "Echo Chamber Sound Stage", category: "Sound Stages", rate: 250, rating: 5.0, location: "Brooklyn Arts District", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80" },
    { id: "3", title: "Aura Podcast Lounge", category: "Podcast Rooms", rate: 75, rating: 4.8, location: "SoHo Creative Hub", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80" },
    { id: "4", title: "Harmonic Beats Suite", category: "Music Suites", rate: 150, rating: 4.9, location: "Williamsburg", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80" },
    { id: "5", title: "Canvas & Clay Workshop", category: "Art Workshops", rate: 90, rating: 4.7, location: "Chelsea Arts Loft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80" },
    { id: "6", title: "Cinematic Light Loft", category: "Photo Studios", rate: 180, rating: 4.9, location: "Long Island City", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80" },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 w-full">
      
      <section className="relative h-[85vh] w-full">
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

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Browse by Studio Categories</h2>
          <p className="text-neutral-400">Find the ideal space tailored for your specific creative production needs.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/studios?category=${cat.name}`}
              className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${cat.image})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"></div>
              <div className="relative z-10 p-3 bg-amber-500/10 text-amber-400 rounded-xl mb-4 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="relative z-10 text-white font-semibold mb-1">{cat.name}</h3>
              <p className="relative z-10 text-xs text-neutral-400">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedStudios />

      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-3">How Booking Works</h2>
          <p className="text-neutral-400">Secure your dream production workspace in 4 simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Discover Spaces", desc: "Browse through curated photography cyc walls, sound stages, and podcast rooms." },
            { step: "02", title: "Select Shoot Hours", desc: "Choose your preferred date, check dynamic availability, and specify hours." },
            { step: "03", title: "Book Instantly", desc: "Secure your slot with transparent pricing and instant reservation confirmation." },
            { step: "04", title: "Create & Produce", desc: "Arrive at the studio and bring your creative vision to life seamlessly." },
          ].map((item, idx) => (
            <div key={idx} className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 relative">
              <span className="text-4xl font-extrabold text-amber-500/20 mb-4 block">{item.step}</span>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-neutral-900/50 border-t border-neutral-800/60 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-3">Host Guarantee & Creator Support</h2>
            <p className="text-neutral-400">Built with robust platform assurances for total peace of mind.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Liability Protection</h3>
              <p className="text-sm text-neutral-400">Comprehensive coverage and verified guest screening to ensure your studio equipment and property remain fully protected.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Verified Profiles</h3>
              <p className="text-sm text-neutral-400">Every host and creative professional goes through identity validation to maintain a trusted peer-to-peer ecosystem.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">24/7 Host Support</h3>
              <p className="text-sm text-neutral-400">Our dedicated support team is available around the clock to assist with emergency rescheduling, bookings, and inquiries.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}