import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

import { CLIENTS, type Client, type Category } from "../components/data/client";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Brands Grown", value: 150, suffix: "+" },
  { label: "Industries", value: 25, suffix: "" },
  { label: "Campaigns Run", value: 400, suffix: "+" },
];

/* ------------------------------------------------------------------ */
/*  UTIL: category -> accent glow color (subtle, on-brand)             */
/* ------------------------------------------------------------------ */

const CATEGORY_GLOW: Record<string, string> = {
  Media: "rgba(52,125,187,0.18)",
  "Food & Beverage": "rgba(255,196,0,0.18)",
  Education: "rgba(30,76,115,0.18)",
  Technology: "rgba(52,125,187,0.20)",
  "Personal Brands": "rgba(255,196,0,0.18)",
  "Hotels & Restaurants": "rgba(255,196,0,0.18)",
  Events: "rgba(255,196,0,0.18)",
  Fashion: "rgba(52,125,187,0.18)",
  Automotive: "rgba(16,38,61,0.18)",
  "Real Estate": "rgba(30,76,115,0.18)",
  "Interior Design": "rgba(52,125,187,0.18)",
  "Spiritual & Wellness": "rgba(255,196,0,0.18)",
  "Import & Export Business": "rgba(16,38,61,0.18)",
  "Travel & Tourism": "rgba(52,125,187,0.18)",
  Fitness: "rgba(255,196,0,0.18)",
  Beauty: "rgba(52,125,187,0.18)"
};

/* ------------------------------------------------------------------ */
/*  STAT COUNTER                                                       */
/* ------------------------------------------------------------------ */

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-8">
      <span className="font-serif text-4xl md:text-5xl font-bold text-[#10263D] tabular-nums">
        <span className="text-[#FFC400]">{display}</span>
        {suffix}
      </span>
      <span className="mt-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#64748B]">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CLIENT CARD                                                        */
/* ------------------------------------------------------------------ */

