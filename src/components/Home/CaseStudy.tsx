import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Case Study Images
import puneImg from "../../img/bgImg.png";
import bushareImg from "../../img/bgImg1.png";
import clinicImg from "../../img/background 2.png";

const caseStudies = [
  {
    id: 1,
    title: "Pune Voices",
    category: "Brand Growth & Media",
    image: puneImg,
    route: "/pune",
  },
  {
    id: 2,
    title: "Bushare",
    category: "Video Campaign & Strategy",
    image: bushareImg,
    route: "/bushare",
  },
  {
    id: 3,
    title: "Clinic Growth",
    category: "Performance Marketing",
    image: clinicImg,
    route: "/clinic-growth",
  },
];

const CaseStudy = () => {
  const navigate = useNavigate();

  return (
    <section id="results" className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-[#F8FAFC] border-t border-[#10263D]/5">
      {/* Decorative Light Glow Effects */}
      <div className="absolute top-10 right-1/4 h-96 w-96 rounded-full bg-[#347DBB]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-[#FFC400]/8 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#10263D]/10 text-xs font-bold text-[#1E4C73] uppercase tracking-wider mb-4 shadow-sm">
            Featured Case Studies
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel tracking-wide text-[#10263D]"
          >
            Case Studies That{" "}
            <span className="text-[#FFC400]">
              Drive Results
            </span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-[#1E4C73] font-cormorant italic text-xl sm:text-2xl"
          >
            “Real strategies. Real growth. Real impact.”
          </motion.p>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 max-w-3xl mx-auto"
          >
            <p className="text-[#64748B] font-montserrat text-sm sm:text-base leading-relaxed">
              Discover how our creative video and digital marketing campaigns help ambitious companies scale their audience and increase conversions.
            </p>
          </motion.div>
        </div>

        {/* Portfolio Style Grid with Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              whileHover={{ y: -6 }}
              onClick={() => navigate(study.route)}
              className="glass-card group cursor-pointer p-6 rounded-3xl bg-white/95 border border-white shadow-[0_10px_30px_rgba(16,38,61,0.05)] hover:shadow-[0_20px_40px_rgba(16,38,61,0.1)] transition-all duration-300"
            >
              <div className="overflow-hidden rounded-2xl border border-[#10263D]/5 bg-[#F8FAFC] shadow-inner mb-6 relative">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-[240px] object-contain transition-transform duration-500 group-hover:scale-105 p-6"
                />
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#10263D] group-hover:bg-[#FFC400] transition-colors shadow-sm">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <span className="text-xs font-bold text-[#347DBB] uppercase tracking-wider block mb-1">
                {study.category}
              </span>

              <h3 className="text-xl font-cinzel font-bold text-[#10263D] group-hover:text-[#1E4C73] transition-colors duration-300">
                {study.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
