import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Real client/team images
import TejasImg from "../../img/role1/tejas (3).png";
import AnushkaImg from "../../img/role1/anushka (2).png";
import PratapImg from "../../img/role1/pratap (1).png";

const testimonials = [
  {
    name: "Tejas",
    company: "E-Commerce Founder",
    image: TejasImg,
    review:
      "Working with AaplaEditHub completely transformed our video content and social engagement. Within just a few months, our conversions surged and customer trust skyrocketed.",
  },
  {
    name: "Anushka",
    company: "Healthcare Clinic Owner",
    image: AnushkaImg,
    review:
      "Their SEO, video campaigns, and brand storytelling helped us attract high-quality local clients. The results were measurable, transparent, and exceeded all our expectations.",
  },
  {
    name: "Pratap",
    company: "Real Estate Consultant",
    image: PratapImg,
    review:
      "The creative marketing campaigns delivered qualified, high-ticket prospects consistently. The AaplaEditHub team is remarkably proactive, creative, and results-driven.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-white border-t border-[#10263D]/5 font-montserrat">
      {/* Decorative Glow */}
      <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-[#347DBB]/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-[#FFC400]/8 blur-[120px] pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#10263D]/10 text-xs font-bold text-[#1E4C73] uppercase tracking-wider mb-4 shadow-sm">
            Client Testimonials
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel leading-tight tracking-wide text-[#10263D]"
          >
            The Brands Behind <br />
            <span className="text-[#FFC400]">The Success Stories</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 font-cormorant italic text-[#1E4C73] text-xl sm:text-2xl"
          >
            “Every great partnership begins with trust and shared vision.”
          </motion.p>
        </div>

        {/* Testimonials Grid with Glassmorphism */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {testimonials.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                onMouseLeave={() => setIsAutoPlaying(true)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 cursor-pointer select-none flex flex-col justify-between ${
                  isActive
                    ? "bg-white border-2 border-[#FFC400] shadow-[0_20px_50px_rgba(16,38,61,0.12)] scale-[1.03] z-10"
                    : "glass-card bg-white/70 border-white/80 shadow-[0_10px_30px_rgba(16,38,61,0.04)] hover:bg-white hover:shadow-lg"
                } ${isActive ? "block" : "hidden md:flex"}`}
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-6 text-7xl font-bold font-serif leading-none text-[#10263D]/5 pointer-events-none">
                  “
                </div>

                <div>
                  {/* Stars Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-[#FFC400] text-[#FFC400]"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="leading-relaxed mb-8 text-base font-light text-[#10263D]/85">
                    "{item.review}"
                  </p>
                </div>

                {/* Client Profile Details */}
                <div className="flex items-center gap-4 mt-auto font-montserrat pt-4 border-t border-[#10263D]/5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className={`h-14 w-14 rounded-full object-cover shadow-md transition-all duration-300 ${
                        isActive ? "ring-2 ring-[#FFC400] scale-105" : "ring-1 ring-[#10263D]/10"
                      }`}
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full font-bold text-lg bg-[#F8FAFC] text-[#10263D] shadow-sm">
                      {item.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  )}

                  <div>
                    <h4 className="font-bold font-cinzel text-lg text-[#10263D]">
                      {item.name}
                    </h4>
                    <p className="text-xs uppercase tracking-wider text-[#64748B]">
                      {item.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Controllers */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white text-[#10263D] hover:bg-[#FFC400] hover:text-[#10263D] transition-all duration-300 border border-[#10263D]/10 shadow-sm hover:shadow active:scale-95 flex items-center justify-center"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Progress Indicators */}
          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={i}
                  animate={{
                    width: isActive ? 28 : 10,
                    backgroundColor: isActive ? "#FFC400" : "#CBD5E1"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-2 rounded-full cursor-pointer"
                  onClick={() => {
                    setActiveIndex(i);
                    setIsAutoPlaying(false);
                  }}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white text-[#10263D] hover:bg-[#FFC400] hover:text-[#10263D] transition-all duration-300 border border-[#10263D]/10 shadow-sm hover:shadow active:scale-95 flex items-center justify-center"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
