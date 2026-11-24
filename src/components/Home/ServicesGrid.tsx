import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Code2,
  Megaphone,
  Share2,
  Search,
  PenTool,
  Video,
  Bot,
  FileText,
  TrendingUp,
  Briefcase,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  tag: string;
  description: string;
  deliverables: string[];
  link: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "brand",
    title: "Brand Strategy",
    icon: Layers,
    accentColor: "#FFB800",
    badgeBg: "rgba(255, 184, 0, 0.12)",
    tag: "Core Identity",
    description: "Positioning your business for market authority through bespoke visual guidelines, tone of voice, and brand architecture.",
    deliverables: ["Brand DNA & Value Proposition", "Visual Guidelines & Design Systems", "Competitor Matrix & Archetype"],
    link: "/brand",
  },
  {
    id: "web",
    title: "Website Development",
    icon: Code2,
    accentColor: "#38BDF8",
    badgeBg: "rgba(56, 189, 248, 0.12)",
    tag: "Digital Experience",
    description: "Ultra-fast, high-converting digital platforms engineered with modern frameworks, 3D interactive graphics, and seamless mobile responsiveness.",
    deliverables: ["Headless Next.js & React Architectures", "High-Converting UI/UX Funnels", "Technical Speed & Core Web Vitals"],
    link: "/web",
  },
  {
    id: "digital",
    title: "Digital Marketing",
    icon: Megaphone,
    accentColor: "#34D399",
    badgeBg: "rgba(52, 211, 153, 0.12)",
    tag: "Omnichannel Scale",
    description: "Multi-touchpoint acquisition strategies built to capture audience attention, nurture prospective buyers, and accelerate revenue.",
    deliverables: ["Multi-Channel Paid Campaigns", "Full-Funnel Lead Generation", "Conversion Rate Optimization (CRO)"],
    link: "/perform",
  },
  {
    id: "social",
    title: "Social Media Management",
    icon: Share2,
    accentColor: "#A78BFA",
    badgeBg: "rgba(167, 139, 250, 0.12)",
    tag: "Viral Community",
    description: "Dominating Instagram, LinkedIn, and YouTube with cultural trend analysis, consistent brand storytelling, and active community growth.",
    deliverables: ["Content Calendars & Viral Reels", "Active Community Engagement", "Influencer & Collab Integrations"],
    link: "/social",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    icon: Search,
    accentColor: "#60A5FA",
    badgeBg: "rgba(96, 165, 250, 0.12)",
    tag: "Organic Dominance",
    description: "Capturing high-intent organic search volume to build compounding, zero-cost traffic pipelines that outperform your rivals.",
    deliverables: ["Technical SEO & Schema Audits", "High-Intent Keyword Roadmaps", "Authoritative Backlink Acquisition"],
    link: "/seo",
  },
  {
    id: "graphic",
    title: "Graphic Design",
    icon: PenTool,
    accentColor: "#F472B6",
    badgeBg: "rgba(244, 114, 182, 0.12)",
    tag: "Visual Design",
    description: "Eye-catching advertising creatives, investor decks, billboard visuals, and digital assets that capture attention instantly.",
    deliverables: ["High-CTR Ad Creatives", "Pitch Decks & Marketing Collateral", "Custom Vector & 3D Illustrations"],
    link: "/card",
  },
  {
    id: "video",
    title: "Video Production",
    icon: Video,
    accentColor: "#FB7185",
    badgeBg: "rgba(251, 113, 133, 0.12)",
    tag: "Cinematic Media",
    description: "From viral short-form Reels to cinematic corporate brand films and 3D product commercial animations that drive action.",
    deliverables: ["Viral Short-Form Reels & Shorts", "Cinematic Commercial Brand Films", "High-End Motion Graphics & VFX"],
    link: "/card",
  },
  {
    id: "ai",
    title: "AI Automation",
    icon: Bot,
    accentColor: "#C084FC",
    badgeBg: "rgba(192, 132, 252, 0.12)",
    tag: "Intelligence",
    description: "Automating lead qualification, customer inquiries, creative synthesis, and CRM data sync through customized AI pipelines.",
    deliverables: ["Autonomous AI Chatbots & Voice Agents", "Generative Creative Workflows", "Custom CRM & Zapier Orchestrations"],
    link: "/card",
  },
  {
    id: "content",
    title: "Content Creation",
    icon: FileText,
    accentColor: "#FBBF24",
    badgeBg: "rgba(251, 191, 36, 0.12)",
    tag: "Storytelling",
    description: "Persuasive copywriting, thought leadership articles, newsletter engines, and video scripts crafted for high engagement.",
    deliverables: ["Direct-Response Ad Copy", "Founder Personal Brand Ghostwriting", "Editorial Articles & Video Scripts"],
    link: "/linkdin",
  },
  {
    id: "perform",
    title: "Performance Marketing",
    icon: TrendingUp,
    accentColor: "#2DD4BF",
    badgeBg: "rgba(45, 212, 191, 0.12)",
    tag: "Media Buying",
    description: "Algorithmic ad management on Meta, Google, and LinkedIn engineered to lower CPA and scale your returns predictably.",
    deliverables: ["Google Search & Performance Max", "Meta Dynamic Creative Testing", "Advanced Retargeting & Attribution"],
    link: "/perform",
  },
  {
    id: "consulting",
    title: "Business Consulting",
    icon: Briefcase,
    accentColor: "#818CF8",
    badgeBg: "rgba(129, 140, 248, 0.12)",
    tag: "Strategic Advisory",
    description: "Executive advisory on market positioning, pricing architecture, go-to-market roadmaps, and digital transformation.",
    deliverables: ["Go-To-Market (GTM) Playbooks", "Offer Packaging & Pricing Strategy", "Digital Scale Readiness Review"],
    link: "/contact",
  },
];

export const ServicesGrid: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[300px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            Full-Spectrum Agency
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Everything Your Brand <span className="text-[#FFB800]">Needs to Grow</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            From visionary branding to cutting-edge AI automation, our end-to-end capabilities power every dimension of your digital presence.
          </p>
        </div>

        {/* 11 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="group relative p-8 rounded-3xl bg-[#0B0B0F] border border-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
              >
                {/* Glowing Top Accent Border on Hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-60 group-hover:opacity-100"
                  style={{ backgroundColor: service.accentColor }}
                />

                <div>
                  {/* Top: Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center border transition-all duration-300 p-3"
                      style={{
                        backgroundColor: service.badgeBg,
                        borderColor: `${service.accentColor}33`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.accentColor }} />
                    </div>

                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border"
                      style={{
                        backgroundColor: service.badgeBg,
                        color: service.accentColor,
                        borderColor: `${service.accentColor}33`,
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#8E8E93] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <ul className="mt-6 space-y-2.5 pt-6 border-t border-white/5">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2.5 text-xs text-[#A1A1AA]">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: service.accentColor }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Link */}
                <div className="mt-8 pt-4">
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#FFB800] transition-colors uppercase tracking-wider"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
