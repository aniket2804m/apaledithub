import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Code2,
  Megaphone,
  Share2,
  Search,
  Video,
  FileText,
  ShieldCheck,
  Zap,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";

import brandImg from "../../img/card/brand strategy 1.jpg.jpeg";
import performImg from "../../img/card/preformance marketing_.jpg.jpeg";
import webImg from "../../img/card/web devlopment_.jpg.jpeg";
import googleImg from "../../img/card/google ads.jpg.jpeg";
import seoImg from "../../img/card/SEO optimization.jpg.jpeg";
import socialImg from "../../img/card/social media marketing.jpg.jpeg";
import fbImg from "../../img/card/facebook ads.jpg.jpeg";
import linkedinImg from "../../img/card/linkden ads.jpg.jpeg";

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: string;
  number: string;
  title: string;
  category: "all" | "brand" | "marketing" | "tech" | "ai";
  categoryLabel: string;
  image: string;
  short: string;
  description: string;
  deliverables: string[];
  impactMetric: string;
  impactLabel: string;
  route: string;
  accentColor: string;
}

const FULL_SERVICES: ServiceData[] = [
  {
    id: "brand-strategy",
    number: "01",
    title: "Brand Strategy & Visual Architecture",
    category: "brand",
    categoryLabel: "Brand & Identity",
    image: brandImg,
    short: "Build an unmistakable brand identity that commands category trust.",
    description:
      "We forge distinctive market positioning, narrative messaging frameworks, and comprehensive design systems so your enterprise stands out with undeniable authority.",
    deliverables: [
      "Brand DNA, Archetype & Value Proposition",
      "Comprehensive Typography & Color Systems",
      "Brand Guidelines & Pitch Deck Collateral",
      "Competitive Moat & Category Framing",
    ],
    impactMetric: "+340%",
    impactLabel: "Brand Recognition",
    route: "/brand",
    accentColor: "#FFB800",
  },
  {
    id: "performance-marketing",
    number: "02",
    title: "Performance Marketing & Algorithmic Ads",
    category: "marketing",
    categoryLabel: "Growth & Ads",
    image: performImg,
    short: "Convert advertising dollars into predictable, compounding revenue.",
    description:
      "End-to-end media buying across Meta, Google, and LinkedIn engineered with multi-variant algorithmic creative testing to consistently decrease CPA and scale ROAS.",
    deliverables: [
      "Google Search, YouTube & Performance Max",
      "Meta Dynamic Creative Testing (DCT)",
      "High-Converting Funnel Architecture",
      "Advanced Attribution & Churn Analytics",
    ],
    impactMetric: "3.8×",
    impactLabel: "Average Blended ROAS",
    route: "/perform",
    accentColor: "#38BDF8",
  },
  {
    id: "social-media",
    number: "03",
    title: "Social Media Strategy & Community Growth",
    category: "marketing",
    categoryLabel: "Social & Viral",
    image: socialImg,
    short: "Create viral short-form content that captures cultural attention.",
    description:
      "From high-velocity Reels and Shorts to thoughtful LinkedIn discourse, we manage your complete social presence to transform passive scrollers into passionate brand advocates.",
    deliverables: [
      "30-Day High-Impact Content Calendars",
      "Viral Reel & Shorts Scripting & Editing",
      "Community Engagement & DM Lead Nurture",
      "Influencer Partnerships & Collabs",
    ],
    impactMetric: "4.4M+",
    impactLabel: "Organic Reel Views",
    route: "/social",
    accentColor: "#A78BFA",
  },
  {
    id: "website-development",
    number: "04",
    title: "High-Performance Web Design & Engineering",
    category: "tech",
    categoryLabel: "Web & Engineering",
    image: webImg,
    short: "Bespoke digital platforms engineered for blistering speed and conversion.",
    description:
      "We build immersive, ultra-responsive digital experiences with modern React architectures, 3D interactive canvases, and frictionless user flows that maximize checkout velocity.",
    deliverables: [
      "Custom React, Next.js & Tailwind Codebases",
      "Interactive 3D Three.js Visual Elements",
      "Mobile-First Conversion UI/UX Optimization",
      "Sub-Second Page Load Speed (100 Core Vitals)",
    ],
    impactMetric: "+218%",
    impactLabel: "Direct Conversion Rate",
    route: "/web",
    accentColor: "#34D399",
  },
  {
    id: "seo-optimization",
    number: "05",
    title: "Technical SEO & Organic Market Dominance",
    category: "marketing",
    categoryLabel: "Organic Search",
    image: seoImg,
    short: "Capture high-intent buyers looking actively for your solutions.",
    description:
      "Our SEO engineers build authoritative organic moats through technical schema optimization, high-intent keyword clustering, and authoritative backlink acquisition.",
    deliverables: [
      "Comprehensive Technical & Core Web Audit",
      "High-Intent Commercial Keyword Roadmaps",
      "Zero-Click Answer Engine Optimization (AEO)",
      "High-Authority Editorial Backlink Sourcing",
    ],
    impactMetric: "#1",
    impactLabel: "Google Local Rankings",
    route: "/seo",
    accentColor: "#60A5FA",
  },
  {
    id: "google-ads",
    number: "06",
    title: "Google Ads & High-Intent Paid Search",
    category: "marketing",
    categoryLabel: "Search Ads",
    image: googleImg,
    short: "Monopolize search real-estate for your most lucrative services.",
    description:
      "Laser-targeted paid search campaigns built around negative-keyword scrubbing, high-converting dedicated landing pages, and smart bidding algorithms.",
    deliverables: [
      "Search, Display & Remarketing Networks",
      "Hyper-Targeted Negative Keyword Matrices",
      "Custom Landing Page A/B Split Testing",
      "Call-Tracking & Offline Conversion Sync",
    ],
    impactMetric: "-38%",
    impactLabel: "Customer Acquisition Cost",
    route: "/google",
    accentColor: "#FB7185",
  },
  {
    id: "meta-ads",
    number: "07",
    title: "Meta Ads (Facebook & Instagram Growth Engine)",
    category: "marketing",
    categoryLabel: "Paid Social",
    image: fbImg,
    short: "Engage impulse buyers and scale high-ticket e-commerce predictably.",
    description:
      "We produce hundreds of creative hooks, visual angles, and dynamic UGC variations each month to scale Meta ad campaigns without ad fatigue.",
    deliverables: [
      "Dynamic Product Ads & Carousel Systems",
      "Micro-Targeted Retargeting Audiences",
      "High-Converting User Generated Content (UGC)",
      "Omnichannel Pixel & CAPI Server Integration",
    ],
    impactMetric: "4.2×",
    impactLabel: "E-Commerce ROAS",
    route: "/facebook",
    accentColor: "#C084FC",
  },
  {
    id: "linkedin-b2b",
    number: "08",
    title: "B2B Content Strategy & LinkedIn Pipeline",
    category: "brand",
    categoryLabel: "B2B & Enterprise",
    image: linkedinImg,
    short: "Establish executive authority and generate qualified enterprise leads.",
    description:
      "Ghostwriting high-engagement thought leadership, enterprise account-based targeting, and outbound authority assets that turn founders into industry icons.",
    deliverables: [
      "Founder Personal Branding & Ghostwriting",
      "B2B Thought Leadership Carousels & Posts",
      "Account-Based Marketing (ABM) Playbooks",
      "High-Ticket Enterprise Lead Generation",
    ],
    impactMetric: "12.5K+",
    impactLabel: "B2B Inbound Inquiries",
    route: "/linkdin",
    accentColor: "#FBBF24",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Category Audit",
    desc: "We analyze your audience psychology, unit economics, and rival blind spots to locate untapped commercial leverage.",
  },
  {
    number: "02",
    title: "Strategic Blueprint & Creative",
    desc: "Our directors architect your visual positioning, messaging angles, and bespoke multi-channel campaign assets.",
  },
  {
    number: "03",
    title: "Rapid Deployment & Engineering",
    desc: "We build and launch high-converting digital platforms, viral video funnels, and automated machine workflows in fast sprints.",
  },
  {
    number: "04",
    title: "Algorithmic Scale & Optimization",
    desc: "Continuous A/B multivariate testing, budget redistribution, and attribution tracking to compound your ROAS monthly.",
  },
];

