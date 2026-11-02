"use client";

import Link from "next/link";
import { Mic, Camera, Flame, Film, Radio } from "lucide-react";

export default function StudioCategories() {
  const categories = [
    {
      name: "Recording Studio",
      count: "35 Spaces",
      icon: Mic,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Photography Studio",
      count: "42 Spaces",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Dance Studio",
      count: "20 Spaces",
      icon: Flame,
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Film/Video Stage",
      count: "18 Spaces",
      icon: Film,
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Podcast Studio",
      count: "29 Spaces",
      icon: Radio,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">Browse by Studio Categories</h2>
        <p className="text-neutral-400">Find the ideal space tailored for your specific creative production needs.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <Link
              key={cat.name}
              href={`/studios?category=${encodeURIComponent(cat.name)}`}
              className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:scale-110 transition-transform duration-500" 
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"></div>
              <div className="relative z-10 p-3 bg-amber-500/10 text-amber-400 rounded-xl mb-4 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="relative z-10 text-white font-semibold mb-1">{cat.name}</h3>
              <p className="relative z-10 text-xs text-neutral-400">{cat.count}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}