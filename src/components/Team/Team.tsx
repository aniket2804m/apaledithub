import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  X,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Code2,
  Video,
  PenTool,
  Share2,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Team Images from role1
import rushiImg from "../../img/role1/rushi sir.png";
import saurabhImg from "../../img/role1/saurabh sir (2).png";
import pallaviImg from "../../img/role1/pallavi.png";
import avinashImg from "../../img/role1/avinash (3).png";
import tejasImg from "../../img/role1/tejas (3).png";
import riteshImg from "../../img/role1/ritesh (3).png";
import rutuImg from "../../img/role1/rutu (2).png";
import anushkaImg from "../../img/role1/anushka (2).png";
import aniketImg from "../../img/role1/aniket (2).png";
import pratapImg from "../../img/role1/pratap (1).png";
import teamAiImg from "../../img/team/ai.png";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: "leadership" | "design-video" | "tech";
  departmentLabel: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  skills: string[];
  impactMetric: string;
  impactLabel: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Rushikesh Hande",
    role: "Founder & Performance Strategist",
    department: "leadership",
    departmentLabel: "Leadership",
    image: rushiImg,
    shortDesc: "Attention gets you noticed. Strategy keeps you remembered.",
    fullDesc:
      "Rushikesh believes every successful brand is built twice: first as a strategy, then as a business. Long before campaigns launch or content goes live, he asks the foundational questions that shape lasting commercial velocity. He founded AaplaEditHub on the conviction that creativity earns attention, but strategy earns market authority.",
    skills: ["Brand Strategy", "Performance Scaling", "Ecosystem Architecture", "Venture Growth"],
    impactMetric: "150+",
    impactLabel: "Brands Transformed",
  },
  {
    id: 2,
    name: "Pallavi Vishwas",
    role: "Brand Architect & Client Strategy",
    department: "leadership",
    departmentLabel: "Branding",
    image: pallaviImg,
    shortDesc: "My mind multitasks so your brand never has to.",
    fullDesc:
      "Pallavi manages complex briefs, multi-platform deadlines, and brand narratives simultaneously with effortless composure. In her hands, chaotic raw ideas crystallize into unmistakable market positioning. Clients trust her with the version of their brand they know exists but haven't yet articulated.",
    skills: ["Brand Architecture", "Creative Direction", "Account Strategy", "Narrative Framing"],
    impactMetric: "98.4%",
    impactLabel: "Client Retention",
  },
  {
    id: 3,
    name: "Saurabh Borawakey",
    role: "Digital Growth & Media Director",
    department: "leadership",
    departmentLabel: "Growth & Ads",
    image: saurabhImg,
    shortDesc: "I don't talk theory. I deliver measurable revenue.",
    fullDesc:
      "Saurabh is laser-focused on shifting key business metrics. While traditional marketers talk in vague brand awareness terms, he is busy optimizing full-funnel media allocations across Meta and Google, letting the analytics dashboard speak for itself.",
    skills: ["Algorithmic Media Buying", "Meta & Google Ads", "Funnel CRO", "Attribution Modeling"],
    impactMetric: "3.8×",
    impactLabel: "Avg. Blended ROAS",
  },
  {
    id: 4,
    name: "Rutuja Pawar",
    role: "Lead Graphic & Visual Designer",
    department: "design-video",
    departmentLabel: "Design",
    image: rutuImg,
    shortDesc: "I design for the years, not just the fleeting algorithm.",
    fullDesc:
      "Rutuja designs as though every brand lends her its soul before she opens the first artboard. Every layout, color choice, and typographic pairing exists for an intentional reason, resulting in work that feels timeless and commanding.",
    skills: ["Identity Systems", "High-CTR Ad Creatives", "Visual Guidelines", "Typography"],
    impactMetric: "100+",
    impactLabel: "Visual Identities",
  },
  {
    id: 5,
    name: "Aniket Suryawanshi",
    role: "Senior Web & Full-Stack Developer",
    department: "tech",
    departmentLabel: "Engineering",
    image: aniketImg,
    shortDesc: "Tell me the task. I will skip the drama and ship code.",
    fullDesc:
      "Aniket views reliability as a fine craft. He delivers exactly what modern businesses demand: ultra-fast page speeds, flawless mobile responsiveness, clean React codebases, and rock-solid deployment pipelines.",
    skills: ["React & Next.js", "Tailwind CSS", "Speed Optimization", "Interactive UI"],
    impactMetric: "100",
    impactLabel: "Core Web Vitals",
  },
  {
    id: 6,
    name: "Anushka Shirole",
    role: "Content Architect & Storyteller",
    department: "design-video",
    departmentLabel: "Content",
    image: anushkaImg,
    shortDesc: "Every brand has a story. I just go excavating for it.",
    fullDesc:
      "Anushka fuses acute curiosity with strategic storytelling. She translates complex, technical offerings into engaging, emotionally resonant scripts and editorial pieces that turn passive readers into loyal customers.",
    skills: ["Direct-Response Copy", "Video Scripting", "B2B Thought Leadership", "Audience Psychology"],
    impactMetric: "85K+",
    impactLabel: "Content Shares",
  },
  {
    id: 7,
    name: "Tejas Kumbhar",
    role: "Visual Storyteller & Cinematographer",
    department: "design-video",
    departmentLabel: "Video & Media",
    image: tejasImg,
    shortDesc: "I don't look for the moment. The moment finds me.",
    fullDesc:
      "Tejas has an instinctive eye for capturing subtle, genuine human moments that make brands feel authentic and larger-than-life. His cinematography gives commercial brands a cinematic soul.",
    skills: ["Cinematography", "Lighting Architecture", "Commercial Filming", "Creative Direction"],
    impactMetric: "180%",
    impactLabel: "Engagement Lift",
  },
  {
    id: 8,
    name: "Pratap Pawar",
    role: "Senior Video Editor & Motion Artist",
    department: "design-video",
    departmentLabel: "Video & Media",
    image: pratapImg,
    shortDesc: "Keep it real, or don't keep it at all.",
    fullDesc:
      "Pratap edits with raw energy, rhythm, and pacing that captures attention within the first 0.5 seconds. His cuts keep viewers glued from the hook to the final conversion frame.",
    skills: ["Viral Short-Form Reels", "Sound Design", "Motion Graphics", "Retention Editing"],
    impactMetric: "4.4M+",
    impactLabel: "Reel Impressions",
  },
  {
    id: 9,
    name: "Ritesh Dharne",
    role: "Creative Video Editor & VFX Specialist",
    department: "design-video",
    departmentLabel: "Video & Media",
    image: riteshImg,
    shortDesc: "I don't just cut clips. I edit deep emotions into them.",
    fullDesc:
      "Ritesh treats every editing timeline like a cinematic journey. By balancing visual pacing, seamless color grading, and dynamic sound effects, he creates videos that leave an unforgettable impression.",
    skills: ["Color Grading", "Visual Effects (VFX)", "Pacing & Rhythm", "Narrative Editing"],
    impactMetric: "+320%",
    impactLabel: "Watch Time Growth",
  },
  {
    id: 10,
    name: "Avinash Barodiya",
    role: "Frontend Engineer & 3D Interactive UI",
    department: "tech",
    departmentLabel: "Engineering",
    image: avinashImg,
    shortDesc: "Difficult is just a feature I haven't engineered yet.",
    fullDesc:
      "Avinash thrives on overcoming technical frontiers. He builds seamless 3D WebGL experiences, interactive component libraries, and robust digital platforms that elevate brand prestige.",
    skills: ["Three.js & Canvas", "Frontend Architecture", "Micro-Interactions", "API Integrations"],
    impactMetric: "Sub-1s",
    impactLabel: "Load Velocity",
  },
];

