"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Brand Positioning",
    desc: "Define what makes your brand unique and unforgettable.",
    icon: "🎯",
  },
  {
    title: "Audience Research",
    desc: "Understand your ideal customers and market behavior.",
    icon: "👥",
  },
  {
    title: "Competitor Analysis",
    desc: "Identify opportunities and outperform competitors.",
    icon: "📊",
  },
  {
    title: "Brand Messaging",
    desc: "Create powerful messaging that connects and converts.",
    icon: "💬",
  },
  {
    title: "Voice & Tone",
    desc: "Build a consistent and recognizable brand personality.",
    icon: "🗣️",
  },
  {
    title: "Identity Direction",
    desc: "Strategic guidance for visual branding and design.",
    icon: "🎨",
  },
  {
    title: "Customer Experience",
    desc: "Craft meaningful experiences across every touchpoint.",
    icon: "✨",
  },
  {
    title: "Growth Strategy",
    desc: "Build a roadmap for long-term brand growth.",
    icon: "🚀",
  },
];

export default function Overview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Stagger variants for grid item container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // const cardVariants = {
  //   hidden: { opacity: 0, y: 45 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: [0.16, 1, 0.3, 1], // premium easeOut
  //     },
  //   },
  // };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-24 text-white border-t border-white/5 font-montserrat"
    >
      {/* Background Dotted Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 diagonal-grid-pattern opacity-20" />
      
      {/* Golden Ambient Glows */}
      <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-2xl bg-[#FFB800]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-2xl bg-[#FFB800]/5 blur-[140px] pointer-events-none" />

      {/* Floating Gold Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-2xl bg-[#FFB800]/30 blur-[0.5px] pointer-events-none hidden lg:block"
          style={{
            top: `${20 + i * 15}%`,
            left: `${6 + (i % 2 === 0 ? Math.random() * 4 : 82 + Math.random() * 4)}%`,
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-12, 12, -12],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-2xl border border-[#FFB800]/40 bg-[#14141C] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#FFB800] font-montserrat shadow-[0_0_15px_rgba(255,184,0,0.15)]"
          >
            OUR SERVICES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="overview-title mt-6 text-4xl font-bold uppercase leading-tight text-white md:text-5xl font-cinzel tracking-wider"
          >
            Strategic Brand
            <span className="block mt-2 text-[#FFB800] drop-shadow-[0_0_25px_rgba(255,184,0,0.4)]">
              Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overview-subtitle mt-6 text-base text-[#9CA3AF] md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-montserrat"
          >
            We help businesses build memorable brands through positioning, messaging, customer insights, and long-term growth strategies.
          </motion.p>
        </div>

        {/* Services Grid with Framer Motion viewport stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 font-montserrat"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.015,
              }}
              transition={{ duration: 0.3 }}
              className="group relative p-8 rounded-3xl bg-[#0C0C10] border border-white/8 hover:border-[#FFB800]/40 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#14141C] border border-[#FFB800]/30 flex items-center justify-center text-xl mb-6 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-[#8E8E93] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button className="rounded-full bg-[#FFB800] text-black hover:bg-[#FFC400] px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_0_20px_rgba(255,184,0,0.4)]">
            Start Your Brand Journey ↗
          </button>
        </motion.div>
      </div>
    </section>
  );
}