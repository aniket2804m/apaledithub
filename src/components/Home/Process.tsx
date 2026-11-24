import React, { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import bgImg1 from "../../img/background.png";
import { steps } from "../../components/data/process";

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Track the vertical scroll progress of the Process section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active step index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(Math.floor(latest * steps.length), steps.length - 1);
    setActiveStep(step);
  });

  // Smooth scroll to a specific step when clicking progress dots
  const handleDotClick = (i: number) => {
    if (containerRef.current) {
      const offsetTop = containerRef.current.offsetTop;
      const stepScrollDistance = window.innerHeight;
      window.scrollTo({
        top: offsetTop + i * stepScrollDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={containerRef} className="relative h-[500vh] md:h-[400vh] w-full border-t border-[#10263D]/5 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Ambient Subtle Blue/Yellow Light Orbs */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#347DBB]/6 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FFC400]/8 blur-[120px]" />
        </div>
        
        {/* Step details stacked absolutely with animations */}
        <div className="relative w-full h-full max-w-5xl mx-auto flex items-center justify-center">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const isPast = index < activeStep;
            const isFuture = index > activeStep;

            let yVal = 0;
            if (isPast) yVal = -40;
            if (isFuture) yVal = 40;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.97,
                  y: yVal,
                  pointerEvents: isActive ? "auto" : "none"
                }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 text-center"
              >
                {/* Step badge */}
                <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white shadow-sm text-xs font-bold text-[#1E4C73] uppercase tracking-wider">
                  Step {String(index + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
                </div>

                <div className="mb-6 flex justify-center">
                  <div className="p-4 sm:p-5 rounded-3xl glass-card shadow-lg border border-white">
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      decoding="async"
                      className="
                        w-16 h-16
                        sm:w-20 sm:h-20
                        md:w-24 md:h-24
                        object-contain
                      "
                    />
                  </div>
                </div>

                <motion.h3
                  className="
                    relative
                    inline-block
                    text-3xl
                    sm:text-4xl
                    md:text-5xl
                    lg:text-6xl
                    font-extrabold
                    font-cinzel
                    tracking-wide
                    mb-8
                    text-[#10263D]
                  "
                >
                  {step.title}

                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-[#10263D] via-[#FFC400] to-[#347DBB]"
                  />
                </motion.h3>

                <div className="glass-card max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl shadow-md border border-white/80">
                  <p className="text-sm sm:text-base md:text-lg font-montserrat text-[#64748B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar with smooth rounded indicators */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 sm:gap-3 z-50 glass px-5 py-3 rounded-full border border-white shadow-sm">
          {steps.map((_, i) => {
            const isActive = activeStep === i;

            return (
              <motion.div
                key={i}
                onClick={() => handleDotClick(i)}
                animate={{
                  width: isActive ? 44 : 12,
                  backgroundColor: isActive ? "#FFC400" : "#CBD5E1",
                  boxShadow: isActive ? "0 2px 10px rgba(255, 196, 0, 0.5)" : "none"
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className="
                  h-2.5
                  rounded-full
                  cursor-pointer
                "
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Process;
