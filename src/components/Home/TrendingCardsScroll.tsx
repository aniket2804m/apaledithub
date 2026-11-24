import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, TrendingUp, Sparkles } from "lucide-react";

// Image imports from available team/client photos
import tejasImg from "../../img/role1/tejas (3).png";
import anushkaImg from "../../img/role1/anushka (2).png";
import pratapImg from "../../img/role1/pratap (1).png";
import avinashImg from "../../img/role1/avinash (3).png";
import pallaviImg from "../../img/role1/pallavi.png";
import rushiImg from "../../img/role1/rushi sir.png";
import saurabhImg from "../../img/role1/saurabh sir (2).png";
import rutuImg from "../../img/role1/rutu (2).png";

interface TrendingCardData {
  id: number;
  name: string;
  role: string;
  company: string;
  category: string;
  metric: string;
  metricLabel: string;
  rating: number;
  review: string;
  image: string;
}

const TRENDING_CARDS: TrendingCardData[] = [
  {
    id: 1,
    name: "Dr. Tejas",
    role: "Founder & Lead Surgeon",
    company: "Dr. Auto Workshop",
    category: "Automotive Tech",
    metric: "+4.4M",
    metricLabel: "Reel Impressions",
    rating: 5,
    review: "AaplaEditHub scaled our content engine from zero to millions of organic views. Direct patient inquiries increased 300%.",
    image: tejasImg,
  },
  {
    id: 2,
    name: "Anushka Patil",
    role: "Managing Director",
    company: "Pune Voices Media",
    category: "Media & Broadcasting",
    metric: "81.3K",
    metricLabel: "Active Followers",
    rating: 5,
    review: "Their high-impact brand storytelling and viral editing created a loyal community. True strategic partners.",
    image: anushkaImg,
  },
  {
    id: 3,
    name: "Pratap Shinde",
    role: "Co-Founder & CEO",
    company: "Bushare Ventures",
    category: "Fintech & SaaS",
    metric: "3.8×",
    metricLabel: "ROAS Delivered",
    rating: 5,
    review: "The AI automation pipelines and high-converting creative ads lowered our customer acquisition cost by 45%.",
    image: pratapImg,
  },
  {
    id: 4,
    name: "Pallavi Deshmukh",
    role: "Creative Director",
    company: "Cosmic Ganges",
    category: "Luxury Hospitality",
    metric: "+218%",
    metricLabel: "Direct Bookings",
    rating: 5,
    review: "The aesthetic excellence, 3D brand assets, and web experience they engineered gave us an undeniable competitive edge.",
    image: pallaviImg,
  },
  {
    id: 5,
    name: "Avinash Kulkarni",
    role: "Growth Head",
    company: "Vada Lifestyle",
    category: "Food & Beverage",
    metric: "+180%",
    metricLabel: "Local Footfall",
    rating: 5,
    review: "From Google Maps ranking to viral reels, every single dollar invested in their strategy came back multiplied.",
    image: avinashImg,
  },
  {
    id: 6,
    name: "Saurabh Jadhav",
    role: "Principal Architect",
    company: "Vaichal Vastu",
    category: "Real Estate & Interior",
    metric: "12.5K+",
    metricLabel: "High-Ticket Leads",
    rating: 5,
    review: "Remarkable precision. They treat marketing as an algorithmic science and art simultaneously.",
    image: saurabhImg,
  },
  {
    id: 7,
    name: "Rutuja More",
    role: "Brand Lead",
    company: "Aura Aesthetics",
    category: "D2C Wellness",
    metric: "94.8%",
    metricLabel: "Retention Rate",
    rating: 5,
    review: "Their video production quality rivals top international agencies. Unmatched turnaround speed.",
    image: rutuImg,
  },
  {
    id: 8,
    name: "Rushikesh Hande",
    role: "Venture Partner",
    company: "ScaleX Media",
    category: "Digital Transformation",
    metric: "10X",
    metricLabel: "Ecosystem Growth",
    rating: 5,
    review: "Beyond branding and beyond AI—they build real, compounding commercial enterprise value.",
    image: rushiImg,
  },
];

export const TrendingCardsScroll: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate for seamless infinite loop
  const duplicatedCards = [...TRENDING_CARDS, ...TRENDING_CARDS];

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
          Trending at Oyemarketor
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Trusted By Our <span className="text-[#FFB800]">Customers</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto">
          Real results and verified testimonials from ambitious brand founders, creators, and visionary enterprises.
        </p>
      </div>

      {/* Infinite Horizontal Scrolling Track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right fade masks for premium glass blend */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-6 w-max py-4"
          style={{
            animation: `marqueeScroll 42s linear infinite ${isPaused ? "paused" : "running"}`,
          }}
        >
          {duplicatedCards.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="group relative w-[340px] sm:w-[380px] bg-[#0C0C10] rounded-2xl border border-white/8 hover:border-[#FFB800]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.12)] shrink-0"
            >
              {/* Card Top: Avatar, Name & Category */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFB800]/50 bg-[#16161C] p-0.5 shadow-[0_0_12px_rgba(255,184,0,0.3)]">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-white font-semibold text-base tracking-wide">
                          {card.name}
                        </h4>
                        <CheckCircle className="w-4 h-4 text-[#FFB800] fill-[#FFB800]/20" />
                      </div>
                      <p className="text-xs text-[#9CA3AF]">{card.role}</p>
                      <p className="text-[11px] text-[#FFB800] font-medium">{card.company}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-[#181820] border border-white/5 text-[10px] uppercase font-semibold text-[#A1A1AA] tracking-wider">
                    {card.category}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(card.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FFB800] fill-[#FFB800]" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-white/90">5.0</span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#A1A1AA] leading-relaxed italic line-clamp-3">
                  "{card.review}"
                </p>
              </div>

              {/* Card Bottom: Metric Showcase */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#FFB800]">{card.metric}</span>
                    <TrendingUp className="w-4 h-4 text-[#FFB800]" />
                  </div>
                  <span className="text-[11px] text-[#71717A] uppercase tracking-wider">
                    {card.metricLabel}
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/20 text-[11px] font-semibold text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-colors duration-300">
                  Verified Result
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};
