import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { MovingBlocksBackground } from "./MovingBlocksBackground";
import { Hero3DVisual } from "./Hero3DVisual";

export const ModernHero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#050505] pt-28 pb-20 px-6 sm:px-8">
      {/* 3D Moving Blocks Background with Diagonal Geometric Grid */}
      <MovingBlocksBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline, Subheading, CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Futuristic Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D0D12]/90 border border-[#FFB800]/40 backdrop-blur-xl text-xs sm:text-sm font-semibold text-[#FFB800] uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(255,184,0,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-[#FFB800] animate-spin-slow" />
            <span>Beyond Branding. Beyond AI.</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Beyond Branding.
            <br />
            Beyond AI.
            <br />
            <span className="text-[#FFB800] drop-shadow-[0_0_35px_rgba(255,184,0,0.45)]">
              We Build Growth.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-2xl leading-relaxed font-normal">
            We transform ambitious businesses through powerful branding, creative strategies and intelligent AI solutions.
          </p>

          {/* Two CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary CTA: Get Started */}
            <Link
              to="/contact"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FFB800] hover:bg-[#FFC400] text-black font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(255,184,0,0.45)] hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] hover:-translate-y-0.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA: Explore Services */}
            <Link
              to="/card"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#121217]/90 hover:bg-[#181820] text-white font-medium text-sm sm:text-base border border-white/10 hover:border-[#FFB800]/50 tracking-wide transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            >
              <span>Explore Services</span>
              <ChevronRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#FFB800] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          {/* Quick Metrics Banner */}
          <div className="mt-12 pt-8 border-t border-white/8 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">150+</div>
              <div className="text-xs text-[#71717A] uppercase tracking-wider mt-0.5">Brands Scaled</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FFB800]">3.8×</div>
              <div className="text-xs text-[#71717A] uppercase tracking-wider mt-0.5">Avg. ROAS</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4.4M+</div>
              <div className="text-xs text-[#71717A] uppercase tracking-wider mt-0.5">Viral Views</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Abstract Futuristic 3D Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <Hero3DVisual />
        </motion.div>
      </div>
    </section>
  );
};
