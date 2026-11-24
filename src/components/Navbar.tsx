import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Info,
  Users,
  PhoneCall,
  FolderOpen,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "../img/logo_white.png";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/card" },
  { label: "CaseStudy", href: "/case" },
  { label: "Team", href: "/team" },
  { label: "Client", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

const servicesDropdown = [
  { label: "Brand Strategy", href: "/brand" },
  { label: "Performance Marketing", href: "/perform" },
  { label: "Social Media Marketing", href: "/social" },
  { label: "SEO Optimization", href: "/seo" },
  { label: "Content Creation", href: "/linkdin" },
  { label: "Video Creation", href: "/facebook" },
  { label: "Web Development", href: "/web" },
  { label: "Google Ads", href: "/google" },
];

const casestudyDropdown = [
  { label: "Bushare", href: "/bushare" },
  { label: "PuneVoice", href: "/pune" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [casestudyOpen, setCasestudyOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setCasestudyOpen(false);
  }, [location.pathname]);

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none font-montserrat">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full pointer-events-auto transition-all duration-300 ease-in-out border-b ${
          scrolled
            ? "py-3 bg-[#050505]/95 backdrop-blur-2xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "py-4 bg-[#050505]/80 backdrop-blur-xl border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            className="group flex items-center gap-3 relative transition-transform hover:scale-105 active:scale-95"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={logo}
              alt="AaplaEditHub Logo"
              className="w-40 sm:w-44 h-12 object-contain transition-all duration-300 group-hover:scale-105 py-1"
            />
            <div className="absolute -inset-2 bg-[#FFB800]/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center uppercase gap-1">
            {navLinks.map((link) => {
              if (link.label === "Services") {
                const isActive =
                  location.pathname === link.href ||
                  servicesDropdown.some((s) => s.href === location.pathname);
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      to={link.href}
                      className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center gap-1.5 ${
                        isActive
                          ? "text-[#FFB800] font-bold"
                          : "text-white/70 hover:text-white"
                      }`}
                      onMouseEnter={() => setHoveredPath(link.href)}
                      onMouseLeave={() => setHoveredPath(null)}
                    >
                      Services{" "}
                      <span className="text-[10px] text-[#FFB800]">
                        {servicesOpen ? "▼" : "▲"}
                      </span>

                      {isActive && (
                        <motion.span
                          layoutId="active-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.9)]"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                    </Link>

                    <div
                      className={`absolute top-full left-0 mt-2 w-72 bg-[#0D0D11]/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 z-50 p-2 overflow-hidden ${
                        servicesOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {servicesDropdown.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => setServicesOpen(false)}
                          className="block px-4 py-2.5 text-white/80 hover:bg-white/10 hover:text-[#FFB800] hover:pl-6 transition-all duration-200 rounded-xl text-xs font-semibold uppercase tracking-wider"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // casestudy
              if (link.label === "CaseStudy") {
                const isActive =
                  location.pathname === link.href ||
                  casestudyDropdown.some((s) => s.href === location.pathname);
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setCasestudyOpen(true)}
                    onMouseLeave={() => setCasestudyOpen(false)}
                  >
                    <Link
                      to={link.href}
                      className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center gap-1.5 ${
                        isActive
                          ? "text-[#FFB800] font-bold"
                          : "text-white/70 hover:text-white"
                      }`}
                      onMouseEnter={() => setHoveredPath(link.href)}
                      onMouseLeave={() => setHoveredPath(null)}
                    >
                      CaseStudy{" "}
                      <span className="text-[10px] text-[#FFB800]">
                        {casestudyOpen ? "▼" : "▲"}
                      </span>

                      {isActive && (
                        <motion.span
                          layoutId="active-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.9)]"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                    </Link>

                    <div
                      className={`absolute top-full left-0 mt-2 w-72 bg-[#0D0D11]/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 z-50 p-2 overflow-hidden ${
                        casestudyOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {casestudyDropdown.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => setCasestudyOpen(false)}
                          className="block px-4 py-2.5 text-white/80 hover:bg-white/10 hover:text-[#FFB800] hover:pl-6 transition-all duration-200 rounded-xl text-xs font-semibold uppercase tracking-wider"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // Nav Link
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center ${
                    isActive
                      ? "text-[#FFB800] font-bold"
                      : "text-white/70 hover:text-white"
                  }`}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  {/* Sliding Backdrop Pill */}
                  {hoveredPath === link.href && (
                    <motion.span
                      layoutId="hovered-pill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  <span>{link.label}</span>

                  {/* Active Underline Dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.9)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden lg:block">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                className="rounded-full bg-[#FFB800] text-black hover:bg-[#FFC400] font-montserrat font-bold px-7 py-2.5 border-none transition-all duration-300 shadow-[0_0_20px_rgba(255,184,0,0.4)] hover:shadow-[0_0_30px_rgba(255,184,0,0.6)]"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Let's Talk
                  <ArrowRight className="w-4 h-4 text-black" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors relative flex items-center justify-center w-10 h-10 border border-white/10 bg-[#0E0E12] text-white shadow-sm"
            aria-label="Toggle Menu"
          >
            <svg width="18" height="18" viewBox="0 0 23 23" className="text-white">
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" },
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.5" },
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-[calc(100%+8px)] left-4 right-4 bg-[#0D0D11]/98 border border-white/10 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] lg:hidden flex flex-col gap-4 pointer-events-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  const isActive = location.pathname === link.href;
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 border border-white/5 text-white"
                      >
                        <div className="flex items-center gap-4">
                          <Briefcase className="w-5 h-5 text-[#FFB800]" />
                          <span className="font-semibold text-white">Services</span>
                        </div>
                        <span className="text-[#FFB800]">{servicesOpen ? "▼" : "▲"}</span>
                      </button>

                      {servicesOpen && (
                        <div className="ml-4 mt-2 flex flex-col gap-1">
                          {servicesDropdown.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              onClick={() => {
                                setMobileOpen(false);
                                setServicesOpen(false);
                              }}
                              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                isActive
                                  ? "bg-white/10 text-[#FFB800] font-bold border border-[#FFB800]/40"
                                  : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent"
                              }`}
                            >
                              {service.label}
                              {isActive && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]" />
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.label === "CaseStudy") {
                  const isActive = location.pathname === link.href;
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => setCasestudyOpen(!casestudyOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 border border-white/5 text-white"
                      >
                        <div className="flex items-center gap-4">
                          <Briefcase className="w-5 h-5 text-[#FFB800]" />
                          <span className="font-semibold text-white">CaseStudy</span>
                        </div>
                        <span className="text-[#FFB800]">{casestudyOpen ? "▼" : "▲"}</span>
                      </button>

                      {casestudyOpen && (
                        <div className="ml-4 mt-2 flex flex-col gap-1">
                          {casestudyDropdown.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              onClick={() => {
                                setMobileOpen(false);
                                setCasestudyOpen(false);
                              }}
                              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                isActive
                                  ? "bg-white/10 text-[#FFB800] font-bold border border-[#FFB800]/40"
                                  : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent"
                              }`}
                            >
                              {service.label}
                              {isActive && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]" />
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Nav Link
                const isActive = location.pathname === link.href;
                const Icon =
                  link.label === "About" ? Info :
                  link.label === "Services" ? Briefcase :
                  link.label === "Client" ? FolderOpen :
                  link.label === "Team" ? Users :
                  PhoneCall;

                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-white/10 text-[#FFB800] font-bold border border-[#FFB800]/40"
                          : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#FFB800]" />
                      <span className="font-semibold text-sm uppercase">{link.label}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="pt-3 border-t border-white/10">
              <Button
                asChild
                className="w-full rounded-full bg-[#FFB800] text-black font-montserrat font-bold py-5 hover:bg-[#FFC400] shadow-[0_0_20px_rgba(255,184,0,0.4)]"
              >
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2">
                  Let's Talk
                  <ArrowRight className="w-5 h-5 text-black" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
