import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";

export const FinalCta: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FFB800]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle diagonal grid */}
      <div className="absolute inset-0 diagonal-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#111116] via-[#0C0C10] to-[#08080B] border border-[#FFB800]/30 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,184,0,0.15)] overflow-hidden"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181820] border border-[#FFB800]/40 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(255,184,0,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            Let's Build Together
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Start Building Your <br />
            <span className="text-[#FFB800] drop-shadow-[0_0_35px_rgba(255,184,0,0.5)]">
              Brand's Future Today
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            Partner with an elite team that blends visionary creative direction with cutting-edge artificial intelligence. Let’s turn your vision into undeniable category dominance.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#FFB800] hover:bg-[#FFC400] text-black font-extrabold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(255,184,0,0.5)] hover:shadow-[0_0_45px_rgba(255,184,0,0.8)] hover:-translate-y-0.5 group"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#16161D] hover:bg-[#20202A] text-white font-semibold text-sm sm:text-base border border-white/10 hover:border-[#FFB800]/40 tracking-wide transition-all duration-300 backdrop-blur-md"
            >
              <PhoneCall className="w-4 h-4 text-[#FFB800]" />
              <span>Book a 15-Min Intro Call</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
