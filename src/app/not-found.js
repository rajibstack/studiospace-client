import Link from "next/link";
import { Home, Compass, Radio, Disc, Camera } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 py-12">
        
        {/* Creative Studio Illustration Container */}
        <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Ambient Glow Background */}
          <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />

          {/* Outermost Rotating Soundwave / Studio Dial Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-neutral-800 animate-[spin_20s_linear_infinite]" />

          {/* Middle Decorative Ring */}
          <div className="absolute inset-6 rounded-full border border-neutral-800/80 bg-neutral-900/40 backdrop-blur-md flex items-center justify-center" />

          {/* Floating Studio Equipment Badges */}
          <div className="absolute top-4 left-6 p-3 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl animate-bounce [animation-delay:-0.2s]">
            <Camera className="w-5 h-5 text-amber-500" />
          </div>
          <div className="absolute bottom-6 left-8 p-3 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl animate-bounce [animation-delay:-0.4s]">
            <Radio className="w-5 h-5 text-amber-400" />
          </div>
          <div className="absolute top-8 right-8 p-3 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl animate-bounce [animation-delay:-0.6s]">
            <Disc className="w-5 h-5 text-amber-500" />
          </div>

          {/* Center 404 & Studio Mic Badge */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600 tracking-tighter">
              404
            </span>
            <span className="mt-1 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-widest">
              Off Air / Out of Signal
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Oops! Studio Session Not Found
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            The creative space or page you are looking for might have been moved, renamed, or is currently unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" /> Return to Home
          </Link>
          <Link
            href="/studios"
            className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 rounded-xl font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-amber-500" /> Explore Studios
          </Link>
        </div>

      </div>
    </div>
  );
}