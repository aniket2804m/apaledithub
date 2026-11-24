import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award } from "lucide-react";
import teamAiImg from "../../img/role/ai.png";

export const BeyondOrdinary: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[600px] h-[450px] bg-[#FFB800]/8 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3D Golden Sculpture Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-8 bg-gradient-to-b from-[#14141C] via-[#0D0D12] to-[#060608] border border-[#FFB800]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,184,0,0.15)] flex items-center justify-center group overflow-hidden">
              {/* Golden Ambient Aura */}
              <div className="absolute inset-0 bg-radial from-[#FFB800]/25 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Pedestal Reflection */}
              <div className="absolute bottom-6 w-48 h-6 rounded-full bg-[#FFB800]/30 blur-md" />

              {/* Sculpture Render */}
              <img
                src={teamAiImg}
                alt="Golden Abstract 3D Sculpture"
                className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_40px_rgba(255,184,0,0.4)]"
              />

              {/* Floating Certification Badge */}
              <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-[#050505]/85 border border-[#FFB800]/40 backdrop-blur-md text-[11px] font-semibold text-[#FFB800] uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,184,0,0.2)]">
                <Award className="w-3.5 h-3.5 text-[#FFB800]" />
                Proprietary Design
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative, Stat Counters, CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              The Oyemarket Difference
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Where Brands Are <span className="text-[#FFB800]">Beyond The Ordinary</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              Standard marketing produces standard results. We reject mediocrity by fusing world-class artistic craftsmanship with algorithmic machine intelligence. Your brand doesn’t just enter markets—it commands them.
            </p>

            {/* Three Pillar Points */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              <div className="p-5 rounded-2xl bg-[#0D0D11] border border-white/6">
                <div className="text-2xl sm:text-3xl font-black text-[#FFB800]">98.4%</div>
                <div className="text-xs text-[#A1A1AA] mt-1 font-semibold uppercase tracking-wider">
                  Client Retention
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D0D11] border border-white/6">
                <div className="text-2xl sm:text-3xl font-black text-white">3.8×</div>
                <div className="text-xs text-[#A1A1AA] mt-1 font-semibold uppercase tracking-wider">
                  Avg. ROAS Increase
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D0D11] border border-white/6">
                <div className="text-2xl sm:text-3xl font-black text-[#FFB800]">150+</div>
                <div className="text-xs text-[#A1A1AA] mt-1 font-semibold uppercase tracking-wider">
                  Brands Transformed
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFB800] hover:bg-[#FFC400] text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(255,184,0,0.4)] hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] hover:-translate-y-0.5 group"
              >
                <span>Schedule A Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
