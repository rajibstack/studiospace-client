"use client";

export default function AboutUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-amber-500">About StudioSpace</h1>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Empowering creators, artists, and producers with seamless access to world-class creative production spaces.
        </p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-neutral-300 leading-relaxed mb-4 text-sm sm:text-base">
            StudioSpace is a peer-to-peer marketplace designed to bridge the gap between studio owners and creative talent. Whether you need a high-end music recording suite, a photography studio, or a professional podcast room, we make booking transparent, fast, and reliable.
          </p>
          <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
            We believe that every creator deserves access to top-tier equipment and inspiring environments without hassle.
          </p>
        </div>

        <div className="h-[300px] rounded-xl overflow-hidden border border-neutral-800">
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"
            alt="Studio Space"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}