const SERVICES_FAQ = [
  {
    q: "Can we hire AaplaEditHub for a single service or full-stack growth?",
    a: "Both. While many clients begin with video creation or performance marketing, our greatest ROI is generated when branding, web engineering, and media buying operate as a unified growth engine.",
  },
  {
    q: "What is your typical turnaround time for new campaigns and websites?",
    a: "Video and ad creative sprints launch within 5–7 business days. Custom high-performance React web platforms and complete brand overhauls typically complete in 4 to 6 weeks.",
  },
  {
    q: "How does your team communicate and report results?",
    a: "You receive a dedicated private Slack channel with direct access to your creative directors and media buyers, accompanied by real-time automated dashboards and weekly strategic syncs.",
  },
  {
    q: "How do your AI solutions integrate with our existing stack?",
    a: "We engineer zero-friction integrations into HubSpot, Salesforce, WhatsApp, Zapier, and ad accounts. Everything operates seamlessly without replacing your core team.",
  },
];

const Card: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredServices =
    activeFilter === "all"
      ? FULL_SERVICES
      : FULL_SERVICES.filter((s) => s.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".stack-card");

      cards.forEach((card: any) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: () => (window.innerWidth < 768 ? "top 80px" : "top 120px"),
            endTrigger: containerRef.current,
            end: "bottom bottom",
            scrub: true,
          },
          scale: 0.94,
          y: () => (window.innerWidth < 768 ? -30 : -60),
          opacity: 0.75,
          transformOrigin: "top center",
          ease: "none",
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div className="bg-[#050505] text-[#FAFAFA] min-h-screen overflow-hidden font-montserrat selection:bg-[#FFB800] selection:text-black pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 overflow-hidden">
        {/* Subtle diagonal grid pattern */}
        <div className="absolute inset-0 diagonal-grid-pattern opacity-25 pointer-events-none" />

        {/* Ambient golden glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FFB800]/8 rounded-full blur-[180px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#121217] border border-[#FFB800]/40 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(255,184,0,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-[#FFB800] animate-spin-slow" />
            <span className="font-montserrat uppercase tracking-[0.25em] text-[#FFB800] text-xs sm:text-sm font-bold">
              Comprehensive Growth Architecture
            </span>
          </motion.div>

          {/* Section Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08]"
          >
            Transforming Visions Into <br />
            <span className="text-[#FFB800] drop-shadow-[0_0_35px_rgba(255,184,0,0.45)]">
              Market Authority
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed"
          >
            Full-spectrum branding, high-conversion web engineering, cinematic video production, and intelligent AI automation designed to scale ambitious enterprises.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 p-4 sm:p-5 rounded-2xl bg-[#0D0D12]/90 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">8+</div>
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">Core Disciplines</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#FFB800]">3.8×</div>
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">Avg. Blended ROAS</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">4.4M+</div>
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">Viral Impressions</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#FFB800]">100%</div>
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">Data-Attributed</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE FILTER TABS */}
      <section className="relative px-6 sm:px-8 mb-16 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
          {[
            { id: "all", label: "All Services" },
            { id: "brand", label: "Branding & Strategy" },
            { id: "marketing", label: "Performance & Ads" },
            { id: "tech", label: "Web & Engineering" },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#FFB800] text-black shadow-[0_0_20px_rgba(255,184,0,0.5)] scale-105"
                    : "bg-[#111116] text-[#A1A1AA] hover:text-white border border-white/8 hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. STACKED 3D GLASS CARDS */}
      <section ref={containerRef} className="relative pb-36 px-4 sm:px-6">
        <div className="relative flex flex-col items-center gap-12 md:gap-16 max-w-6xl mx-auto">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="stack-card sticky w-full top-[100px] md:top-[125px]"
              style={{
                zIndex: index + 1,
              }}
            >
              <div className="group relative bg-[#0C0C10]/95 backdrop-blur-2xl border border-white/10 hover:border-[#FFB800]/50 rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-500">
                {/* Glowing top line with accent color */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 opacity-70 group-hover:opacity-100"
                  style={{ backgroundColor: service.accentColor }}
                />

                <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-center p-6 sm:p-10 md:p-12">
                  {/* Left Side: Content, Deliverables, Metrics */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Top Pill Row */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase border"
                          style={{
                            backgroundColor: `${service.accentColor}18`,
                            color: service.accentColor,
                            borderColor: `${service.accentColor}40`,
                          }}
                        >
                          SERVICE {service.number}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-[#181822] text-[#A1A1AA] text-xs font-semibold uppercase tracking-wider">
                          {service.categoryLabel}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white group-hover:text-[#FFB800] transition-colors leading-tight">
                        {service.title}
                      </h3>

                      {/* Punchline */}
                      <p className="mt-3.5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide" style={{ color: service.accentColor }}>
                        <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: service.accentColor }} />
                        {service.short}
                      </p>

                      {/* Description */}
                      <p className="mt-4 text-[#8E8E93] text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>

                      {/* 4 Deliverables Checklist */}
                      <div className="mt-6 pt-6 border-t border-white/8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.deliverables.map((d, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#A1A1AA]">
                            <CheckCircle2
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: service.accentColor }}
                            />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Row: Metric & CTA Button */}
                    <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#14141C] border border-white/10 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5" style={{ color: service.accentColor }} />
                        </div>
                        <div>
                          <div className="text-lg font-black text-white">{service.impactMetric}</div>
                          <div className="text-[10px] text-[#71717A] uppercase tracking-wider">{service.impactLabel}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(service.route)}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FFB800] text-black font-extrabold text-xs tracking-wider uppercase hover:bg-[#FFC400] transition-all duration-300 shadow-[0_0_20px_rgba(255,184,0,0.35)] hover:shadow-[0_0_30px_rgba(255,184,0,0.6)] hover:scale-105"
                      >
                        <span>Explore Deep Dive</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Side: High-End Visual Mockup */}
                  <div className="lg:col-span-5 relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#161620] border border-white/10 group-hover:border-[#FFB800]/40 transition-colors shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                    />

                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-transparent opacity-60" />

                    {/* Glowing Accent Aura */}
                    <div
                      className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full blur-[70px] opacity-25 pointer-events-none"
                      style={{ backgroundColor: service.accentColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE AAPLAEDITHUB GROWTH FRAMEWORK (4-STEP PROCESS) */}
      <section className="relative py-28 bg-[#07070A] overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB800]/5 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
              <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
              How We Execute
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              The Growth <span className="text-[#FFB800]">Framework</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              Every service is delivered through a proven 4-stage algorithmic execution model designed for speed and compound returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 rounded-3xl bg-[#0B0B0E] border border-white/8 hover:border-[#FFB800]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.1)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-[#FFB800] tracking-tighter">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#8E8E93] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#71717A] font-semibold">
                    Stage {step.number}
                  </span>
                  <span className="text-[#FFB800]">✦</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI INTEGRATION CALLOUT BANNER */}
      <section className="relative py-24 px-6 sm:px-8 border-t border-white/5 bg-[#050505]">
        <div className="max-w-6xl mx-auto rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-r from-[#121217] via-[#181822] to-[#0E0E14] border border-[#FFB800]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,184,0,0.15)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 diagonal-grid-pattern opacity-20 pointer-events-none" />

          <div className="lg:col-span-8 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1F1F2C] border border-[#FFB800]/40 text-xs font-bold text-[#FFB800] uppercase tracking-widest mb-4">
              AI-Augmented Architecture
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Every Service Is Powered By <br />
              <span className="text-[#FFB800] drop-shadow-[0_0_30px_rgba(255,184,0,0.4)]">
                Proprietary AI Pipelines
              </span>
            </h3>

            <p className="mt-4 text-[#9CA3AF] text-sm sm:text-base leading-relaxed max-w-2xl">
              By augmenting creative brilliance with automated testing models, predictive analytics, and autonomous synthesis, we cut production turnaround times by 40% while generating 10x more high-converting asset variations.
            </p>
          </div>

          <div className="lg:col-span-4 relative z-10 flex lg:justify-end">
            <button
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FFB800] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#FFC400] transition-all duration-300 shadow-[0_0_25px_rgba(255,184,0,0.4)] hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] hover:scale-105"
            >
              Consult With Our Team ↗
            </button>
          </div>
        </div>
      </section>

      {/* 6. SERVICES FAQ ACCORDION */}
      <section className="relative py-28 bg-[#07070A] overflow-hidden border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              Engagement FAQ
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Services &amp; Engagement <span className="text-[#FFB800]">FAQ</span>
            </h2>

            <p className="mt-4 text-base text-[#9CA3AF]">
              Everything you need to know about our scope, deliverables, and partnership model.
            </p>
          </div>

          <div className="space-y-4">
            {SERVICES_FAQ.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-[#0C0C10] border-[#FFB800]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.1)]"
                      : "bg-[#09090C] border-white/8 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-none"
                  >
                    <span className={`text-base sm:text-lg font-bold transition-colors ${
                      isOpen ? "text-[#FFB800]" : "text-white"
                    }`}>
                      {faq.q}
                    </span>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#FFB800] text-black border-[#FFB800]"
                        : "bg-[#14141A] text-white/80 border-white/10"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#9CA3AF] leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FINAL SERVICES CTA */}
      <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB800]/8 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#111116] via-[#0C0C10] to-[#07070A] border border-[#FFB800]/30 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(255,184,0,0.15)]"
          >
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready To Elevate Your Brand <br />
              <span className="text-[#FFB800] drop-shadow-[0_0_35px_rgba(255,184,0,0.5)]">
                Beyond The Competition?
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              Let’s design a custom growth roadmap tailored specifically to your category goals and revenue targets.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#FFB800] hover:bg-[#FFC400] text-black font-extrabold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(255,184,0,0.45)] hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] hover:scale-105"
              >
                <span>Book A 15-Min Strategy Call</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={() => navigate("/work")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#16161D] hover:bg-[#20202A] text-white font-semibold text-sm sm:text-base border border-white/10 hover:border-[#FFB800]/40 tracking-wide transition-all duration-300"
              >
                <span>View Case Studies</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Card;
