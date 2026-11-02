"use client";

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-amber-500">How It Works</h1>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Discover how StudioSpace connects creative professionals with world-class production spaces in just a few simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
          <h3 className="text-lg font-bold mb-2">Explore Studios</h3>
          <p className="text-sm text-neutral-400">Browse through a wide variety of professional recording, photography, and film studios tailored to your needs.</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
          <h3 className="text-lg font-bold mb-2">Book Your Slot</h3>
          <p className="text-sm text-neutral-400">Select your preferred date and hours, review pricing details securely, and confirm your booking instantly.</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
          <h3 className="text-lg font-bold mb-2">Create & Produce</h3>
          <p className="text-sm text-neutral-400">Arrive at the fully equipped studio space and bring your creative production projects to life.</p>
        </div>
      </div>
    </div>
  );
}