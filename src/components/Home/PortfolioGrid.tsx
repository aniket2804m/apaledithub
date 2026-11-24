import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowUpRight, TrendingUp } from "lucide-react";

// Project visuals from available assets
import brandCardImg from "../../img/card/brand strategy 1.jpg.jpeg";
import webCardImg from "../../img/card/web devlopment_.jpg.jpeg";
import socialCardImg from "../../img/card/social media marketing.jpg.jpeg";
import seoCardImg from "../../img/card/SEO optimization.jpg.jpeg";
import performCardImg from "../../img/card/preformance marketing_.jpg.jpeg";
import fbCardImg from "../../img/card/facebook ads.jpg.jpeg";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  metric: string;
  metricLabel: string;
  image: string;
  link: string;
}

const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: "bushare",
    title: "Bushare — Next-Gen Mobility & Brand Re-Architecture",
    category: "Brand & Video Strategy",
    client: "Bushare Tech",
    metric: "3.4×",
    metricLabel: "Revenue Increase",
    image: brandCardImg,
    link: "/bushare",
  },
  {
    id: "pune-voices",
    title: "Pune Voices — Viral Media Network & Community",
    category: "Media & Growth Engine",
    client: "Pune Voices",
    metric: "81.3K+",
    metricLabel: "Active Followers",
    image: socialCardImg,
    link: "/pune",
  },
  {
    id: "drauto",
    title: "Dr. Auto — Automotive Content Campaign & 4.4M Views",
    category: "Video Production & Reels",
    client: "Dr. Auto Workshop",
    metric: "4.4M+",
    metricLabel: "Organic Views",
    image: performCardImg,
    link: "/work",
  },
  {
    id: "cosmic",
    title: "Cosmic Ganges — Luxury Wellness Web Platform",
    category: "High-Performance Web Design",
    client: "Cosmic Ganges",
    metric: "+218%",
    metricLabel: "Direct Bookings",
    image: webCardImg,
    link: "/web",
  },
  {
    id: "vada",
    title: "Hotel Wada — Hyper-Local Google SEO & Direct Orders",
    category: "SEO & Growth Funnel",
    client: "Hotel Wada",
    metric: "#1",
    metricLabel: "Google Local Rank",
    image: seoCardImg,
    link: "/seo",
  },
  {
    id: "omniscale",
    title: "OmniScale — Autonomous Multi-Channel Ads Engine",
    category: "AI Ads & Media Buying",
    client: "Venture Portfolio",
    metric: "4.2×",
    metricLabel: "Blended ROAS",
    image: fbCardImg,
    link: "/perform",
  },
];

export const PortfolioGrid: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[300px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            Selected Portfolio
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our <span className="text-[#FFB800]">Work</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            A showcase of transformative campaigns, high-converting digital platforms, and market-moving creative engineering.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative rounded-3xl bg-[#0C0C10] border border-white/8 hover:border-[#FFB800]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,184,0,0.15)]"
            >
              {/* Vibrant Golden/Yellow Thumbnail Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#FFB800] via-[#FF9900] to-[#E68A00] p-1">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />

                {/* Golden Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-transparent opacity-80" />

                {/* Top Badge: Category */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#050505]/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white tracking-wider uppercase">
                  {project.category}
                </div>

                {/* Top Right: Metric Pill */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#FFB800] text-black font-extrabold text-xs flex items-center gap-1 shadow-[0_0_15px_rgba(255,184,0,0.6)]">
                  <span>{project.metric}</span>
                  <TrendingUp className="w-3.5 h-3.5 text-black" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-xs text-[#FFB800] font-semibold uppercase tracking-wider mb-2">
                    {project.client}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>

                {/* Bottom Row */}
                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-[#71717A] uppercase tracking-wider">
                    {project.metricLabel}
                  </span>

                  <Link
                    to={project.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#FFB800] transition-colors uppercase tracking-wider"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA Button */}
        <div className="mt-16 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#121217] border border-[#FFB800]/40 text-[#FFB800] hover:bg-[#FFB800] hover:text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_35px_rgba(255,184,0,0.5)]"
          >
            <span>Explore Complete Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