function ClientCard({
  client,
  index,
  onOpen,
}: {
  client: Client;
  index: number;
  onOpen: (client: Client) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const initials = client.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.div
      layoutId={`card-${client.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(client)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(client)}
      className="relative overflow-hidden rounded-3xl border border-[#10263D]/8 bg-white/90 backdrop-blur-xl cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-xl"
      style={{
        boxShadow: hovered ? `0 16px 36px -10px ${CATEGORY_GLOW[client.category] || "rgba(255,196,0,0.2)"}` : "0 4px 20px -2px rgba(16,38,61,0.05)",
        borderColor: hovered ? "#FFC400" : "rgba(16,38,61,0.08)"
      }}
    >
      {/* top media area */}
      <div className={`relative w-full ${client.featured ? "h-64" : "h-44"} bg-gradient-to-b from-[#F8FAFC] to-[#EEF5FC] flex items-center justify-center overflow-hidden`}>
        {/* Cover image background context */}
        {client.cover ? (
          <img
            src={client.cover}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-25 transition-all duration-500 group-hover:scale-105 group-hover:opacity-35"
          />
        ) : client.logo ? (
          <img
            src={client.logo}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-10 filter blur-[2px] transition-all duration-500 group-hover:scale-105"
          />
        ) : null}

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-white/20 transition-colors duration-300 group-hover:bg-[#10263D]/5" />

        {/* The logo/avatar container that moves on hover */}
        <div className={`relative z-10 w-full h-full flex items-center justify-center p-6 transition-all duration-300 ${hovered ? "scale-75 -translate-y-4 opacity-50" : "scale-100 translate-y-0"}`}>
          {client.logo && !imgError ? (
            <motion.img
              layoutId={`logo-${client.id}`}
              src={client.logo}
              alt={`${client.name} logo`}
              loading="lazy"
              onError={() => setImgError(true)}
              className={`${client.featured ? "max-h-28" : "max-h-20"} max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(16,38,61,0.12)]`}
            />
          ) : (
            <div className={`${client.featured ? "w-20 h-20 text-3xl" : "w-16 h-16 text-2xl"} rounded-full bg-[#10263D] border-2 border-[#FFC400] flex items-center justify-center text-[#FFC400] font-serif font-bold shadow-md`}>
              {initials}
            </div>
          )}
        </div>

        {/* result badge, top right */}
        {client.result && !hovered && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wide uppercase bg-white/90 backdrop-blur-md border border-[#FFC400]/40 text-[#10263D] shadow-sm rounded-full px-2.5 py-1">
            <span className="text-[#FFC400] mr-1">★</span>{client.result}
          </span>
        )}

        {/* hover overlay: services + CTA */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-[#10263D]/85 backdrop-blur-sm flex flex-col items-center justify-end pb-4 gap-2.5 px-4 text-center pointer-events-none"
            >
              <div className="flex flex-wrap justify-center gap-1.5">
                {client.services.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="text-[9px] uppercase tracking-wider border border-[#FFC400]/40 bg-white/10 text-[#FFC400] rounded-full px-2.5 py-0.5 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {client.testimonial && (
                <p className="text-[10px] italic text-white/90 max-w-[90%] line-clamp-1">"{client.testimonial}"</p>
              )}

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFC400] flex items-center gap-1 border-b border-[#FFC400]/60 pb-0.5">
                {client.caseStudy ? "View Case Study →" : "Click to View →"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer info */}
      <div className="p-4 border-t border-[#10263D]/6 bg-white/95">
        <h3 className="font-serif text-lg font-bold text-[#10263D] group-hover:text-[#347DBB] transition-colors duration-300">{client.name}</h3>
        <p className="text-xs text-[#64748B] mt-0.5 font-medium">{client.handle}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CLIENT STATS HELPERS & DATA                                       */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: string;
}

function getClientStats(client: Client): StatCard[] {
  const statsMap: Record<Category, StatCard[]> = {
    "Media": [
      { label: "Reach Growth", value: "+220%" },
      { label: "Video Views", value: "+1.2M" },
      { label: "Engagement", value: "+4.5%" }
    ],
    "Products": [
      { label: "Sales Growth", value: "+180%" },
      { label: "D2C Orders", value: "+65%" },
      { label: "Repeat Buyers", value: "+120%" }
    ],
    "Education": [
      { label: "Enrollments", value: "+310" },
      { label: "Course Reach", value: "+150%" },
      { label: "Completion Rate", value: "92%" }
    ],
    "Healthcare": [
      { label: "Bookings", value: "+55%" },
      { label: "Patient Reach", value: "+2.4x" },
      { label: "Inquiries", value: "+80%" }
    ],
    "Personal Branding": [
      { label: "Followers", value: "+2.4x" },
      { label: "Engagement", value: "+3.1x" },
      { label: "Monthly Views", value: "+500K" }
    ],
    "Hotels & Restaurants": [
      { label: "Direct Bookings", value: "+45%" },
      { label: "Local SEO Click", value: "+150%" },
      { label: "Avg Reviews", value: "4.8★" }
    ],
    "Events": [
      { label: "Inquiries", value: "+75%" },
      { label: "Attendance", value: "+40%" },
      { label: "Social Buzz", value: "+3x" }
    ],
    "Fashion": [
      { label: "Store Sales", value: "+180%" },
      { label: "Conversion Rate", value: "+2.4x" },
      { label: "Return Customer", value: "35%" }
    ],
    "Automotive": [
      { label: "Video Views", value: "+90K" },
      { label: "Sales Leads", value: "+80%" },
      { label: "Ad Click Rate", value: "4.2%" }
    ],
    "Real Estate": [
      { label: "Qualified Leads", value: "+40/mo" },
      { label: "Conversion", value: "+2.8x" },
      { label: "Site Visits", value: "+110%" }
    ],
    "Interior Design": [
      { label: "Projects", value: "+50" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Lead Growth", value: "+2.5x" }
    ],
    "Spiritual & Wellness": [
      { label: "Projects", value: "+50" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Lead Growth", value: "+2.5x" }
    ],
    "Import & Export Business": [
      { label: "Projects", value: "+50" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Lead Growth", value: "+2.5x" }
    ],
    "Travel & Tourism": [
      { label: "Journeys Curated", value: "500+" },
      { label: "Traveler Community", value: "6K+" },
      { label: "Repeat Travelers", value: "85%" }
    ],
    "Fitness": [
      { label: "Fitness Brands", value: "+45" },
      { label: "Client Satisfaction", value: "99%" },
      { label: "Membership Growth", value: "+2.8x" }
    ],
    "Beauty": [
      { label: "Beauty Brands", value: "+40" },
      { label: "Client Satisfaction", value: "99%" },
      { label: "Appointment Growth", value: "+3.1x" }
    ],
  };

  const defaultStats = statsMap[client.category] || [
    { label: "Growth", value: "+45%" },
    { label: "Engagement", value: "+2.5x" },
    { label: "Brand Value", value: "Premium" }
  ];

  if (client.result) {
    const parts = client.result.split(" ");
    if (parts.length >= 2) {
      const val = parts[0];
      const lbl = parts.slice(1).join(" ");
      return [
        { label: lbl, value: val },
        defaultStats[1],
        defaultStats[2]
      ];
    } else {
      return [
        { label: "Total Growth", value: client.result },
        defaultStats[1],
        defaultStats[2]
      ];
    }
  }
  
  return defaultStats;
}

/* ------------------------------------------------------------------ */
/*  CLIENT MODAL — opens on card click, shows image + full content     */
/* ------------------------------------------------------------------ */

function ClientModal({ client, onClose }: { client: Client; onClose: () => void }) {
  const [coverError, setCoverError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const coverSrc = client.cover || client.logo;
  const initials = client.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  // Framer Motion 3D Parallax Tilt variables
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const springRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoBoxRef.current) return;
    const rect = logoBoxRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Framer Motion Staggered Children Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 220,
      },
    },
  };

  const stats = getClientStats(client);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#10263D]/70 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${client.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[92%] sm:w-[80%] md:w-[60%] max-h-[88vh] overflow-y-auto rounded-3xl border border-white/50 bg-white/95 backdrop-blur-2xl text-[#10263D] shadow-2xl"
      >
        {/* close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/80 border border-[#10263D]/10 text-[#10263D] hover:bg-[#FFC400] hover:text-[#10263D] transition-colors flex items-center justify-center shadow-md font-bold"
        >
          ✕
        </button>

        {/* Ambient Glowing Header & Interactive Logo Box */}
        <div className="relative w-full h-64 bg-gradient-to-b from-[#F8FAFC] via-[#EEF5FC] to-white flex items-center justify-center overflow-hidden border-b border-[#10263D]/8">
          {/* Blurred cover photo background context */}
          {coverSrc && !coverError && (
            <div className="absolute inset-0 opacity-[0.12] filter blur-md overflow-hidden pointer-events-none">
              <img
                src={coverSrc}
                alt=""
                loading="lazy"
                onError={() => setCoverError(true)}
                className="w-full h-full object-cover scale-110"
              />
            </div>
          )}

          {/* Interactive Logo Box with 3D Parallax Tilt */}
          <div className="relative z-10 flex items-center justify-center">
            <motion.div
              ref={logoBoxRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              className="relative w-36 h-36 rounded-3xl bg-white border border-[#10263D]/10 backdrop-blur-md flex items-center justify-center p-5 shadow-xl cursor-grab active:cursor-grabbing"
            >
              {/* Rotating Gold Accent Border */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div 
                  className="absolute -inset-[50%] bg-[conic-gradient(from_0deg,#FFC400_0%,transparent_30%,#347DBB_50%,transparent_80%,#FFC400_100%)] opacity-40 animate-spin"
                  style={{ animationDuration: '8s' }}
                />
                <div className="absolute inset-[2.5px] bg-white rounded-[21.5px]" />
              </div>

              {/* Logo inside */}
              <div 
                className="relative z-10 flex items-center justify-center w-full h-full"
                style={{ transform: "translateZ(20px)" }}
              >
                {client.logo && !logoError ? (
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    onError={() => setLogoError(true)}
                    className="max-h-20 max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(16,38,61,0.15)]"
                  />
                ) : (
                  <div className="font-serif text-4xl text-[#10263D] tracking-wider select-none font-bold">
                    {initials}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-8"
        >
          {/* category badge */}
          <motion.div variants={itemVariants}>
            <span className="text-[11px] uppercase tracking-widest text-[#10263D] font-bold bg-[#FFC400]/25 border border-[#FFC400]/40 rounded-full px-3 py-1">
              {client.category}
            </span>
          </motion.div>

          {/* title and handle */}
          <motion.div variants={itemVariants} className="mt-4">
            <h2 className="font-serif text-3xl text-[#10263D] font-bold">{client.name}</h2>
            <p className="text-sm text-[#64748B] mt-1 font-medium">{client.handle}</p>
          </motion.div>

          {/* services chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-5">
            {client.services.map((s) => (
              <span
                key={s}
                className="text-[10px] uppercase tracking-wide border border-[#10263D]/12 bg-[#F8FAFC] text-[#10263D] rounded-full px-3 py-1 font-semibold"
              >
                {s}
              </span>
            ))}
          </motion.div>

          {/* Multiple Result Stat Cards Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 my-6">
            {stats.map((stat, sIdx) => (
              <div 
                key={sIdx} 
                className="bg-[#F8FAFC] border border-[#10263D]/8 rounded-xl p-3 text-center relative overflow-hidden group/stat hover:border-[#FFC400] transition-all duration-300 shadow-sm"
              >
                <div className="text-xl md:text-2xl font-serif text-[#10263D] font-bold">
                  {stat.value}
                </div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-[#64748B] mt-1 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Divider Line */}
          <motion.div variants={itemVariants} className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#FFC400]/40 to-transparent my-6" />

          {/* description / content */}
          {client.description && (
            <motion.p variants={itemVariants} className="text-sm leading-relaxed text-[#64748B]">
              {client.description}
            </motion.p>
          )}

          {/* testimonial */}
          {client.testimonial && (
            <motion.blockquote variants={itemVariants} className="mt-6 border-l-3 border-[#FFC400] pl-4 text-sm italic text-[#10263D] bg-[#F8FAFC] py-3 pr-3 rounded-r-xl font-medium">
              "{client.testimonial}"
            </motion.blockquote>
          )}

          {/* actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8">
            <a
              href={`https://instagram.com/${client.handle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest bg-[#FFC400] text-[#10263D] rounded-full px-6 py-2.5 hover:bg-[#e6b000] shadow-md transition-all duration-300 font-bold"
            >
              Visit Instagram
            </a>
            {client.caseStudy && (
              <button
                onClick={() => console.log(`navigate to /case-studies/${client.id}`)}
                className="text-xs uppercase tracking-widest border border-[#10263D]/20 text-[#10263D] rounded-full px-6 py-2.5 hover:border-[#10263D] transition-all duration-300 font-semibold"
              >
                Full Case Study
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Hero entrance animation
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Marquee infinite scroll via GSAP
  useEffect(() => {
    if (!marqueeRef.current) return;
    const el = marqueeRef.current;
    const tween = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "linear",
    });
    return () => {
      tween.kill();
    };
  }, []);

  const scrollToCard = (id: string) => {
    const target = document.getElementById(`client-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      gsap.fromTo(
        target,
        { boxShadow: "0 0 0px rgba(255,196,0,0)" },
        { boxShadow: "0 0 40px rgba(255,196,0,0.5)", duration: 0.6, yoyo: true, repeat: 1 }
      );
    }
  };

  return (
    <div className="bg-white text-[#10263D] min-h-screen">
      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-36 pb-20 px-6 text-center bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF5FC]"
      >
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#347DBB]/8 blur-[160px] rounded-full"></div>
          <div className="absolute top-36 left-1/3 -translate-x-1/2 w-[400px] h-[350px] bg-[#FFC400]/10 blur-[140px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#10263D]/10 shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFC400]"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#10263D] font-bold">
              Trusted Brand Partners
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight text-[#10263D]"
          >
            The Brands Behind <br />
            <span className="text-[#10263D] relative inline-block">
              The <span className="text-[#347DBB]">Exponential</span> Growth
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-[#FFC400] rounded-full"></span>
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 max-w-2xl mx-auto text-[#64748B] text-base md:text-lg leading-relaxed font-normal"
          >
            “Every logo represents a <span className="text-[#10263D] font-semibold">story</span>. Every story represents lasting <span className="text-[#10263D] font-semibold">trust & scale</span>.”
          </motion.p>
        </div>
      </section>

      {/* ---------------- STATS BAR ---------------- */}
      <section className="border-y border-[#10263D]/8 bg-white/80 py-10 px-6 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-around gap-y-8">
          {STATS.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ---------------- GRID ---------------- */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
        >
          <AnimatePresence>
            {CLIENTS.map((client, i) => (
              <div key={client.id} id={`client-${client.id}`}>
                <ClientCard client={client} index={i} onOpen={setSelectedClient} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ---------------- CLIENT MODAL ---------------- */}
      <AnimatePresence>
        {selectedClient && (
          <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </AnimatePresence>

      {/* ---------------- MARQUEE (clickable) ---------------- */}
      <section className="bg-[#FFC400] py-4 overflow-hidden shadow-inner">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <button
              key={`${c.id}-${i}`}
              onClick={() => scrollToCard(c.id)}
              className="marquee-btn mx-6 text-[#10263D] font-serif font-bold text-base md:text-lg tracking-wider hover:text-white transition-colors"
            >
              {c.name.toUpperCase()} •
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-28 px-6 text-center bg-gradient-to-b from-[#FFFFFF] to-[#F8FAFC]">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#347DBB]/6 blur-[180px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Small Label */}
          <p className="uppercase tracking-[0.3em] text-[#347DBB] text-xs sm:text-sm font-bold mb-4">
            Let's Build Something Exceptional
          </p>

          {/* Heading */}
          <h2 className="font-serif font-bold leading-tight text-4xl sm:text-5xl md:text-6xl text-[#10263D]">
            Your Brand Could <br />
            <span className="text-[#10263D]">
              Be The Next <span className="text-[#FFC400]">Success Story</span>
            </span>
          </h2>

          {/* Divider */}
          <div className="w-20 h-1 mx-auto my-6 bg-[#FFC400] rounded-full"></div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-[#64748B] text-base md:text-lg leading-relaxed">
            The strongest brands don't scale by chance — <span className="text-[#10263D] font-semibold">they partner with creative strategists who obsess over growth.</span>
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/contact")}
            className="mt-10 inline-flex items-center gap-3 bg-[#FFC400] text-[#10263D] font-bold px-9 py-4 rounded-full text-xs uppercase tracking-[0.25em] shadow-lg hover:bg-[#e6b000] hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start The Conversation
            <span className="text-base leading-none">↗</span>
          </button>
        </div>
      </section>
    </div>
  );
}
