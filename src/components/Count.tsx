import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgImg2 from "../img/background.png";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: 25,
    suffix: "+",
    title: "INDUSTRIES SERVED",
  },
  {
    number: 150,
    suffix: "+",
    title: "BRANDS SCALED",
  },
  {
    number: 4.6,
    suffix: "★",
    title: "CLIENT RATING",
  },
  {
    number: 5,
    suffix: "+",
    title: "YEARS EXPERIENCE",
  },
];

const Count = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = containerRef.current?.querySelector(".count-header");
    const paragraphs = containerRef.current?.querySelectorAll(".count-para");
    const cards = containerRef.current?.querySelectorAll(".count-card");

    const ctx = gsap.context(() => {
      // Header animation
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Paragraph animation
      if (paragraphs && paragraphs.length > 0) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%"
            }
          }
        );
      }

      // Cards stagger animation
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="count" ref={containerRef} className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-white border-t border-[#10263D]/5">
      {/* Subtle light background depth */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-[#347DBB]/5 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-[#FFC400]/8 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Section */}
        <div className="count-header text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#10263D]/10 text-xs font-bold text-[#1E4C73] uppercase tracking-wider mb-4 shadow-sm">
            Why Partner With Us
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#10263D] font-cinzel tracking-wide">
            Why Choose <span className="text-[#FFC400]">AaplaEditHub ?</span>
          </h2>
        </div>

        {/* Text descriptions container */}
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">

          {/* Opening Quote */}
          <p className="count-para relative inline-block text-[#10263D] font-cormorant italic text-2xl sm:text-3xl lg:text-4xl tracking-wide">
            <span className="absolute -left-6 -top-3 text-5xl text-[#FFC400]">“</span>

            <span className="text-[#10263D] font-bold">
              Strategy. Creativity. Growth.
            </span>

            <span className="absolute -right-6 bottom-0 text-5xl text-[#FFC400]">”</span>
          </p>

          {/* Frosted Glass Story Card */}
          <div className="count-para glass-card p-8 sm:p-10 rounded-3xl text-left space-y-6">
            <p className="text-[#64748B] font-montserrat text-base sm:text-lg lg:text-xl leading-relaxed">
              At <span className="text-[#10263D] font-bold">AaplaEditHub</span>, we believe great marketing isn't about being louder.
              It's about being <span className="text-[#10263D] font-semibold">clearer</span>,
              more <span className="text-[#10263D] font-semibold">memorable</span>, and
              <span className="text-[#FFC400] font-bold"> impossible to ignore.</span>
            </p>

            <p className="text-[#64748B] font-montserrat text-base sm:text-lg leading-relaxed border-l-4 border-[#FFC400] pl-5">
              We partner with businesses that want more than
              <span className="text-[#10263D] font-semibold"> vanity metrics</span>.
              They want stronger brands, authentic customer connections,
              high-intent leads, and
              <span className="text-[#347DBB] font-semibold"> sustainable revenue growth.</span>
            </p>

            <p className="text-[#64748B] font-montserrat text-base sm:text-lg leading-relaxed">
              From <span className="text-[#10263D] font-semibold">video production & editing</span> and{" "}
              <span className="text-[#10263D] font-semibold">brand design</span> to{" "}
              <span className="text-[#10263D] font-semibold">web development</span> and{" "}
              <span className="text-[#347DBB] font-semibold">performance marketing</span>,
              we build creative systems that help businesses scale today and thrive tomorrow.
            </p>
          </div>

        </div>

        {/* Count Stats Grid with Glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                className={`count-card group relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-300 cursor-pointer select-none border opacity-0 ${
                  isHovered
                    ? "bg-white border-[#FFC400] shadow-[0_20px_40px_rgba(16,38,61,0.1)] scale-[1.03] z-10"
                    : "glass-card border-white/80 scale-100"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Large Background Suffix Watermark */}
                <div className={`absolute -bottom-6 right-2 text-8xl font-black transition-colors duration-500 pointer-events-none select-none ${
                  isHovered ? "text-[#FFC400]/15" : "text-[#10263D]/5"
                }`}>
                  {item.suffix}
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-extrabold mb-3 text-[#10263D] group-hover:text-[#FFC400] transition-colors">
                  <CountUp
                    end={item.number}
                    duration={3}
                    decimals={item.number % 1 !== 0 ? 1 : 0}
                    suffix={item.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h3>

                <p className="text-xs sm:text-sm font-montserrat font-bold tracking-wider uppercase mb-1 text-[#64748B] group-hover:text-[#10263D] transition-colors duration-300">
                  {item.title}
                </p>

                {/* Ambient glow */}
                {isHovered && (
                  <div className="absolute inset-0 opacity-100 transition duration-500 pointer-events-none bg-gradient-to-br from-[#FFC400]/8 via-transparent to-[#347DBB]/8" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Count;
