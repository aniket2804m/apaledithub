import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import img1 from "../../img/role1/rushi sir.png";
import img2 from "../../img/role1/pallavi.png";
import img3 from "../../img/role1/saurabh sir (2).png";

export default function StrategyPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const [shown, setShown] = useState({
    start: false,
    middle: false,
    end: false,
  });

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setShown((prev) => ({ ...prev, start: true }));
    }, 10000); // 10 seconds so user enjoys the hero first

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercent =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercent >= 50 && !shown.middle && !showPopup) {
        setShowPopup(true);
        setShown((prev) => ({ ...prev, middle: true }));
      }

      if (scrollPercent >= 95 && !shown.end && !showPopup) {
        setShowPopup(true);
        setShown((prev) => ({ ...prev, end: true }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [shown, showPopup]);

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#10263D]/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setShowPopup(false)} />

            {/* Popup Card */}
            <motion.div
              initial={{
                scale: 0.85,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.85,
                opacity: 0,
                y: 20,
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-3xl px-6 py-8 sm:px-10 sm:py-10 z-10 text-[#10263D]"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                aria-label="Close"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#10263D]/10
                           text-[#10263D] hover:text-[#FFC400] hover:bg-[#10263D]
                           transition-all duration-300 flex items-center justify-center shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag badge */}
              <div className="flex justify-center mb-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC400]/20 border border-[#FFC400]/40 text-xs font-bold uppercase tracking-wider text-[#10263D]">
                  <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
                  Complimentary Strategy Session
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-center font-serif font-bold leading-tight text-2xl sm:text-3xl lg:text-4xl text-[#10263D]">
                Talk to a Growth Expert at
                <br />
                <span className="text-[#347DBB]">AaplaEdit</span>
                <span className="text-[#FFC400]">Hub</span>
              </h2>

              {/* Team Images */}
              <div className="flex justify-center mt-6 -space-x-3 sm:-space-x-4">
                {[img1, img2, img3].map((img, index) => {
                  const floatY = [0, index === 1 ? -6 : index === 2 ? -4 : -5, 0];
                  const delay = index * 0.15;
                  const duration = 3 + index * 0.25;

                  return (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`Expert ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1, 
                        y: floatY 
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        zIndex: 10, 
                        borderColor: "#FFC400" 
                      }}
                      transition={{
                        scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 + delay },
                        y: { repeat: Infinity, duration, ease: "easeInOut", delay }
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-[#FFC400] bg-white object-contain object-center cursor-pointer shadow-lg"
                    />
                  );
                })}
              </div>

              {/* Description */}
              <p className="text-center font-normal text-[#64748B] mt-6 text-sm sm:text-base leading-relaxed px-4">
                Book a personalized strategy call and get absolute clarity on your <br className="hidden sm:inline" />
                <span className="text-[#10263D] font-semibold">branding, content, video editing & performance growth roadmap.</span>
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center items-center gap-2.5 mt-6 text-xs sm:text-sm font-semibold text-center text-[#10263D] px-2">
                <div className="px-3.5 py-1.5 bg-[#F8FAFC] border border-[#10263D]/10 rounded-full shadow-sm">
                  ✓ Zero Spam
                </div>
                <div className="px-3.5 py-1.5 bg-[#F8FAFC] border border-[#10263D]/10 rounded-full shadow-sm">
                  ✓ 100% Actionable Insights
                </div>
                <div className="px-3.5 py-1.5 bg-[#F8FAFC] border border-[#10263D]/10 rounded-full shadow-sm">
                  ✓ Tailored Growth Audit
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    navigate("/contact");
                  }}
                  className="flex items-center gap-2 bg-[#FFC400] text-[#10263D] hover:bg-[#e6b000] px-8 py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Book Strategy Call ↗
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
