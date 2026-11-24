import React, { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Video import
import brandVideo from "../../img/video.mp4";

// Poster images imports
import punevoice from "../../img/background.png";
import cosmicGanges from "../../img/background 2.png";
import wada from "../../img/bgImg.png";
import mitraPoster from "../../img/role1/rutu (2).png";
import unimaxPoster from "../../img/role1/pratap (1).png";

const brands = [
  {
    name: "Pune Voice",
    poster: punevoice,
    video: brandVideo,
  },
  {
    name: "Cosmic Ganges",
    poster: cosmicGanges,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    name: "Hotel Wada",
    poster: wada,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    name: "Delight Events",
    poster: mitraPoster,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    name: "Dr Auto",
    poster: unimaxPoster,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];

const Happy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % brands.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % brands.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + brands.length) % brands.length);
  };

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeIndex]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Video play failed:", err);
      });
    }
  }, [isPlaying]);

  return (
    <section className="bg-[#F8FAFC] py-24 px-5 md:px-10 lg:px-20 text-[#10263D] text-center border-t border-[#10263D]/5 font-montserrat">
      {/* Title */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#10263D]/10 text-xs font-bold text-[#1E4C73] uppercase tracking-wider mb-4 shadow-sm">
        Client Video Highlights
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel text-[#10263D] tracking-wide">
        Happy <span className="text-[#FFC400]">Customers</span>
      </h2>

      {/* Brand Pills with Glassmorphism */}
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mt-8 mb-12 max-w-5xl mx-auto">
        {brands.map((brand, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 transform active:scale-95 ${
                isActive
                  ? "bg-[#FFC400] text-[#10263D] shadow-[0_4px_15px_rgba(255,196,0,0.35)] scale-105"
                  : "bg-white text-[#10263D]/80 border border-[#10263D]/10 hover:border-[#FFC400] hover:text-[#10263D] shadow-sm"
              }`}
            >
              {brand.name}
            </button>
          );
        })}
      </div>

      {/* Main Glassmorphism Card */}
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden bg-white/95 border border-white shadow-[0_20px_50px_rgba(16,38,61,0.08)] flex flex-col md:flex-row items-stretch min-h-[350px] md:min-h-[460px]">
        {/* Left Column Accent (Subtle Blue Gradient Panel) */}
        <div className="w-full md:w-[35%] subtle-blue-gradient border-r border-[#10263D]/5 p-8 md:p-12 flex items-center justify-center text-left">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#10263D] font-cinzel leading-tight uppercase tracking-wider select-none">
            Our Customers <span className="text-[#347DBB]">Love Us</span> Because...
          </h3>
        </div>

        {/* Right Column Video Player Container */}
        <div className="w-full md:w-[65%] relative bg-[#F1F5F9] flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-full">
          {!isPlaying ? (
            /* Video Poster/Thumbnail Overlay */
            <div 
              onClick={handlePlayClick}
              className="absolute inset-0 w-full h-full cursor-pointer group overflow-hidden"
            >
              <img
                src={brands[activeIndex].poster}
                alt={`${brands[activeIndex].name} poster`}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-8"
              />

              <div className="absolute inset-0 bg-[#10263D]/25 transition-opacity duration-300 group-hover:bg-[#10263D]/15" />

              {/* Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-18 h-18 p-4 rounded-full border-2 border-white flex items-center justify-center bg-white/90 backdrop-blur-md group-hover:scale-110 group-hover:bg-[#FFC400] transition-all duration-300 shadow-[0_8px_25px_rgba(16,38,61,0.15)]">
                  <Play className="fill-[#10263D] text-[#10263D] ml-1 transition-colors" size={28} />
                </div>
                
                <span className="text-sm font-bold text-white tracking-widest uppercase drop-shadow-md">
                  WATCH STORY
                </span>
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={brands[activeIndex].video}
              controls
              autoPlay
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white text-[#10263D] hover:bg-[#FFC400] transition-all duration-300 border border-[#10263D]/10 shadow-sm hover:shadow active:scale-95 flex items-center justify-center"
          aria-label="Previous Story"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center gap-2.5">
          {brands.map((_, i) => {
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
          className="p-3 rounded-full bg-white text-[#10263D] hover:bg-[#FFC400] transition-all duration-300 border border-[#10263D]/10 shadow-sm hover:shadow active:scale-95 flex items-center justify-center"
          aria-label="Next Story"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Happy;
