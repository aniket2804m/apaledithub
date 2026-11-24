import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles, Star, CheckCircle } from "lucide-react";
import brandVideo from "../../img/video.mp4";
import videoPosterImg from "../../img/background.png";
import poster2 from "../../img/background 2.png";
import poster3 from "../../img/bgImg.png";
import poster4 from "../../img/bgImg1.png";

interface VideoGalleryItem {
  id: number;
  title: string;
  client: string;
  company: string;
  duration: string;
  poster: string;
}

const GALLERY_VIDEOS: VideoGalleryItem[] = [
  {
    id: 1,
    title: "Brand Transformation & 300% Inbound Surge",
    client: "Dr. Tejas & Team",
    company: "Dr. Auto Workshop",
    duration: "1:45",
    poster: poster2,
  },
  {
    id: 2,
    title: "Viral Media Scaling & 4.4M Views",
    client: "Priya & Anushka",
    company: "Pune Voices Media",
    duration: "2:10",
    poster: videoPosterImg,
  },
  {
    id: 3,
    title: "From Seed to Category Leader in 6 Months",
    client: "Pratap Shinde",
    company: "Bushare Ventures",
    duration: "1:30",
    poster: poster3,
  },
  {
    id: 4,
    title: "High-Ticket Real Estate Acquisition Funnel",
    client: "Saurabh Jadhav",
    company: "Vaichal Vastu",
    duration: "2:25",
    poster: poster4,
  },
];

export const ClientVideoShowcase: React.FC = () => {
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>(brandVideo);

  const handlePlay = (src?: string) => {
    setCurrentVideo(src || brandVideo);
    setIsPlayingModal(true);
  };

  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFB800]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            Client Success Stories
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Watch How We Drive <span className="text-[#FFB800]">Real Impact</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Hear directly from the visionary founders, executives, and creators whose brands we accelerated.
          </p>
        </div>

        {/* Large Featured Video Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden bg-[#0C0C10] border border-white/10 group shadow-[0_25px_60px_rgba(0,0,0,0.9)] mb-16 cursor-pointer"
          onClick={() => handlePlay(brandVideo)}
        >
          {/* 16:9 Cinematic Aspect Ratio Container */}
          <div className="relative w-full aspect-[21/9] min-h-[360px] sm:min-h-[460px] overflow-hidden">
            <img
              src={videoPosterImg}
              alt="Client Success Testimonial"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

            {/* Center Glowing Golden Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Outer pulsing ring */}
                <div className="absolute -inset-4 rounded-full bg-[#FFB800]/30 blur-lg animate-ping" />
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFB800] flex items-center justify-center shadow-[0_0_35px_rgba(255,184,0,0.7)] group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-black fill-black ml-1.5" />
                </div>
              </div>
            </div>

            {/* Bottom Client Card Banner */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#09090C]/90 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FFB800] fill-[#FFB800]" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-white">5.0 / 5.0 Verified Rating</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  "They didn’t just redesign our brand; they engineered our next phase of 10x growth."
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-1 flex items-center gap-2">
                  <span className="text-[#FFB800] font-semibold">Shailaja & Priya Patil</span>
                  <span>•</span>
                  <span>Founders, Pune Voices Media Network</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#FFB800]" />
                </p>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFB800] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,184,0,0.4)]">
                  Watch Story (2:40)
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Client Video Showcase: Horizontal Gallery */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Client Video <span className="text-[#FFB800]">Showcase</span>
            </h3>
            <span className="text-xs text-[#71717A] uppercase tracking-wider">
              4 Featured Stories
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_VIDEOS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-[#0B0B0E] border border-white/8 hover:border-[#FFB800]/40 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.1)]"
                onClick={() => handlePlay(brandVideo)}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#14141C]">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-80 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] to-transparent opacity-75" />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#FFB800]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,184,0,0.5)]">
                      <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-[#050505]/80 text-[10px] font-bold text-white tracking-wider">
                    {item.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h4 className="text-white font-bold text-sm group-hover:text-[#FFB800] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="mt-2 text-xs text-[#A1A1AA] flex items-center justify-between">
                    <span>{item.client}</span>
                    <span className="text-[#FFB800] text-[11px] font-medium">{item.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isPlayingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsPlayingModal(false)}
          >
            <div
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-[#0A0A0E] border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPlayingModal(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close Video"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-video w-full">
                <video
                  src={currentVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
