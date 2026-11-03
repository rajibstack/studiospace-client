"use client";

export default function HowItWorks() {
  const steps = [
    { step: "01", title: "Discover Spaces", desc: "Browse through curated photography cyc walls, sound stages, and podcast rooms." },
    { step: "02", title: "Select Shoot Hours", desc: "Choose your preferred date, check dynamic availability, and specify hours." },
    { step: "03", title: "Book Instantly", desc: "Secure your slot with transparent pricing and instant reservation confirmation." },
    { step: "04", title: "Create & Produce", desc: "Arrive at the studio and bring your creative vision to life seamlessly." },
  ];

  return (
    <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-3">How Booking Works</h2>
        <p className="text-neutral-400">Secure your dream production workspace in 4 simple steps.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((item, idx) => (
          <div key={idx} className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 relative">
            <span className="text-4xl font-extrabold text-amber-500/20 mb-4 block">{item.step}</span>
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}