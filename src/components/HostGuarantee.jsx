"use client";

import { ShieldCheck, CheckCircle2, Clock } from "lucide-react";

export default function HostGuarantee() {
  const guarantees = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Liability Protection",
      desc: "Comprehensive coverage and verified guest screening to ensure your studio equipment and property remain fully protected.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Verified Profiles",
      desc: "Every host and creative professional goes through identity validation to maintain a trusted peer-to-peer ecosystem.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Host Support",
      desc: "Our dedicated support team is available around the clock to assist with emergency rescheduling, bookings, and inquiries.",
    },
  ];

  return (
    <section className="py-20 bg-neutral-900/50 border-t border-neutral-800/60 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-3">Host Guarantee & Creator Support</h2>
          <p className="text-neutral-400">Built with robust platform assurances for total peace of mind.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guarantees.map((item, idx) => (
            <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}