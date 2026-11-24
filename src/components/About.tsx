import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Layers,
  Award,
  TrendingUp,
} from "lucide-react";

import aaplaLogo from "../img/logo_white.png";
import { ScrollReveal } from "./ScrollProgress";
import { services } from "../components/data/about";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-[#050505] text-[#FAFAFA] overflow-hidden font-montserrat min-h-screen selection:bg-[#FFB800] selection:text-black pt-16"
    >
      {/* 1. HERO SECTION */}
      <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-24 relative overflow-hidden">
        {/* Subtle diagonal grid pattern */}
        <div className="absolute inset-0 diagonal-grid-pattern opacity-25 pointer-events-none" />

        {/* Ambient golden glow behind hero */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#FFB800]/8 rounded-full blur-[170px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <ScrollReveal variant="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#121217] border border-[#FFB800]/40 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(255,184,0,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-ping" />
              <span className="font-montserrat uppercase tracking-[0.25em] text-[#FFB800] text-xs sm:text-sm font-bold">
                About AaplaEditHub
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-down" delay={0.2}>
            <h1 className="mt-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cormorant font-light leading-[1.08] text-white">
              Some Brands Are Seen
              <br />
              <span className="italic font-semibold text-white/90">
                Great Brands Are{" "}
                <span className="text-[#FFB800] drop-shadow-[0_0_35px_rgba(255,184,0,0.45)]">
                  Remembered
                </span>
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.35}>
            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl mt-8 bg-[#0C0C10]/80 border border-white/8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <p className="text-[#9CA3AF] leading-relaxed font-montserrat text-base sm:text-lg">
                We help ambitious businesses build brands people trust, remember, and choose. Through high-impact video editing, visual storytelling, and intelligent performance marketing, we turn visionary ideas into enduring market leaders.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/card")}
              className="bg-[#FFB800] hover:bg-[#FFC400] text-black px-9 py-4 font-montserrat font-bold tracking-wider uppercase rounded-full transition-all duration-300 text-xs sm:text-sm shadow-[0_0_25px_rgba(255,184,0,0.4)] hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="bg-[#121217] hover:bg-[#1A1A22] text-white border border-white/10 hover:border-[#FFB800]/40 px-8 py-4 font-montserrat font-semibold tracking-wider uppercase rounded-full transition-all duration-300 text-xs sm:text-sm"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>
      </div>

      {/* 2. OUR STORY SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 border-t border-white/5 relative">
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[300px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">
          <ScrollReveal variant="fade-right" delay={0.15}>
            <div className="sticky top-28">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14141C] border border-[#FFB800]/30 text-xs font-bold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_12px_rgba(255,184,0,0.15)]">
                Our Philosophy
              </div>
              <h2 className="text-white text-4xl sm:text-5xl md:text-7xl font-cormorant font-bold leading-none tracking-tight">
                OUR<br />
                <span className="text-[#FFB800]">STORY</span>
              </h2>
              <div className="w-20 h-1 bg-[#FFB800] rounded-full mt-6 shadow-[0_0_10px_#FFB800]" />

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                  <ShieldCheck className="w-5 h-5 text-[#FFB800]" />
                  <span>Founded on Uncompromising Craftsmanship</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                  <Zap className="w-5 h-5 text-[#FFB800]" />
                  <span>Powered by Intelligent Machine Workflows</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                  <Target className="w-5 h-5 text-[#FFB800]" />
                  <span>Obsessed with Compound Commercial Return</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={0.2}>
            <div className="space-y-6 text-[#9CA3AF] text-base sm:text-lg leading-relaxed font-montserrat">
              <p className="text-xl md:text-2xl font-bold text-white tracking-wide">
                Look around.
              </p>

              <div className="p-6 sm:p-8 rounded-3xl space-y-4 bg-[#0C0C10] border border-white/8 shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
                <p>
                  Every second, thousands of pieces of content flood our screens. Thousands of voices compete for attention. Yet only a rare few leave an indelible mark on culture and commerce.
                </p>
                <p className="text-white font-medium border-l-4 border-[#FFB800] pl-4 italic text-base sm:text-lg">
                  “The brands that win aren't necessarily the loudest. They are the clearest, the bravest, and the most consistent.”
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl space-y-4 bg-[#0C0C10] border border-white/8 shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
                <p>
                  Enduring brands don't emerge from a single lucky campaign or a viral fluke. They are crafted through deliberate strategy, disciplined execution, and compelling visual identity.
                </p>
                <p>
                  At <span className="text-[#FFB800] font-bold">AaplaEditHub</span>, we uncover the authentic gravity hidden inside your business, giving it the voice, visual excellence, and velocity to command authority.
                </p>
              </div>

              {showMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 pt-2"
                >
                  <div className="p-6 sm:p-8 rounded-3xl space-y-4 bg-[#0C0C10] border border-white/8 shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
                    <p>
                      Whether crafting cinematic reels, executing high-converting ad creatives, or building full-scale digital brand platforms, we focus squarely on business outcomes and sustainable growth.
                    </p>
                    <p className="text-[#FFB800] font-semibold">
                      Because marketing should do far more than look good — it should propel your business forward.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Read More Button */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-6 bg-[#14141C] hover:bg-[#FFB800] hover:text-black text-white px-8 py-3.5 font-montserrat font-bold tracking-wider uppercase rounded-full transition-all duration-300 text-xs border border-white/10 hover:border-[#FFB800] shadow-sm hover:shadow-[0_0_20px_rgba(255,184,0,0.3)]"
              >
                {showMore ? "Read Less" : "Read Full Story"}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* 3. STUDIO LEADERSHIP & VISION SECTION (REPLACED FOUNDER IMAGE WITH AAPLAEDITHUB LOGO) */}
      <section className="relative py-24 md:py-36 bg-[#07070A] overflow-hidden border-t border-white/5">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFB800]/8 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT: AAPLAEDITHUB 3D LOGO SHOWCASE CARD (NO FOUNDER PHOTO) */}
            <ScrollReveal variant="fade-right" delay={0.15} className="lg:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative group w-full max-w-[420px]"
              >
                {/* Glowing border aura */}
                <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-br from-[#FFB800] via-[#FF9900] to-[#E5A600] blur-xl opacity-40 group-hover:opacity-75 transition duration-500" />

                {/* Card Container */}
                <div className="relative border border-white/10 p-8 sm:p-10 rounded-[32px] bg-gradient-to-b from-[#13131A] via-[#0E0E14] to-[#07070A] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col items-center justify-center min-h-[440px]">
                  {/* Subtle diagonal background grid */}
                  <div className="absolute inset-0 diagonal-grid-pattern opacity-30 pointer-events-none" />

                  {/* Golden radial spotlight */}
                  <div className="absolute w-56 h-56 rounded-full bg-[#FFB800]/20 blur-[70px] pointer-events-none animate-pulse" />

                  {/* AaplaEditHub Brand Logo Showcase */}
                  <div className="relative z-10 p-6 rounded-2xl bg-[#09090D]/90 border border-[#FFB800]/30 shadow-[0_0_30px_rgba(255,184,0,0.25)] flex items-center justify-center group-hover:border-[#FFB800] transition-colors duration-500">
                    <img
                      src={aaplaLogo}
                      alt="AaplaEditHub Studio Logo"
                      className="w-56 sm:w-64 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,184,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Studio Badge */}
                  <div className="mt-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A24] border border-[#FFB800]/40 text-xs font-extrabold text-[#FFB800] tracking-widest uppercase shadow-[0_0_15px_rgba(255,184,0,0.2)]">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                      Creative & AI Studio
                    </div>
                    <p className="text-xs text-[#71717A] mt-2 font-medium">
                      Est. Pune • Operating Globally
                    </p>
                  </div>

                  {/* Bottom Stats Pills */}
                  <div className="mt-6 pt-6 border-t border-white/8 grid grid-cols-2 gap-4 w-full text-center relative z-10">
                    <div className="p-3 rounded-xl bg-[#0F0F14] border border-white/5">
                      <div className="text-xl font-bold text-white">150+</div>
                      <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">Brands Grown</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0F0F14] border border-white/5">
                      <div className="text-xl font-bold text-[#FFB800]">4.4M+</div>
                      <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">Viral Views</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* RIGHT: STUDIO VISION & MANIFESTO (REMOVED RUSHIKESH HANDE) */}
            <ScrollReveal variant="fade-left" delay={0.2} className="lg:col-span-7">
              <div>
                <span className="inline-block font-montserrat font-bold uppercase tracking-[0.25em] text-[#FFB800] text-xs bg-[#14141C] border border-[#FFB800]/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(255,184,0,0.15)]">
                  Leadership &amp; Collective Vision
                </span>

                <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-cormorant font-light leading-tight text-white">
                  The Vision Behind <br />
                  <span className="font-bold text-[#FFB800] drop-shadow-[0_0_30px_rgba(255,184,0,0.35)]">
                    AaplaEditHub
                  </span>
                </h2>

                <div className="w-20 h-1 bg-[#FFB800] rounded-full my-6 shadow-[0_0_10px_#FFB800]" />

                <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-white tracking-wide">
                  A High-Performance Collective Engineered For Market Dominance
                </h3>

                <div className="p-6 sm:p-8 rounded-3xl mt-6 space-y-4 bg-[#0C0C10] border border-white/8 shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
                  <p className="text-[#9CA3AF] leading-relaxed font-montserrat text-base sm:text-lg">
                    At <span className="text-white font-bold">AaplaEditHub</span>, we believe that lasting business growth is never accidental. Behind every category-defining brand is an integrated system of <span className="text-white font-semibold">deliberate strategy</span>, <span className="text-[#FFB800] font-semibold">creative bravery</span>, and <span className="text-white font-semibold">flawless execution</span>.
                  </p>

                  <p className="text-[#9CA3AF] leading-relaxed font-montserrat text-base sm:text-lg">
                    Our team unites seasoned brand architects, visual storytellers, full-stack engineers, and machine intelligence specialists under one roof. We reject commodity templates in favor of bespoke narrative positioning and algorithmic media scaling that delivers undeniable commercial velocity.
                  </p>
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-[#0E0E14] border-l-4 border-[#FFB800] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                  <p className="font-cormorant italic text-xl sm:text-2xl text-white leading-relaxed">
                    “Vision charts the trajectory. Consistent creative discipline and artificial intelligence make it unstoppable.”
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FFB800] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#FFC400] transition-all duration-300 shadow-[0_0_20px_rgba(255,184,0,0.4)]"
                  >
                    <span>Partner With Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate("/work")}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#121217] text-white font-semibold text-xs uppercase tracking-wider border border-white/10 hover:border-[#FFB800]/40 transition-colors"
                  >
                    <span>View Our Work</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. STATEMENT BANNER */}
      <div className="py-20 md:py-28 px-4 sm:px-6 my-12 max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#111116] via-[#161620] to-[#111116] text-white text-center relative overflow-hidden border border-[#FFB800]/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
        <div className="absolute inset-0 diagonal-grid-pattern opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <ScrollReveal variant="fade-up" delay={0.15}>
            <h2 className="font-cormorant text-2xl sm:text-4xl md:text-5xl lg:text-6xl max-w-5xl mx-auto leading-tight font-light">
              CREATIVITY WITHOUT PURPOSE IS NOISE
              <br className="hidden sm:inline" />
              <span className="text-[#FFB800] font-semibold drop-shadow-[0_0_25px_rgba(255,184,0,0.4)]">
                {" "}STRATEGY WITHOUT EXECUTION IS THEORY
              </span>
            </h2>

            <p className="mt-6 text-[#9CA3AF] text-sm sm:text-base md:text-lg font-montserrat max-w-xl mx-auto">
              Great brands are forged where bold vision, cinematic storytelling, and autonomous machine intelligence converge.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* 5. SERVICES MARQUEE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 border-t border-white/5 overflow-hidden">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFB800]">What We Excel At</span>
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
            End-To-End Creative Solutions
          </h3>
        </div>

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 26,
            ease: "linear",
          }}
        >
          {[...services, ...services].map((service, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[340px] p-6 sm:p-8 rounded-3xl bg-[#0C0C10] border border-white/8 hover:border-[#FFB800]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.1)] shrink-0 flex flex-col justify-between"
            >
              <div>
                <span className="text-[#FFB800] text-3xl font-extrabold">
                  {service.number}
                </span>

                <h4 className="mt-4 font-bold text-lg text-white">
                  {service.title}
                </h4>

                <p className="mt-3 text-sm text-[#8E8E93] leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#A1A1AA]">
                <span>AaplaEditHub Standard</span>
                <span className="text-[#FFB800]">✦</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 6. FINAL CTA SECTION */}
      <div className="relative py-20 md:py-32 px-4 sm:px-6 text-center bg-[#07070A] border-t border-white/5">
        <div className="max-w-4xl mx-auto font-montserrat">
          <ScrollReveal variant="flip-up" delay={0.15}>
            <h2 className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light italic text-white leading-tight">
              "STOP CHASING THE MARKET.
              <br />
              <span className="text-[#FFB800] font-bold not-italic">
                BECOME THE STANDARD"
              </span>
            </h2>

            <p className="mt-6 text-[#9CA3AF] max-w-xl mx-auto font-montserrat text-sm sm:text-base md:text-lg">
              The future belongs to brands brave enough to craft something truly unforgettable.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 35px rgba(255, 184, 0, 0.6)",
              }}
              onClick={() => navigate("/contact")}
              className="mt-10 bg-[#FFB800] hover:bg-[#FFC400] text-black px-9 py-4 font-montserrat font-bold tracking-wider uppercase rounded-full transition-all duration-300 text-xs sm:text-sm shadow-[0_0_25px_rgba(255,184,0,0.4)]"
            >
              Start Your Brand Journey ↗
            </motion.button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
