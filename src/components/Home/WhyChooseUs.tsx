import React from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Cpu,
  Compass,
  TrendingUp,
  Target,
  Headphones,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

interface FeatureCard {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
}

const WHY_CHOOSE_US_DATA: FeatureCard[] = [
  {
    icon: Palette,
    title: "Creative Excellence",
    description:
      "Award-caliber visual design, bespoke brand identities, and immersive video production that command market attention.",
    tag: "Visual Mastery",
  },
  {
    icon: Cpu,
    title: "AI-Powered Innovation",
    description:
      "Harnessing state-of-the-art machine learning models, autonomous creative engines, and predictive analytics for an unfair advantage.",
    tag: "Next-Gen Tech",
  },
  {
    icon: Compass,
    title: "Strategic Thinking",
    description:
      "Every campaign and digital product is anchored in deep audience psychology, competitive category positioning, and verified data.",
    tag: "Data-Backed",
  },
  {
    icon: TrendingUp,
    title: "Digital Growth",
    description:
      "End-to-end customer acquisition and multi-channel expansion funnels designed to scale revenue rapidly and sustainably.",
    tag: "Compound Growth",
  },
  {
    icon: Target,
    title: "Performance Marketing",
    description:
      "Laser-focused ad spend allocation across Meta, Google, and LinkedIn with continuous algorithmic testing for maximum ROAS.",
    tag: "High ROAS",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Direct Slack access to your strategic directors, weekly transparent performance reports, and agile 24/7 campaign optimization.",
    tag: "Always-On",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-[#FFB800]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            Why Partner With Us
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why <span className="text-[#FFB800]">Choose Us</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Crafted for speed, driven by data, and elevated by intelligence. Here is how we engineer category leadership.
          </p>
        </div>

        {/* 6 Dark Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative p-8 rounded-3xl bg-[#0B0B0F] border border-white/8 hover:border-[#FFB800]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(255,184,0,0.12)] flex flex-col justify-between"
              >
                {/* Top: Icon & Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#14141A] border border-white/10 group-hover:border-[#FFB800]/50 flex items-center justify-center transition-colors duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                      <Icon className="w-7 h-7 text-[#FFB800] group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#14141A] border border-white/5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider group-hover:text-[#FFB800] transition-colors">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#8E8E93] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom subtle accent line & arrow */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#52525B] group-hover:text-[#A1A1AA] transition-colors uppercase tracking-wider">
                    Learn Capability
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#52525B] group-hover:text-[#FFB800] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
