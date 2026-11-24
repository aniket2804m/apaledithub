import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Cpu, Globe, Rocket, Sparkles } from "lucide-react";
import aiSculptureImg from "../../img/team/ai.png";

export const ModernAbout: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFB800]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Futuristic 3D Illustration / Sculpture */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-6 bg-gradient-to-b from-[#121217] to-[#0A0A0D] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
              {/* Golden Ambient Glow behind image */}
              <div className="absolute inset-0 bg-radial from-[#FFB800]/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Subtle tech grid background */}
              <div className="absolute inset-0 diagonal-grid-pattern opacity-20 pointer-events-none" />

              {/* 3D Sculpture Image */}
              <img
                src={aiSculptureImg}
                alt="Futuristic AI Sculpture"
                className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_15px_35px_rgba(255,184,0,0.25)]"
              />

              {/* Floating Tech Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#08080A]/90 border border-white/10 backdrop-blur-xl z-20 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#FFB800] font-semibold">
                    Proprietary Stack
                  </div>
                  <div className="text-white font-bold text-sm mt-0.5">
                    Neural Brand Synthesis
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-[#FFB800]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative, Feature Highlights, CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              About Us
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Future-Led <span className="text-[#FFB800]">Digital Experiences</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              We build innovative brands through high-impact branding, performance marketing, intelligent AI workflows, and complete digital transformation. Our mission is to elevate companies beyond standard conventions into undeniable market leaders.
            </p>

            {/* Three Numbered Pillars */}
            <div className="mt-8 space-y-4 w-full">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D0D11] border border-white/6 hover:border-[#FFB800]/30 transition-all duration-300 flex items-start gap-4 group">
                <span className="text-xl sm:text-2xl font-black text-[#FFB800] tracking-tighter shrink-0 pt-0.5">
                  01
                </span>
                <div>
                  <h4 className="text-white font-bold text-base sm:text-lg group-hover:text-[#FFB800] transition-colors">
                    Brand Strategy & Visionary Creative
                  </h4>
                  <p className="text-sm text-[#71717A] mt-1 leading-relaxed">
                    Crafting unmistakable identities, narrative positioning, and premium visual assets that command customer trust.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D0D11] border border-white/6 hover:border-[#FFB800]/30 transition-all duration-300 flex items-start gap-4 group">
                <span className="text-xl sm:text-2xl font-black text-[#FFB800] tracking-tighter shrink-0 pt-0.5">
                  02
                </span>
                <div>
                  <h4 className="text-white font-bold text-base sm:text-lg group-hover:text-[#FFB800] transition-colors">
                    AI Automation & Workflow Intelligence
                  </h4>
                  <p className="text-sm text-[#71717A] mt-1 leading-relaxed">
                    Deploying generative creative models, predictive customer targeting, and autonomous workflows that save hundreds of hours.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D0D11] border border-white/6 hover:border-[#FFB800]/30 transition-all duration-300 flex items-start gap-4 group">
                <span className="text-xl sm:text-2xl font-black text-[#FFB800] tracking-tighter shrink-0 pt-0.5">
                  03
                </span>
                <div>
                  <h4 className="text-white font-bold text-base sm:text-lg group-hover:text-[#FFB800] transition-colors">
                    Performance Marketing & Digital Scale
                  </h4>
                  <p className="text-sm text-[#71717A] mt-1 leading-relaxed">
                    Engineered media buying, algorithmic optimization, and conversion-first funnels delivering measurable revenue growth.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Link */}
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#121216] border border-[#FFB800]/40 text-[#FFB800] font-semibold text-sm hover:bg-[#FFB800] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,184,0,0.15)] group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
