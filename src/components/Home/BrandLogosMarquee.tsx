import React from "react";
import logoWhite from "../../img/logo_white.png";

const PARTNER_LOGOS = [
  { name: "Bushare Ventures", tag: "Mobility & SaaS" },
  { name: "Pune Voices", tag: "Media Network" },
  { name: "Dr. Auto Workshop", tag: "Automotive" },
  { name: "Cosmic Ganges", tag: "Luxury Hospitality" },
  { name: "Hotel Wada", tag: "Food & Beverage" },
  { name: "Vaichal Vastu", tag: "Architecture" },
  { name: "Aura Aesthetics", tag: "D2C Wellness" },
  { name: "OmniScale AI", tag: "Enterprise Tech" },
  { name: "Delight Events", tag: "Live Experiences" },
  { name: "Vibe Media Group", tag: "Entertainment" },
  { name: "Apex Global", tag: "Fintech" },
  { name: "Elevate Real Estate", tag: "Luxury Realty" },
];

export const BrandLogosMarquee: React.FC = () => {
  return (
    <section className="relative py-20 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        <div className="text-xs uppercase tracking-widest text-[#71717A] font-semibold mb-10">
          Powering Ambitious Brands Across 25+ Industries
        </div>

        {/* 2-row Grid of Brand Logo Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {PARTNER_LOGOS.map((brand, idx) => (
            <div
              key={idx}
              className="group p-5 rounded-2xl bg-[#0A0A0E] border border-white/8 hover:border-[#FFB800]/40 flex flex-col items-center justify-center min-h-[90px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(255,184,0,0.1)]"
            >
              <div className="text-sm font-bold text-white/90 group-hover:text-[#FFB800] transition-colors tracking-wide text-center">
                {brand.name}
              </div>
              <div className="text-[10px] text-[#71717A] mt-1 font-medium uppercase tracking-wider">
                {brand.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
