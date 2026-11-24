"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, MousePointer } from "lucide-react";

// Image Imports
import img1 from "../../img/bgImg.png";
import img2 from "../../img/bgImg1.png";
import img3 from "../../img/img6.png";
import img4 from "../../img/bgImg.png";
import img5 from "../../img/bgImg1.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Real Estate Platform",
    image: img1,
  },
  {
    title: "Architecture Agency",
    image: img2,
  },
  {
    title: "Sports Brand",
    image: img3,
  },
  {
    title: "E-Commerce Store",
    image: img4,
  },
  {
    title: "Hospitality Portal",
    image: img5,
  },
  {
    title: "Lifestyle & Media Showcase",
    image: img3,
  },
  {
    title: "Corporate Growth Platform",
    image: img1,
  },
];

// Reusable 3D Laptop Mockup
function LaptopMockup({ project, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  return (
    <div 
      className="work-card absolute flex flex-col items-center select-none cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
      onClick={onClick}
    >
      {/* Screen Lid */}
      <div 
        className="laptop-screen-lid relative w-full aspect-[16/10] bg-[#1d1e22] rounded-t-[18px] p-2 border-2 border-[#2b2c30] shadow-2xl laptop-screen-border z-10 flex flex-col justify-between"
        style={{ transformStyle: "preserve-3d", transformOrigin: "bottom center" }}
      >
        {/* Bezel */}
        <div className="w-full h-full bg-black rounded-[8px] p-[6px] relative overflow-hidden flex flex-col justify-between">
          {/* Inner Display Area (Contains Website Screenshot Image) */}
          <div className="w-full h-full bg-[#0c0c0e] overflow-visible rounded-[3px] relative">
            <img 
              src={project.image} 
              alt={project.title} 
              loading="lazy"
              decoding="async"
              className="laptop-screen-image w-full h-full object-contain object-top select-none pointer-events-none" 
            />
            {/* Screen Glass Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-25" />
          </div>
          {/* Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[8px] bg-black rounded-b-[4px] z-30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#141416] rounded-full border border-[#2c2c2f]" />
          </div>
        </div>
      </div>

      {/* Screen Hinge */}
      <div className="w-[96%] h-[7px] bg-[#0c0d0f] border-b border-[#1c1d20] z-10" />

      {/* Keyboard Base */}
      <div 
        className="relative w-[105%] h-[55px] bg-gradient-to-b from-[#2a2b2e] via-[#1a1b1d] to-[#0e0f11] rounded-b-[14px] border-t border-[#46474a] shadow-[0_12px_28px_rgba(0,0,0,0.5)] z-0 flex flex-col items-center justify-start pt-[3px] px-8 overflow-hidden"
        style={{
          transform: "rotateX(55deg) translateZ(-6px)",
          transformOrigin: "top center",
        }}
      >
        {/* Keyboard area recess */}
        <div className="w-[92%] h-[20px] bg-[#111214] rounded-[4px] border border-[#232427] flex flex-col justify-between p-[1.5px]">
          {/* Key Rows simulation */}
          {Array.from({ length: 4 }).map((_, rIndex) => (
            <div key={rIndex} className="flex gap-[2px] h-[2.5px]">
              {Array.from({ length: 15 }).map((_, kIndex) => (
                <div 
                  key={kIndex} 
                  className={`flex-grow bg-[#1d1e21] rounded-[0.5px] border-b border-black/50 ${
                    rIndex === 3 && kIndex === 7 ? "flex-[4]" : ""
                  }`} 
                />
              ))}
            </div>
          ))}
        </div>
        {/* Trackpad area */}
        <div className="w-[26%] h-[16px] bg-gradient-to-b from-[#18191b] to-[#0d0e10] rounded-[3px] border border-[#2b2c30] mt-1 shadow-inner" />
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const animProgress = useRef({ val: 0 });
  const lastScrollTime = useRef(0);
  const touchStart = useRef({ x: 0, y: 0 });

  const updateCardPositions = (progress: number) => {
    const cards = gsap.utils.toArray(".work-card");
    if (cards.length === 0) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sectionHeight = vh - 220;
    
    const cardWidth = Math.max(280, Math.min(vw * 0.75, (sectionHeight * 0.52 - 30) * 1.6, 850));
    const spacing = cardWidth * 0.42;
    const centerOffset = cardWidth * 0.48 + (vw < 768 ? 20 : 60);

    cards.forEach((card: any, index) => {
      const diff = index - progress;
      const absDiff = Math.abs(diff);

      let x = 0;
      let scale = 1;
      let rotateY = 0;
      let rotateX = 0;
      let rotateZ = 0;
      let opacity = 1;
      let zIndex = 40 - Math.round(absDiff * 10);
      let borderGlow = 0;

      if (diff === 0) {
        x = 0;
        scale = 1.02;
        rotateY = 0;
        rotateX = 0;
        rotateZ = 0;
        opacity = 1;
        borderGlow = 1;
      } else if (diff > 0) {
        x = centerOffset + (diff - 1) * spacing;
        scale = Math.max(0.55, 0.8 - (diff - 1) * 0.08);
        rotateY = vw < 768 ? -20 : -35;
        rotateX = 4;
        rotateZ = 1.5 + (diff - 1) * 0.5;
        opacity = Math.max(0.2, 0.75 - (diff - 1) * 0.25);
        borderGlow = 0;
      } else {
        x = -centerOffset + (diff + 1) * spacing;
        scale = Math.max(0.55, 0.8 - (Math.abs(diff) - 1) * 0.08);
        rotateY = vw < 768 ? 20 : 35;
        rotateX = 4;
        rotateZ = -1.5 - (Math.abs(diff) - 1) * 0.5;
        opacity = Math.max(0.2, 0.75 - (Math.abs(diff) - 1) * 0.25);
        borderGlow = 0;
      }

      // Interpolation transition region
      if (absDiff < 1) {
        borderGlow = 1 - absDiff;
        scale = scale + (1.02 - scale) * (1 - absDiff);
        x = x * absDiff;
        rotateY = rotateY * absDiff;
        rotateX = rotateX * absDiff;
        rotateZ = rotateZ * absDiff;
      }

      gsap.set(card, {
        width: cardWidth,
        x: x,
        scale: scale,
        rotationY: rotateY,
        rotationX: rotateX,
        rotationZ: rotateZ,
        zIndex: zIndex,
        opacity: opacity,
        transformPerspective: 1500,
      });

      // 3D Screen Lid Hinge open/close and Parallax shifts
      const lidEl = card.querySelector(".laptop-screen-lid");
      if (lidEl) {
        const lidRotX = Math.min(65, absDiff * 65);
        gsap.set(lidEl, {
          rotationX: -lidRotX,
          transformPerspective: 1000,
          transformOrigin: "bottom center",
        });
      }

      const imgEl = card.querySelector(".laptop-screen-image");
      if (imgEl) {
        gsap.set(imgEl, {
          xPercent: diff * -12,
        });
      }

      const borderEl = card.querySelector(".laptop-screen-border");
      if (borderEl) {
        gsap.set(borderEl, {
          borderColor: `rgba(255, 196, 0, ${borderGlow})`,
          boxShadow: `0 0 ${25 * borderGlow}px rgba(255, 196, 0, ${0.45 * borderGlow})`,
        });
      }
    });
  };

  useEffect(() => {
    updateCardPositions(animProgress.current.val);

    const handleResize = () => {
      updateCardPositions(animProgress.current.val);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    gsap.to(animProgress.current, {
      val: activeIndex,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: () => {
        updateCardPositions(animProgress.current.val);
      }
    });
  }, [activeIndex]);

  const navigateToCard = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 800) {
      return;
    }

    const threshold = 15;
    if (Math.abs(e.deltaY) > threshold || Math.abs(e.deltaX) > threshold) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        if (activeIndex < projects.length - 1) {
          setActiveIndex(prev => prev + 1);
          lastScrollTime.current = now;
        }
      } else {
        if (activeIndex > 0) {
          setActiveIndex(prev => prev - 1);
          lastScrollTime.current = now;
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 800) return;

    const deltaX = e.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.current.y;
    
    const threshold = 50;
    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          if (activeIndex < projects.length - 1) {
            setActiveIndex(prev => prev + 1);
            lastScrollTime.current = now;
          }
        } else {
          if (activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
            lastScrollTime.current = now;
          }
        }
      } else {
        if (deltaY < 0) {
          if (activeIndex < projects.length - 1) {
            setActiveIndex(prev => prev + 1);
            lastScrollTime.current = now;
          }
        } else {
          if (activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
            lastScrollTime.current = now;
          }
        }
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-white text-[#10263D]"
    >
      <div
        ref={pinContainerRef}
        className="relative w-full h-full flex flex-col justify-between pt-28 pb-8 px-4 md:px-8 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF5FC]"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header Info */}
        <div className="relative z-[45] text-center select-none">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#10263D]/10 shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FFC400]"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#10263D] font-bold">
              Digital Craftsmanship
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#10263D]">
            {projects[activeIndex].title}
          </h2>
        </div>

        {/* Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,125,187,0.06),transparent_65%)] pointer-events-none mt-10" />

        {/* Coverflow Carousel Wrapper */}
        <div className="relative w-full flex-grow flex items-center justify-center perspective-[2000px] transform-style-[preserve-3d] my-2">
          {projects.map((project, index) => (
            <LaptopMockup
              key={index}
              project={project}
              index={index}
              onClick={() => navigateToCard(index)}
            />
          ))}
        </div>

        {/* Bottom Controls / Indicator bar */}
        <div className="relative z-40 flex flex-col items-center gap-3 px-6 pb-2">
          {/* Navigation Arrows & Index details */}
          <div className="flex items-center gap-5 bg-white/90 border border-[#10263D]/12 px-6 py-2.5 rounded-full backdrop-blur-xl shadow-lg select-none">
            <button 
              onClick={handlePrev} 
              disabled={activeIndex === 0}
              aria-label="Previous Project"
              className="w-8 h-8 rounded-full border border-[#10263D]/15 hover:bg-[#FFC400] hover:border-[#FFC400] flex items-center justify-center disabled:opacity-25 transition-all duration-300 text-[#10263D]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="text-xs text-[#10263D] font-bold tracking-widest uppercase">
              Project <span className="text-[#FFC400] font-extrabold">{activeIndex + 1}</span> of {projects.length}
            </div>

            <button 
              onClick={handleNext} 
              disabled={activeIndex === projects.length - 1}
              aria-label="Next Project"
              className="w-8 h-8 rounded-full border border-[#10263D]/15 hover:bg-[#FFC400] hover:border-[#FFC400] flex items-center justify-center disabled:opacity-25 transition-all duration-300 text-[#10263D]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Scroll helper tag */}
          <div className="flex items-center gap-1.5 text-[#64748B] text-[10px] uppercase tracking-[2px] font-medium">
            <MousePointer className="w-3.5 h-3.5 text-[#FFC400]" />
            <span>Scroll or swipe to cycle projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}
