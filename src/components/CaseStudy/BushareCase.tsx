"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: "3.4×", label: "Revenue Growth" },
  { value: "+218%", label: "Organic Traffic" },
  { value: "3.8×", label: "Paid ROAS" },
  { value: "11.4K", label: "New Followers" },
  { value: "6,200+", label: "Email Subscribers" },
  { value: "2.9%", label: "Conversion Rate" },
  { value: "22%", label: "Cart Recovery" },
  { value: "38", label: "Page-1 Keywords" },
];

const PROBLEMS = [
  "No brand identity — inconsistent visuals, no clear positioning",
  "Website converting at 0.6% with 6-second mobile load times",
  "Instagram posts irregular, under 2,800 reach per post",
  "Paid ads had failed — no tracking, no audience strategy, poor creatives",
  "No email list. No retargeting. No way to bring customers back.",
];

const TIMELINE = [
  {
    range: "Months 1–2",
    title: "Foundation",
    detail: "Audience research, brand positioning, visual identity overhaul.",
  },
  {
    range: "Months 3–5",
    title: "Rebuild",
    detail: "Shopify rebuild, SEO setup, mobile speed from 6.2s → 2.1s.",
  },
  {
    range: "Months 4–8",
    title: "Content Engine",
    detail: "8–10 Reels/month across 3 content pillars.",
  },
  {
    range: "Months 6–14",
    title: "Scale",
    detail: "Meta campaigns launched, scaled to 3.8× blended ROAS.",
  },
  {
    range: "Throughout",
    title: "Retention",
    detail: "Email capture, WhatsApp broadcast, abandoned cart recovery.",
  },
];

/* -------------------------------------------------------------------- */
/*  THREE.JS HERO BACKGROUND                                             */
/* -------------------------------------------------------------------- */

const ThreeHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const COUNT = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colorChoices = [
      new THREE.Color("#FFC400"),
      new THREE.Color("#347DBB"),
      new THREE.Color("#10263D"),
    ];
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frame = 0;
    let raf: number;
    const animate = () => {
      frame += 0.002;
      points.rotation.y = frame;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none absolute inset-0 z-0 opacity-40" />;
};

/* -------------------------------------------------------------------- */
/*  STAT CARD                                                            */
/* -------------------------------------------------------------------- */

