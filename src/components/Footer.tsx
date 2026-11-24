import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router-dom";

import logoWhite from "../img/logo_white.png";

import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // CTA Hover Mouse Coordinates
  const ctaMouseX = useMotionValue(0);
  const ctaMouseY = useMotionValue(0);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    ctaMouseX.set(e.clientX - rect.left);
    ctaMouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const cols = footerRef.current?.querySelectorAll(".footer-col");
    if (!cols || cols.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cols,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#050505] py-20 px-5 md:px-10 lg:px-20 text-white font-montserrat border-t border-[#FFB800]/20">
      {/* Background radial glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#FFB800]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFB800]/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          
          {/* Company */}
          <div className="footer-col space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={logoWhite}
                alt="AaplaEditHub Logo"
                className="w-48 h-12 object-contain"
              />
            </Link>

            <p className="font-montserrat font-light text-sm text-white/75 leading-relaxed">
              Everything your business needs to scale: high-impact video editing, strategic brand identity, web design, and data-driven performance marketing.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 border border-white/15 bg-white/5 text-white hover:text-[#FFC400] hover:border-[#FFC400] hover:scale-105 transition flex items-center justify-center rounded-full shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>

              <a
                href="https://www.instagram.com/aaplaedithub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/15 bg-white/5 text-white hover:text-[#FFC400] hover:border-[#FFC400] hover:scale-105 transition flex items-center justify-center rounded-full shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>

              <a
                href="#"
                className="w-10 h-10 border border-white/15 bg-white/5 text-white hover:text-[#FFC400] hover:border-[#FFC400] hover:scale-105 transition flex items-center justify-center rounded-full shadow-sm"
                aria-label="Youtube"
              >
                <Youtube size={16} />
              </a>

              <a
                href="#"
                className="w-10 h-10 border border-white/15 bg-white/5 text-white hover:text-[#FFC400] hover:border-[#FFC400] hover:scale-105 transition flex items-center justify-center rounded-full shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="font-bold font-cinzel text-base tracking-wider text-[#FFC400] mb-6 uppercase">
              Quick Links
            </h3>

            <ul className="space-y-3 font-montserrat font-light text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/card" },
                { name: "Our Team", path: "/team" },
                { name: "Clients", path: "/clients" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 text-white/80 hover:text-[#FFC400] transition"
                  >
                    <ArrowUpRight size={12} className="text-[#347DBB]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="font-bold font-cinzel text-base tracking-wider text-[#FFC400] mb-6 uppercase">
              Our Services
            </h3>

            <ul className="space-y-3 font-montserrat font-light text-sm">
              {[
                { name: "Brand Strategy", path: "/brand" },
                { name: "Performance Marketing", path: "/perform" },
                { name: "Social Media Marketing", path: "/social" },
                { name: "SEO Optimization", path: "/seo" },
                { name: "Content Creation", path: "/linkdin" },
                { name: "Video Creation", path: "/facebook" },
                { name: "Web Development", path: "/web" },
                { name: "Google Ads", path: "/google" },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="flex items-center gap-2 text-white/80 hover:text-[#FFC400] transition"
                  >
                    <ArrowUpRight size={12} className="text-[#347DBB]" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="font-bold font-cinzel text-base tracking-wider text-[#FFC400] mb-6 uppercase">
              Contact Us
            </h3>

            <div className="space-y-4 font-montserrat font-light text-sm text-white/80">
              <div className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[#FFC400]" />
                <a href="mailto:contact@aaplaedithub.com" className="hover:text-[#FFC400] transition">
                  contact@aaplaedithub.com
                </a>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[#FFC400]" />
                <a href="tel:+918390025023" className="hover:text-[#FFC400] transition">
                  +91 83900 25023
                </a>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-white/70 text-xs">
                  602, D Wing, Swami Chaya Apartments, Lane, DP Rd, Sridhar Colony, Karvenagar, Pune
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section (Frosted Glassmorphism Card inside Footer) */}
        <div 
          onMouseMove={handleCtaMouseMove}
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
          className="group relative mt-16 rounded-3xl p-10 text-center overflow-hidden transition-all duration-500 bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >
          {/* Reflective hover glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  350px circle at ${ctaMouseX}px ${ctaMouseY}px,
                  rgba(255, 196, 0, 0.12),
                  transparent 80%
                )
              `,
            }}
          />

          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold mb-3 text-white tracking-wide">
            Ready To Scale Your Brand with <span className="text-[#FFC400]">AaplaEditHub?</span>
          </h3>

          <p className="mb-6 font-montserrat font-light text-sm text-white/80 max-w-xl mx-auto">
            Let’s craft scroll-stopping video content and strategic marketing campaigns that deliver measurable business growth.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-full font-montserrat font-bold text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(255,184,0,0.4)] transition-all duration-300 bg-[#FFB800] text-black hover:bg-[#FFC400]"
            onClick={() => navigate("/contact")}
          >
            Get Free Consultation
          </motion.button>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-montserrat font-light text-white/60">
            © {new Date().getFullYear()} AaplaEditHub. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-xs font-montserrat font-light text-white/60">
            <Link to="/privacy" className="hover:text-[#FFC400] transition">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-[#FFC400] transition">
              Terms &amp; Conditions
            </Link>

            <Link to="/cookie" className="hover:text-[#FFC400] transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
