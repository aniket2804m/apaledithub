import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Core layout components imported directly for rock-solid stability and zero suspense flashes
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";
import ScrollToTop from "@/components/ScrollToTop";
import StrategyPopup from "@/components/Popup/StrategyPopup";
import NotFound from "./pages/NotFound";

// Page level lazy imports
const Hero = lazy(() => import("@/components/Hero"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));
const Work = lazy(() => import("@/components/Work/Work"));
const Card = lazy(() => import("@/components/Card/Card"));
const Brand = lazy(() => import("@/components/Services/Brand"));
const Team = lazy(() => import("@/components/Team/Team"));
const Seo = lazy(() => import("@/components/Services/Seo"));
const Social = lazy(() => import("@/components/Services/Social"));
const Google = lazy(() => import("@/components/Services/Google"));
const Facebook = lazy(() => import("@/components/Services/Facebook"));
const Linkdin = lazy(() => import("@/components/Services/Linkdin"));
const Web = lazy(() => import("@/components/Services/Website"));
const Performance = lazy(() => import("@/components/Services/Performance"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const BushareCase = lazy(() => import("@/components/CaseStudy/BushareCase"));
const CaseStudy = lazy(() => import("@/components/Home/CaseStudy"));
const Punevoice = lazy(() => import("@/components/CaseStudy/PuneVoicesCase"));
const Client = lazy(() => import("@/components/Clients"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-[#050505] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#FFB800] animate-spin" />
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => setWarning(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <LoadingScreen isLoading={isLoading} />
          <ScrollToTop />
          <CursorGlow />
          <ScrollProgress />

          <AnimatePresence>
            {warning && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: -50, scale: 0.9, x: "-50%" }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="fixed top-6 left-1/2 z-[99999] bg-white/95 backdrop-blur-xl border border-[#10263D]/10 px-6 py-4 shadow-[0_15px_40px_rgba(16,38,61,0.12)] rounded-2xl flex items-center gap-3 font-montserrat select-none"
              >
                <span className="text-[#FFC400] font-semibold text-base">⚠️</span>
                <span className="text-[#10263D] font-cinzel text-xs tracking-wider uppercase font-semibold">{warning}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <Navbar />
          

          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/work" element={<Work />} />
              <Route path="/card" element={<Card />} />
              <Route path="/clients" element={<Client />} />

              <Route path="/brand" element={<Brand />} />
              <Route path="/perform" element={<Performance />} />
              <Route path="/web" element={<Web />} />
              <Route path="/google" element={<Google />} />
              <Route path="/facebook" element={<Facebook />} />
              <Route path="/linkdin" element={<Linkdin />} />
              <Route path="/seo" element={<Seo />} />
              <Route path="/social" element={<Social />} />

              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie" element={<CookiePolicy />} />

              <Route path="/bushare" element={<BushareCase />} />
              <Route path="/pune" element={<Punevoice />} />
              <Route path="/case" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />
          <BackToTop />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
