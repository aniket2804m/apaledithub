"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const META = [
  { label: "Industry", value: "Podcast & Digital Media" },
  { label: "Location", value: "Pune, Maharashtra" },
  { label: "Engagement", value: "2+ Years · Ongoing" },
  { label: "Services", value: "Brand, Content & Social" },
];

const CHALLENGES = [
  "No defined niche — topics shifted every week, leaving audiences with no reason to stay.",
  "Invisible in a crowded space — no distinct look, tone, or positioning to stand out.",
  "No social media system — posts went up when ready, not when they'd perform.",
  "Host had no personal brand — no second growth engine beyond the show itself.",
];

const PHASES = [
  {
    n: "01",
    title: "Find the Niche",
    detail:
      "Audited every episode, mapped competitor gaps, and locked Pune Voices into one clear space: the city's civic conversation.",
  },
  {
    n: "02",
    title: "Build the Brand",
    detail:
      "New visual identity — colour palette, thumbnails, reel covers, episode artwork — built to communicate credibility at a glance.",
  },
  {
    n: "03",
    title: "Grow the Audience",
    detail:
      "Full content system: long-form episodes, short clips, reels — each crafted for platform behaviour. Weekly review kept it improving.",
  },
  {
    n: "04",
    title: "Build the Host",
    detail:
      "Developed the host's personal brand in parallel — a second growth engine that fed listeners directly back to the show.",
  },
];

