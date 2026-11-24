import React, { useState } from "react";
import { motion } from "framer-motion";

import { brands } from "../data/logo";

const Feature = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the brands for infinite scrolling
  const infiniteBrands = [...brands, ...brands];

  const CARD_WIDTH = 210;

  return (
    <section className="bg-[#F8FAFC] py-[60px] overflow-hidden relative border-t border-[#10263D]/5">
      <div className="text-center">
        <div className="w-full">
          <span className="text-xs font-bold tracking-widest text-[#347DBB] uppercase mb-2 inline-block">
            Our Proven Track Record
          </span>
          <h2 className="text-[#10263D] text-[1.75rem] font-bold font-cinzel tracking-wider mb-5 uppercase">
            Trusted by <span className="text-[#FFC400]">Leading Brands</span>
          </h2>
        </div>
      </div>

      <div className="w-full py-[20px] [perspective:1700px]">
        <motion.div
          className="flex gap-[30px] p-[10px]"
          animate={isPaused ? "paused" : "animate"}
          variants={{
            animate: {
              x: [0, -(brands.length * CARD_WIDTH)],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 22,
                  ease: "linear",
                },
              },
            },
            paused: {},
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {infiniteBrands.map((brand, index) => (
            <motion.div
              key={index}
              className="group flex-shrink-0 w-[130px] h-[130px] md:w-[150px] md:h-[150px] lg:w-[165px] lg:h-[165px] rounded-2xl border border-white/80 flex items-center justify-center bg-white/90 shadow-[0_4px_20px_rgba(16,38,61,0.04)] overflow-hidden transition-all duration-300"
              whileHover={{
                scale: 1.05,
                borderColor: "#FFC400",
                boxShadow: "0 10px 30px rgba(16, 38, 61, 0.08)"
              }}
            >
              <a
                href={brand.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center bg-white hover:bg-[#F8FAFC] justify-center overflow-hidden transition-colors"
              >
                <div className="w-[120px] h-[120px] flex items-center justify-center p-4">
                  <img
                    src={brand.image}
                    loading="lazy"
                    decoding="async"
                    alt={`Brand ${index + 1}`}
                    className="
                      max-w-full
                      max-h-full
                      object-contain
                      filter grayscale hover:grayscale-0 contrast-125 transition-all duration-300
                    "
                  />
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Feature);
