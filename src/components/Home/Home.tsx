import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Video,
  Layers,
  CheckCircle2,
  Instagram,
  Palette,
  Target,
  Zap,
} from "lucide-react";

import videoSrc from "../../img/video.mp4";
import cardImgSocial from "../../img/card/social media marketing.jpg.jpeg";
import cardImgBrand from "../../img/card/brand strategy 1.jpg.jpeg";
import cardImgPerform from "../../img/card/preformance marketing_.jpg.jpeg";
import cardImgWeb from "../../img/card/web devlopment_.jpg.jpeg";
import cardImgSeo from "../../img/card/SEO optimization.jpg.jpeg";
import cardImgFb from "../../img/card/facebook ads.jpg.jpeg";
import cardImgGoogle from "../../img/card/google ads.jpg.jpeg";
import cardImgLinkedin from "../../img/card/linkden ads.jpg.jpeg";

/* ------------------------------------------------------------------ */
/*  HERO SLIDER DATA WITH 4-SIDED SHOWCASE COMPOSITION                */
/* ------------------------------------------------------------------ */

interface ShowcaseCard {
  title: string;
  tag: string;
  image: string;
  link: string;
}

interface SlideData {
  id: number;
  tag: string;
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgGradient: string;
  accentColor: string;
  mainImage: string;
  mainBadge: string;
  cardTopRight: ShowcaseCard;
  cardBottomRight: ShowcaseCard;
  cardBottomLeft: ShowcaseCard;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    tag: "SOCIAL MEDIA GROWTH",
    headlineBefore: "WE CREATE ",
    headlineHighlight: "DIGITAL IMPACT.",
    headlineAfter: "",
    description:
      "Transform your brand into a powerful digital presence with creative strategies, engaging content and impactful social media campaigns that captivate audiences.",
    ctaText: "EXPLORE OUR SERVICES",
    ctaLink: "/card",
    secondaryCtaText: "BOOK A STRATEGY CALL",
    secondaryCtaLink: "/contact",
    bgGradient: "from-[#050B18] via-[#0A1A2E] to-[#10263D]",
    accentColor: "#FFC400",
    mainImage: cardImgSocial,
    mainBadge: "VIRAL SOCIAL SUITE",
    cardTopRight: {
      title: "Viral Reels & Clips",
      tag: "4.4M+ Views",
      image: cardImgPerform,
      link: "/work",
    },
    cardBottomRight: {
      title: "Social Media Grid",
      tag: "+180% Reach",
      image: cardImgFb,
      link: "/social",
    },
    cardBottomLeft: {
      title: "Content Strategy",
      tag: "85K Shares",
      image: cardImgLinkedin,
      link: "/linkdin",
    },
  },
  {
    id: 2,
    tag: "CREATIVE BRANDING",
    headlineBefore: "YOUR BRAND. OUR ",
    headlineHighlight: "CREATIVE VISION.",
    headlineAfter: "",
    description:
      "From stunning graphics to unforgettable brand identities, we craft visuals that carve out a distinctive place in your market and make your business stand out.",
    ctaText: "DISCOVER OUR CREATIVITY",
    ctaLink: "/brand",
    secondaryCtaText: "VIEW PORTFOLIO",
    secondaryCtaLink: "/work",
    bgGradient: "from-[#040814] via-[#0D1D30] to-[#163654]",
    accentColor: "#347DBB",
    mainImage: cardImgBrand,
    mainBadge: "BRAND IDENTITY & PACKAGING",
    cardTopRight: {
      title: "Brand Guidelines",
      tag: "Visual System",
      image: cardImgWeb,
      link: "/brand",
    },
    cardBottomRight: {
      title: "Luxury Logo Suite",
      tag: "Distinctive",
      image: cardImgSocial,
      link: "/brand",
    },
    cardBottomLeft: {
      title: "Editorial Palette",
      tag: "Consistent Voice",
      image: cardImgSeo,
      link: "/brand",
    },
  },
  {
    id: 3,
    tag: "VIDEO EDITING & REELS",
    headlineBefore: "VIDEOS THAT ",
    headlineHighlight: "CAPTURE ATTENTION.",
    headlineAfter: "",
    description:
      "Professional reels, promotional brand videos and cinematic edits designed with precision pacing, sound design, and storytelling that hook viewers instantly.",
    ctaText: "VIEW OUR WORK",
    ctaLink: "/work",
    secondaryCtaText: "WATCH SHOWREEL",
    secondaryCtaLink: "#showreel",
    bgGradient: "from-[#060D1E] via-[#0F2238] to-[#1A3F63]",
    accentColor: "#FFC400",
    mainImage: cardImgPerform,
    mainBadge: "4K CINEMATIC EDITING",
    cardTopRight: {
      title: "Cinematic 4K Cut",
      tag: "60 FPS Pacing",
      image: cardImgFb,
      link: "/work",
    },
    cardBottomRight: {
      title: "Sound Design & SFX",
      tag: "92% Retention",
      image: cardImgSocial,
      link: "/work",
    },
    cardBottomLeft: {
      title: "Dynamic Hooks",
      tag: "Viral Delivery",
      image: cardImgGoogle,
      link: "/work",
    },
  },
  {
    id: 4,
    tag: "DIGITAL MARKETING",
    headlineBefore: "MAKE YOUR BRAND ",
    headlineHighlight: "IMPOSSIBLE TO IGNORE.",
    headlineAfter: "",
    description:
      "Smart digital strategies, high-converting ad creative and powerful brand storytelling calibrated to scale your reach and take your business to the next level.",
    ctaText: "LET'S WORK TOGETHER",
    ctaLink: "/contact",
    secondaryCtaText: "EXPLORE CASE STUDIES",
    secondaryCtaLink: "/case",
    bgGradient: "from-[#050B18] via-[#0E2034] to-[#10263D]",
    accentColor: "#FFC400",
    mainImage: cardImgGoogle,
    mainBadge: "PERFORMANCE AD ENGINE",
    cardTopRight: {
      title: "Meta Ads Scaling",
      tag: "3.8X ROAS",
      image: cardImgFb,
      link: "/perform",
    },
    cardBottomRight: {
      title: "High-Intent Leads",
      tag: "Google Search",
      image: cardImgPerform,
      link: "/google",
    },
    cardBottomLeft: {
      title: "Creative Ads",
      tag: "2.9% CVR",
      image: cardImgBrand,
      link: "/perform",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  AGENCY CAPABILITIES DATA                                          */
/* ------------------------------------------------------------------ */

const AGENCY_SERVICES = [
  {
    icon: Instagram,
    title: "Social Media Management",
    desc: "Complete end-to-end social media growth: strategic monthly content calendars, viral reels, community engagement, and brand authority.",
    link: "/social",
    tag: "Growth Engine",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Stunning marketing banners, carousel designs, promotional ad creatives, and print media built with editorial precision.",
    link: "/brand",
    tag: "Visual Design",
  },
  {
    icon: Video,
    title: "Video Editing & Reels",
    desc: "Fast-paced Instagram reels, YouTube shorts, podcast edits, and corporate brand videos with cinematic sound design and motion typography.",
    link: "/work",
    tag: "High Retention",
  },
  {
    icon: Sparkles,
    title: "Brand Identity Design",
    desc: "Complete visual identity systems: bespoke logos, brand guidelines, typography hierarchies, and luxury packaging aesthetics.",
    link: "/brand",
    tag: "Distinctive",
  },
  {
    icon: Target,
    title: "Digital Marketing",
    desc: "Targeted Meta & Google ad campaigns engineered for measurable conversions, qualified lead generation, and customer acquisition.",
    link: "/perform",
    tag: "Conversion",
  },
  {
    icon: Layers,
    title: "Content Creation",
    desc: "Compelling narrative storytelling, high-impact copywriting, and visual assets tailored specifically to platform algorithm behavior.",
    link: "/linkdin",
    tag: "Engagement",
  },
  {
    icon: TrendingUp,
    title: "Instagram Marketing",
    desc: "Audience growth strategies, organic reach optimization, hashtag engineering, and influencer collaboration architecture.",
    link: "/facebook",
    tag: "Organic Reach",
  },
  {
    icon: Zap,
    title: "Promotional Campaigns",
    desc: "Omnichannel promotional launches, product drop rollouts, seasonal campaigns, and event marketing that ignite buzz and sales.",
    link: "/google",
    tag: "High Impact",
  },
];

/* ------------------------------------------------------------------ */
/*  CREATIVE PROCESS DATA                                             */
/* ------------------------------------------------------------------ */

const CREATIVE_PROCESS = [
  {
    step: "01",
    title: "Understand Your Brand",
    desc: "We deep-dive into your core ethos, target market psychology, competitor landscape, and growth objectives.",
  },
  {
    step: "02",
    title: "Creative Strategy",
    desc: "We architect an actionable content system, visual aesthetic guidelines, and creative angles built for maximum retention.",
  },
  {
    step: "03",
    title: "Design & Content Creation",
    desc: "Our editors, designers, and copywriters produce high-end reels, graphics, and campaigns with obsessive attention to craft.",
  },
  {
    step: "04",
    title: "Review & Refinement",
    desc: "Iterative polishing, audio grading, color correction, and client alignment ensure the deliverable is immaculate.",
  },
  {
    step: "05",
    title: "Final Delivery & Scale",
    desc: "We deploy optimized content across channels, tracking real-world reach, engagement, and performance data to compound results.",
  },
];

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 5500;
  const PROGRESS_TICK = 50;

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setSlideProgress(0);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setSlideProgress(0);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setSlideProgress(0);
  };

  useEffect(() => {
    if (isPaused || showVideoModal) return;

    const interval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        return prev + (PROGRESS_TICK / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(interval);
  }, [isPaused, showVideoModal, handleNextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="w-full overflow-x-hidden bg-white text-[#10263D] font-montserrat">
      {/* ------------------------------------------------------------------ */}
      {/* 1. CINEMATIC FULL-SCREEN HERO SLIDER WITH ARCHED 4-CARD SHOWCASE   */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="home"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#050B18] text-white pt-24 pb-16 select-none"
      >
        {/* Dynamic Animated Cinematic Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} pointer-events-none`}
          >
            {/* Ambient Lighting Cones */}
            <div className="absolute top-0 right-1/4 w-[650px] h-[650px] rounded-full bg-[#347DBB]/15 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[550px] h-[550px] rounded-full bg-[#FFC400]/10 blur-[150px] pointer-events-none" />
            
            {/* Studio Workspace Radial Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(52,125,187,0.22),rgba(5,11,24,0.96))]" />

            {/* Subtle Creative Studio Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Slide Typography & CTAs (6 cols) */}
            <div className="lg:col-span-6 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#FFC400] animate-pulse" />
                    <span className="text-xs font-bold tracking-[0.25em] text-[#FFC400] uppercase">
                      {slide.tag}
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-serif font-extrabold text-4xl sm:text-6xl md:text-7xl xl:text-[5rem] leading-[1.05] tracking-tight text-white mb-6">
                    {slide.headlineBefore}
                    <span className="text-[#FFC400] relative inline-block">
                      {slide.headlineHighlight}
                      <motion.span
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute -bottom-1.5 left-0 h-[4px] bg-gradient-to-r from-[#FFC400] via-[#347DBB] to-transparent rounded-full"
                      />
                    </span>
                    {slide.headlineAfter}
                  </h1>

                  {/* Description */}
                  <p className="max-w-xl text-white/80 text-base sm:text-lg font-normal leading-relaxed mb-8">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to={slide.ctaLink}
                      className="inline-flex items-center gap-3 bg-[#FFC400] text-[#050B18] font-bold px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(255,196,0,0.35)] hover:bg-[#e6b000] hover:shadow-[0_14px_35px_rgba(255,196,0,0.5)] hover:scale-105 transition-all duration-300"
                    >
                      {slide.ctaText}
                      <ArrowRight className="w-4 h-4 text-[#050B18]" />
                    </Link>

                    {slide.secondaryCtaLink.startsWith("#") ? (
                      <button
                        onClick={() => setShowVideoModal(true)}
                        className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all duration-300"
                      >
                        <Play className="w-4 h-4 text-[#FFC400] fill-[#FFC400]" />
                        {slide.secondaryCtaText}
                      </button>
                    ) : (
                      <Link
                        to={slide.secondaryCtaLink}
                        className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all duration-300"
                      >
                        {slide.secondaryCtaText}
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Arched Center Hero Visual + 3 Surrounding Floating Cards with Arrow Buttons (6 cols) */}
            <div className="lg:col-span-6 relative flex justify-center items-center py-8">
              <div className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-[4/4.2] flex items-center justify-center">
                
                {/* 1. Elegant Golden Ambient Circular Rings (like reference image) */}
                <div className="absolute -inset-4 sm:-inset-8 rounded-full border border-[#FFC400]/25 pointer-events-none -z-10" />
                <div className="absolute -inset-10 sm:-inset-16 rounded-full border border-[#347DBB]/20 pointer-events-none -z-10 border-dashed animate-[spin_60s_linear_infinite]" />

                {/* 2. Main Central Arched Hero Showcase Window */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-[65%] sm:w-[60%] h-[88%] rounded-t-full rounded-b-[40px] overflow-hidden border-2 border-white/30 bg-gradient-to-b from-[#10263D] to-[#050B18] shadow-[0_25px_60px_rgba(0,0,0,0.6)] group"
                  >
                    <img
                      src={slide.mainImage}
                      alt={slide.tag}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-transparent opacity-75" />

                    {/* Central bottom badge */}
                    <div className="absolute bottom-5 left-4 right-4 text-center z-10">
                      <span className="inline-block text-[9px] font-bold tracking-widest uppercase bg-[#FFC400] text-[#050B18] px-3 py-1 rounded-full shadow-md">
                        {slide.mainBadge}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* 3. CARD 1 (Top-Right Floating Showcase Card with Arrow Button) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`tr-${slide.id}`}
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="absolute -top-2 -right-2 sm:-right-4 w-[170px] sm:w-[205px] bg-white rounded-2xl p-2 sm:p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.45)] border border-white/80 z-20 hover:scale-105 transition-all duration-300 group"
                  >
                    <Link to={slide.cardTopRight.link} className="block">
                      <div className="relative w-full h-20 sm:h-24 rounded-xl overflow-hidden bg-[#0A1A2E] mb-2">
                        <img
                          src={slide.cardTopRight.image}
                          alt={slide.cardTopRight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-1.5 left-1.5">
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-black/60 text-[#FFC400] px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {slide.cardTopRight.tag}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <span className="font-bold text-[11px] sm:text-xs text-[#10263D] truncate max-w-[120px]">
                          {slide.cardTopRight.title}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#FFC400] text-[#10263D] flex items-center justify-center font-bold text-[11px] shadow group-hover:rotate-45 transition-transform">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* 4. CARD 2 (Bottom-Right Floating Showcase Card with Arrow Button) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`br-${slide.id}`}
                    initial={{ opacity: 0, y: 20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-4 -right-2 sm:-right-4 w-[170px] sm:w-[205px] bg-white rounded-2xl p-2 sm:p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.45)] border border-white/80 z-20 hover:scale-105 transition-all duration-300 group"
                  >
                    <Link to={slide.cardBottomRight.link} className="block">
                      <div className="relative w-full h-20 sm:h-24 rounded-xl overflow-hidden bg-[#0A1A2E] mb-2">
                        <img
                          src={slide.cardBottomRight.image}
                          alt={slide.cardBottomRight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-1.5 left-1.5">
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-black/60 text-[#FFC400] px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {slide.cardBottomRight.tag}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <span className="font-bold text-[11px] sm:text-xs text-[#10263D] truncate max-w-[120px]">
                          {slide.cardBottomRight.title}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#FFC400] text-[#10263D] flex items-center justify-center font-bold text-[11px] shadow group-hover:rotate-45 transition-transform">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* 5. CARD 3 (Bottom-Left Floating Showcase Card with Arrow Button) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`bl-${slide.id}`}
                    initial={{ opacity: 0, y: 20, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute -bottom-4 left-0 sm:-left-4 w-[170px] sm:w-[205px] bg-white rounded-2xl p-2 sm:p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.45)] border border-white/80 z-20 hover:scale-105 transition-all duration-300 group"
                  >
                    <Link to={slide.cardBottomLeft.link} className="block">
                      <div className="relative w-full h-20 sm:h-24 rounded-xl overflow-hidden bg-[#0A1A2E] mb-2">
                        <img
                          src={slide.cardBottomLeft.image}
                          alt={slide.cardBottomLeft.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-1.5 left-1.5">
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-black/60 text-[#FFC400] px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {slide.cardBottomLeft.tag}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <span className="font-bold text-[11px] sm:text-xs text-[#10263D] truncate max-w-[120px]">
                          {slide.cardBottomLeft.title}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#FFC400] text-[#10263D] flex items-center justify-center font-bold text-[11px] shadow group-hover:rotate-45 transition-transform">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>

          {/* Slider Bottom Controls: Counter, Progress Bars, Prev/Next Arrows */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
            
            {/* Slide Counter (01 / 04) */}
            <div className="flex items-center gap-3 font-serif">
              <span className="text-2xl font-bold text-[#FFC400]">
                0{slide.id}
              </span>
              <span className="text-white/30 text-lg">/</span>
              <span className="text-sm font-semibold text-white/50">
                0{HERO_SLIDES.length}
              </span>
            </div>

            {/* Slide Progress Indicator Tabs */}
            <div className="flex items-center gap-2 sm:gap-3">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className="group relative py-2 text-left"
                  aria-label={`Go to slide ${s.id}`}
                >
                  <div className="w-12 sm:w-20 md:w-28 h-1.5 rounded-full bg-white/15 overflow-hidden transition-all duration-300 group-hover:bg-white/30">
                    {idx === currentSlide && (
                      <motion.div
                        className="h-full bg-[#FFC400]"
                        style={{ width: `${slideProgress}%` }}
                      />
                    )}
                  </div>
                  <span
                    className={`hidden md:block text-[10px] uppercase tracking-wider mt-1.5 transition-colors font-bold ${
                      idx === currentSlide ? "text-[#FFC400]" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {s.tag.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Prev / Next Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSlide}
                aria-label="Previous Slide"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#FFC400] text-white hover:text-[#050B18] border border-white/15 flex items-center justify-center transition-all duration-300 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                aria-label="Next Slide"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#FFC400] text-white hover:text-[#050B18] border border-white/15 flex items-center justify-center transition-all duration-300 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. STATS & AGENCY IMPACT BANNER                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative py-12 bg-[#F8FAFC] border-b border-[#10263D]/8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <span className="block font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#10263D]">
                <span className="text-[#FFC400]">150</span>+
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wider text-[#64748B] font-semibold mt-1 block">
                Brands Scaled
              </span>
            </div>
            <div className="p-4">
              <span className="block font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#10263D]">
                <span className="text-[#347DBB]">4.4M</span>+
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wider text-[#64748B] font-semibold mt-1 block">
                Organic Reel Views
              </span>
            </div>
            <div className="p-4">
              <span className="block font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#10263D]">
                <span className="text-[#FFC400]">400</span>+
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wider text-[#64748B] font-semibold mt-1 block">
                Creative Campaigns
              </span>
            </div>
            <div className="p-4">
              <span className="block font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#10263D]">
                <span className="text-[#347DBB]">99</span>%
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wider text-[#64748B] font-semibold mt-1 block">
                Client Satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. CORE SERVICES GRID SECTION                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-[#10263D]/10 shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#10263D] font-bold">
                Our Capabilities
              </span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[#10263D] tracking-tight">
              High-Impact Services for <br />
              <span className="text-[#347DBB]">High-Growth Brands</span>
            </h2>
            <p className="mt-4 text-[#64748B] text-base sm:text-lg">
              We combine artistic vision with social platform algorithms to create content that captivates and converts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGENCY_SERVICES.map((serv, index) => {
              const Icon = serv.icon;
              return (
                <motion.div
                  key={serv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group rounded-3xl bg-white border border-[#10263D]/8 p-7 shadow-sm hover:shadow-xl hover:border-[#FFC400] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF5FC] border border-[#10263D]/10 flex items-center justify-center text-[#10263D] group-hover:bg-[#FFC400] group-hover:border-[#FFC400] transition-all duration-300 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F8FAFC] text-[#64748B] border border-[#10263D]/5">
                        {serv.tag}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#10263D] group-hover:text-[#347DBB] transition-colors mb-3">
                      {serv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
                      {serv.desc}
                    </p>
                  </div>

                  <Link
                    to={serv.link}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10263D] group-hover:text-[#FFC400] transition-colors"
                  >
                    Explore Service
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. CREATIVE PROCESS TIMELINE                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-24 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF5FC] border-y border-[#10263D]/8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#347DBB] font-bold">
              The Blueprint
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#10263D] mt-2">
              Our 5-Step Creative Process
            </h2>
            <p className="mt-4 text-[#64748B] text-base sm:text-lg">
              Structured execution so your campaigns launch on time, on brand, and on target.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {CREATIVE_PROCESS.map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-white/90 backdrop-blur-md border border-[#10263D]/8 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-[#FFC400] transition-all"
              >
                <span className="text-2xl font-serif font-bold text-[#FFC400] block mb-3">
                  {p.step}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#10263D] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. WHY CHOOSE AAPLAEDITHUB                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#FFC400] font-bold">
                Why AaplaEditHub
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#10263D] mt-2 leading-tight">
                Creativity Designed to <br />
                <span className="text-[#347DBB]">Command Attention</span>
              </h2>
              <p className="mt-6 text-[#64748B] text-base sm:text-lg leading-relaxed">
                Most agencies give you cookie-cutter templates. We build bespoke visual systems, viral-pacing reels, and high-impact digital experiences that turn casual scrollers into loyal customers.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Creative Excellence across every frame & asset",
                  "Algorithm-optimized pacing for maximum retention",
                  "Unique brand positioning that sets you apart from competitors",
                  "End-to-end production: concept, shooting direction, edit & launch",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC400] flex-shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-[#10263D]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-[#10263D] text-white hover:bg-[#1E4C73] px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg transition-all"
                >
                  Start Your Growth Journey
                  <ArrowRight className="w-4 h-4 text-[#FFC400]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#10263D]/10 bg-gradient-to-br from-[#050B18] to-[#10263D] p-8 text-white">
                <span className="text-xs uppercase tracking-[0.25em] text-[#FFC400] font-bold block mb-4">
                  Studio Philosophy
                </span>
                <blockquote className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                  “Attention gets you noticed. <br />
                  <span className="text-[#FFC400]">Strategy keeps you remembered.”</span>
                </blockquote>
                <p className="mt-6 text-sm text-white/70 leading-relaxed">
                  We don’t believe in vanity metrics without business substance. Everything we cut, design, and market is engineered to move real numbers.
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-white text-base">
                      Rushikesh Hande
                    </span>
                    <span className="block text-xs text-[#FFC400] font-semibold uppercase tracking-wider">
                      Founder, AaplaEditHub
                    </span>
                  </div>
                  <Link
                    to="/about"
                    className="text-xs uppercase tracking-wider font-bold text-white hover:text-[#FFC400] transition-colors"
                  >
                    About Us →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. FULLSCREEN VIDEO SHOWREEL MODAL                                */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#050B18]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/20 aspect-video flex items-center justify-center"
            >
              <video
                src={videoSrc}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowVideoModal(false)}
                aria-label="Close Showreel"
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/70 hover:bg-[#FFC400] text-white hover:text-[#050B18] border border-white/20 flex items-center justify-center transition-all shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