const OUTCOMES = [
  { value: "300%+", label: "Social Reach Growth", note: "Organic reach grew through reels and content repurposing — no paid promotion required." },
  { value: "2×/week", label: "Content Published", note: "Consistent cadence replaced irregular, reactive posting." },
  { value: "Defined", label: "Niche & Positioning", note: "Pune Voices is now recognisable — guests and audiences understand exactly what it stands for." },
  { value: "Active", label: "Host Personal Brand", note: "A second growth engine, feeding listeners back to the show every week." },
  { value: "Higher", label: "Audience Engagement", note: "Passive viewers became an active community — more comments, saves, and shares." },
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

    const COUNT = 450;
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
/*  OUTCOME CARD                                                         */
/* -------------------------------------------------------------------- */

const OutcomeCard: React.FC<{
  value: string;
  label: string;
  note: string;
  index: number;
}> = ({ value, label, note, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-3xl border border-[#10263D]/8 bg-white/90 backdrop-blur-xl p-6 hover:border-[#FFC400] transition-all duration-300 shadow-sm hover:shadow-xl"
  >
    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FFC400]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
    <p className="text-3xl font-bold tracking-tight text-[#10263D] sm:text-4xl font-serif">
      <span className="text-[#347DBB]">{value}</span>
    </p>
    <p className="mt-2 text-xs uppercase tracking-widest text-[#10263D] sm:text-sm font-bold">
      {label}
    </p>
    <p className="mt-3 text-sm leading-relaxed text-[#64748B] font-normal">{note}</p>
  </motion.div>
);

/* -------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                       */
/* -------------------------------------------------------------------- */

const PuneVoicesCase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [activePhase, setActivePhase] = useState(0);

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
            Podcast Case Study
          </span>
        </div>

        <h1
          ref={heroTitleRef}
          className="max-w-5xl text-balance font-serif text-5xl font-bold leading-tight tracking-tight text-[#10263D] sm:text-7xl md:text-8xl z-10"
        >
          {splitChars("Pune Voices")}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl text-balance text-base text-[#64748B] sm:text-lg md:text-xl font-normal z-10"
        >
          A city had <span className="text-[#10263D] font-semibold">stories</span>. It just needed a strategic growth system to amplify them.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 z-10"
        >
          {META.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-[#10263D]/8 bg-white/85 px-4 py-4 backdrop-blur-md shadow-sm"
            >
              <p className="text-[10px] uppercase tracking-widest text-[#FFC400] font-bold">
                {m.label}
              </p>
              <p className="mt-1 text-xs font-bold text-[#10263D] sm:text-sm">
                {m.value}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ========================= 01 · CLIENT OVERVIEW ========================= */}
      <section className="gsap-fade-section text-center mx-auto max-w-5xl px-6 py-20 border-t border-[#10263D]/8">
        <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
          01 · Client Overview
        </span>
        <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10263D] sm:text-5xl">
          Pune Has a Problem. Now It Has a Platform.
        </h2>
        <div className="gsap-line mx-auto mt-6 h-1 w-20 bg-[#FFC400] rounded-full" />
        <p className="mt-8 text-center text-base leading-relaxed text-[#64748B] sm:text-lg max-w-3xl mx-auto">
          Pune Voices is a podcast built around one idea: citizens deserve a serious platform for the issues that shape their city — urban development, civic responsibility, and genuine local dialogue.
        </p>
        <p className="mt-4 text-center text-base leading-relaxed text-[#10263D] font-medium sm:text-lg max-w-3xl mx-auto">
          AaplaEditHub has managed Pune Voices end-to-end for over two years — brand identity, video editing, social distribution, and the host's personal presence.
        </p>
      </section>

      {/* ========================== 02 · THE CHALLENGE =========================== */}
      <section className="gsap-fade-section bg-[#F8FAFC] text-center px-6 py-20 sm:py-28 border-y border-[#10263D]/8">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
            02 · The Challenge
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl text-[#10263D]">
            Compelling Conversations. Unfocused Strategy.
          </h2>
          <div className="gsap-line mx-auto mt-6 h-1 w-20 bg-[#FFC400] rounded-full" />

          <p className="mt-8 text-base text-center leading-relaxed text-[#64748B] sm:text-lg max-w-3xl mx-auto">
            The episodes were insightful, but without a dedicated visual system and distribution cadence, the show remained under-leveraged.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
            {CHALLENGES.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-2xl border border-[#10263D]/8 bg-white p-5 shadow-sm"
              >
                <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#FFC400]" />
                <span className="text-sm leading-relaxed text-[#10263D] font-medium">
                  {c}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ====================== 03 · STRATEGY & EXECUTION ======================= */}
      <section className="gsap-fade-section text-center bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
            03 · Strategy &amp; Execution
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10263D] sm:text-5xl">
            Four Strategic Phases. Cohesive Execution.
          </h2>
          <div className="gsap-line mx-auto mt-6 h-1 w-20 bg-[#FFC400] rounded-full" />

          <div className="relative mt-12 space-y-4 max-w-3xl mx-auto">
            {PHASES.map((phase, i) => (
              <motion.button
                key={phase.n}
                type="button"
                onClick={() => setActivePhase(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative flex w-full items-start gap-5 rounded-2xl p-5 text-left border transition-all duration-300 ${
                  activePhase === i
                    ? "bg-[#F8FAFC] border-[#FFC400] shadow-md"
                    : "bg-white border-[#10263D]/8 hover:border-[#10263D]/20 shadow-sm"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                    activePhase === i
                      ? "bg-[#FFC400] text-[#10263D]"
                      : "bg-[#10263D] text-white"
                  }`}
                >
                  {phase.n}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-bold text-[#10263D] font-serif">
                    {phase.title}
                  </p>
                  <AnimatePresence>
                    {activePhase === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-2 text-sm text-[#64748B] leading-relaxed"
                      >
                        {phase.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== 04 · KEY OUTCOMES =========================== */}
      <section className="gsap-fade-section text-center bg-[#F8FAFC] px-6 py-20 sm:py-28 border-t border-[#10263D]/8">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
            04 · Key Outcomes
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10263D] sm:text-5xl">
            Measurable, Compounding Impact.
          </h2>
          <div className="gsap-line mx-auto mt-6 h-1 w-20 bg-[#FFC400] rounded-full" />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((o, i) => (
              <OutcomeCard
                key={o.label}
                value={o.value}
                label={o.label}
                note={o.note}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== QUOTE ============================== */}
      <section className="gsap-fade-section relative overflow-hidden bg-white px-6 py-24 text-center">
        <div className="relative mx-auto max-w-3xl">
          <span className="text-5xl text-[#FFC400] font-serif font-bold select-none">“</span>
          <p className="-mt-3 font-serif text-xl sm:text-2xl italic leading-relaxed text-[#10263D] font-medium">
            We had energy and ideas, but no real direction. AaplaEditHub helped us understand what Pune Voices actually was — and what it could be. Once that clarity landed, everything moved faster. Our reach grew, our audience engaged genuinely, and people in Pune started recognising us by name.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#FFC400] font-bold">
            — Host &amp; Founder, Pune Voices
          </p>
        </div>
      </section>
    </div>
  );
};

export default PuneVoicesCase;