const StatCard: React.FC<{ value: string; label: string; index: number }> = ({
  value,
  label,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-3xl border border-[#10263D]/8 bg-white/90 backdrop-blur-xl p-6 text-center hover:border-[#FFC400] transition-all duration-300 shadow-sm hover:shadow-xl"
  >
    <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#FFC400]/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
    <p className="text-3xl font-bold tracking-tight text-[#10263D] sm:text-4xl font-serif">
      <span className="text-[#347DBB]">{value}</span>
    </p>
    <p className="mt-2 text-xs uppercase tracking-widest text-[#64748B] font-bold">
      {label}
    </p>
  </motion.div>
);

/* -------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                       */
/* -------------------------------------------------------------------- */

const BushareCase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTitleRef.current) {
        const chars = heroTitleRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.035,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".gsap-fade-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".gsap-line").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        className="char inline-block"
        key={`${char}-${i}`}
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-hidden bg-white text-[#10263D] selection:bg-[#FFC400] selection:text-[#10263D]"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-[3px] origin-left bg-[#FFC400]"
        style={{ width: progressWidth }}
      />

      {/* ============================== HERO ============================== */}
      <section className="relative flex min-h-[75vh] pt-32 pb-16 w-full flex-col items-center justify-center overflow-hidden px-6 text-center bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF5FC]">
        <ThreeHero />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#10263D]/10 shadow-sm mb-6 z-10">
          <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#10263D] font-bold">
            Fashion D2C Case Study
          </span>
        </div>

        <h1
          ref={heroTitleRef}
          className="max-w-5xl text-balance font-serif text-5xl font-bold leading-tight tracking-tight text-[#10263D] sm:text-7xl md:text-8xl z-10"
        >
          {splitChars("Bushare")}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl text-balance text-base text-[#64748B] sm:text-lg md:text-xl font-normal z-10"
        >
          How a zero-visibility clothing brand became a{" "}
          <span className="text-[#10263D] font-semibold">
            recognised Korean fashion label
          </span>{" "}
          with a full digital growth engine in 14 months.
        </motion.p>
      </section>

      {/* ============================ THE BRAND ============================ */}
      <section className="gsap-fade-section mx-auto text-center max-w-5xl px-6 py-20 border-t border-[#10263D]/8">
        <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
          01 · The Brand
        </span>
        <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10263D] sm:text-5xl">
          A Niche Product. Zero Audience. No System.
        </h2>
        <div className="gsap-line mx-auto mt-6 h-1 w-20 bg-[#FFC400] rounded-full" />
        <p className="mt-8 text-center text-base leading-relaxed text-[#64748B] sm:text-lg max-w-3xl mx-auto">
          Bushare sells Korean-inspired clothing to young, urban Indians aged 18–32. The aesthetic was strong and the garments were high-grade, but they lacked market presence and conversion infrastructure.
        </p>
      </section>

      {/* =========================== THE PROBLEM ============================ */}
      <section className="gsap-fade-section bg-[#F8FAFC] text-center px-6 py-20 sm:py-28 border-y border-[#10263D]/8">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
            02 · The Bottlenecks
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl text-[#10263D]">
            Strong Craft. Zero Infrastructure.
          </h2>
          <div className="gsap-line mx-auto mt-6 h-1 w-20 bg-[#FFC400] rounded-full" />

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
            {PROBLEMS.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-2xl border border-[#10263D]/8 bg-white p-5 shadow-sm"
              >
                <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#FFC400]" />
                <span className="text-sm leading-relaxed text-[#10263D] font-medium">
                  {p}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================== THE TIMELINE =========================== */}
      <section className="gsap-fade-section text-center bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
            03 · The Roadmap
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10263D] sm:text-5xl">
            14 Months of Strategic Evolution.
          </h2>
          <div className="gsap-line mx-auto mt-6 h-1 w-20 bg-[#FFC400] rounded-full" />

          <div className="relative mt-12 space-y-4 max-w-3xl mx-auto">
            {TIMELINE.map((step, i) => (
              <motion.button
                key={step.range}
                type="button"
                onClick={() => setActiveStep(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative flex w-full items-start gap-5 rounded-2xl p-5 text-left border transition-all duration-300 ${
                  activeStep === i
                    ? "bg-[#F8FAFC] border-[#FFC400] shadow-md"
                    : "bg-white border-[#10263D]/8 hover:border-[#10263D]/20 shadow-sm"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                    activeStep === i
                      ? "bg-[#FFC400] text-[#10263D]"
                      : "bg-[#10263D] text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="text-lg font-bold text-[#10263D] font-serif">
                      {step.title}
                    </p>
                    <span className="text-xs font-bold text-[#347DBB] uppercase">
                      {step.range}
                    </span>
                  </div>
                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-2 text-sm text-[#64748B] leading-relaxed"
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ THE RESULTS ============================ */}
      <section className="gsap-fade-section bg-[#F8FAFC] px-6 py-20 sm:py-28 border-t border-[#10263D]/8 text-center">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
            04 · The Results
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10263D] sm:text-5xl">
            14 Months. Measurable Scaling.
          </h2>
          <div className="gsap-line mx-auto mt-6 h-1 w-20 bg-[#FFC400] rounded-full" />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {STATS.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== QUOTE ============================== */}
      <section className="gsap-fade-section relative overflow-hidden bg-white px-6 py-24 text-center">
        <div className="relative mx-auto max-w-3xl">
          <span className="text-5xl text-[#FFC400] font-serif font-bold select-none">“</span>
          <p className="-mt-3 font-serif text-xl sm:text-2xl italic leading-relaxed text-[#10263D] font-medium">
            I thought good clothes would sell themselves. They don't — not without the right brand and systems. Fourteen months later, I have a business that runs with structure and a brand people actually recognise.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#FFC400] font-bold">
            — Founder, Bushare
          </p>
        </div>
      </section>
    </div>
  );
};

export default BushareCase;