const CULTURE_VALUES = [
  {
    number: "01",
    title: "Radical Speed & Zero Politics",
    desc: "We eliminate bureaucratic red tape. Our team works in rapid agile sprints, shipping high-impact work that moves markets without excuses.",
    icon: Zap,
  },
  {
    number: "02",
    title: "Artistic Bravery & Deliberate Purpose",
    desc: "We reject safe, boring templates. Every visual asset, layout, and word is crafted with intentional commercial psychology.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Continuous Machine Intelligence",
    desc: "We augment world-class human taste with proprietary AI workflows, enabling us to outpace traditional agencies by 10x.",
    icon: Cpu,
  },
];

const Team: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [fullscreenMember, setFullscreenMember] = useState<TeamMember | null>(null);
  const navigate = useNavigate();

  const filteredMembers =
    activeFilter === "all"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department === activeFilter);

  return (
    <div className="bg-[#050505] text-[#FAFAFA] min-h-screen overflow-hidden font-montserrat selection:bg-[#FFB800] selection:text-black pt-20">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 overflow-hidden">
        {/* Diagonal geometric grid background */}
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
              The Minds Behind AaplaEditHub
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08]"
          >
            The Creative Architects & <br />
            <span className="text-[#FFB800] drop-shadow-[0_0_35px_rgba(255,184,0,0.45)]">
              Growth Engineers
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed"
          >
            A multidisciplinary collective of visionary strategists, viral editors, full-stack engineers, and machine intelligence specialists united by one standard: building market-dominating brands.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 p-4 sm:p-5 rounded-2xl bg-[#0D0D12]/90 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">10</div>
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">Specialists</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#FFB800]">150+</div>
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">Brands Scaled</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">4.4M+</div>
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">Viral Views</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#FFB800]">3.8×</div>
              <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">Avg. Client ROAS</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE DEPARTMENT FILTER TABS */}
      <section className="relative px-6 sm:px-8 mb-16 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
          {[
            { id: "all", label: "All Members (10)" },
            { id: "leadership", label: "Leadership & Growth" },
            { id: "design-video", label: "Design & Video" },
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

      {/* 3. TEAM MEMBER CARDS GRID */}
      <section className="relative pb-32 px-6 sm:px-8 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMembers.map((member, index) => (
              <motion.div
                layout
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="group relative rounded-3xl bg-[#0C0C10] border border-white/8 hover:border-[#FFB800]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,184,0,0.12)]"
              >
                {/* Image Showcase Container */}
                <div
                  className="relative aspect-[4/3] bg-gradient-to-b from-[#181822] via-[#101017] to-[#0C0C10] overflow-hidden cursor-pointer flex items-end justify-center p-4"
                  onClick={() => setFullscreenMember(member)}
                >
                  {/* Subtle Grid in thumbnail */}
                  <div className="absolute inset-0 diagonal-grid-pattern opacity-15 pointer-events-none" />

                  {/* Golden backlight glow on hover */}
                  <div className="absolute w-44 h-44 rounded-full bg-[#FFB800]/15 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Member Photo */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative z-10 max-h-[92%] w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-[#050505]/85 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#FFB800] uppercase tracking-wider">
                      {member.departmentLabel}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-2.5 py-1 rounded-full bg-[#050505]/85 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white/90 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-ping" />
                      Active
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Name & Role */}
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#FFB800] transition-colors tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#FFB800] mt-1">
                      {member.role}
                    </p>

                    {/* Short Quote / Philosophy */}
                    <div className="mt-4 p-3.5 rounded-xl bg-[#121218] border-l-2 border-[#FFB800]">
                      <p className="text-xs sm:text-sm text-[#A1A1AA] italic leading-relaxed">
                        "{member.shortDesc}"
                      </p>
                    </div>

                    {/* Skill Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {member.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-[#161620] border border-white/5 text-[10px] text-[#8E8E93] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Metric & Profile Button */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-white">{member.impactMetric}</div>
                      <div className="text-[10px] text-[#71717A] uppercase tracking-wider">{member.impactLabel}</div>
                    </div>

                    <button
                      onClick={() => setFullscreenMember(member)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#161622] hover:bg-[#FFB800] text-white hover:text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/10 hover:border-[#FFB800]"
                    >
                      <span>Full Bio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. STUDIO CULTURE & MANIFESTO SECTION */}
      <section className="relative py-28 bg-[#07070A] overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB800]/5 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFB800]" />
              Our DNA
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              The Collective <span className="text-[#FFB800]">Manifesto</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              We operate not as a conventional agency, but as an agile elite unit engineered for creative bravery and commercial dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CULTURE_VALUES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 sm:p-10 rounded-3xl bg-[#0B0B0E] border border-white/8 hover:border-[#FFB800]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.1)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black text-[#FFB800] tracking-tighter">
                        {item.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#14141C] border border-white/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#FFB800]" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm text-[#8E8E93] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#71717A]">
                    <span className="uppercase tracking-wider font-semibold">AaplaEdit Standard</span>
                    <span className="text-[#FFB800]">✦</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. JOIN THE COLLECTIVE (CAREER / COLLAB CTA) */}
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#181824] border border-[#FFB800]/40 text-xs font-extrabold text-[#FFB800] uppercase tracking-widest mb-6">
              Careers &amp; Partnerships
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Are You A Relentless <br />
              <span className="text-[#FFB800] drop-shadow-[0_0_35px_rgba(255,184,0,0.5)]">
                Creative Or Engineer?
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              We are continually looking for world-class video editors, visual designers, media buyers, and full-stack builders to join our fast-growing studio collective.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#FFB800] hover:bg-[#FFC400] text-black font-extrabold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(255,184,0,0.45)] hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] hover:scale-105"
              >
                <span>Apply To Join The Team</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={() => navigate("/work")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#16161D] hover:bg-[#20202A] text-white font-semibold text-sm sm:text-base border border-white/10 hover:border-[#FFB800]/40 tracking-wide transition-all duration-300"
              >
                <span>Explore Client Work</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. INTERACTIVE MEMBER MODAL */}
      <AnimatePresence>
        {fullscreenMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenMember(null)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-[#0C0C12] border border-white/15 p-6 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setFullscreenMember(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFB800] hover:text-black text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid sm:grid-cols-12 gap-8 items-center">
                {/* Photo */}
                <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#181824] to-[#0A0A0E] p-2 flex items-end justify-center border border-white/10">
                  <div className="absolute inset-0 diagonal-grid-pattern opacity-20 pointer-events-none" />
                  <img
                    src={fullscreenMember.image}
                    alt={fullscreenMember.name}
                    className="relative z-10 max-h-full w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Info */}
                <div className="sm:col-span-7">
                  <span className="px-3 py-1 rounded-full bg-[#181822] text-[#FFB800] text-xs font-bold uppercase tracking-wider border border-[#FFB800]/30">
                    {fullscreenMember.departmentLabel}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                    {fullscreenMember.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#FFB800] font-semibold mt-1">
                    {fullscreenMember.role}
                  </p>

                  <div className="mt-4 p-3.5 rounded-xl bg-[#12121A] border-l-2 border-[#FFB800]">
                    <p className="text-xs sm:text-sm text-[#A1A1AA] italic">
                      "{fullscreenMember.shortDesc}"
                    </p>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {fullscreenMember.fullDesc}
                  </p>

                  {/* Skills */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {fullscreenMember.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#161622] border border-white/8 text-[11px] text-white/80 font-medium"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;
