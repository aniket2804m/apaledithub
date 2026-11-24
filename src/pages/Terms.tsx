"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Terms = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return;

      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveSection(index);
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const terms = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing and using AaplaEditHub services, you agree to comply with and be bound by these Terms & Conditions.",
    },
    {
      title: "Services",
      content:
        "AaplaEditHub provides comprehensive creative studio and growth solutions including video editing, brand strategy, content architecture, website development, paid advertising, and related media services.",
    },
    {
      title: "Client Responsibilities",
      content:
        "Clients are responsible for providing clear creative guidelines, raw assets, timely feedback, and approvals necessary for efficient production.",
    },
    {
      title: "Payments & Billing",
      content:
        "All invoices and milestones must be honored according to the agreed project agreement. Work deliverables proceed in accordance with agreed milestone schedules.",
    },
    {
      title: "Intellectual Property",
      content:
        "Upon full settlement of invoices, clients receive ownership of final approved creative deliverables. AaplaEditHub retains portfolio showcase rights unless an explicit NDA states otherwise.",
    },
    {
      title: "Confidentiality",
      content:
        "Both parties agree to treat proprietary brand materials, business figures, and trade secrets with absolute confidentiality.",
    },
    {
      title: "Limitation of Liability",
      content:
        "AaplaEditHub shall not be liable for indirect or consequential damages beyond the value of services contracted.",
    },
    {
      title: "Termination",
      content:
        "Either party may terminate agreements with written notice as defined in the client contract. Dues for completed stages remain payable.",
    },
    {
      title: "Changes to Terms",
      content:
        "We reserve the right to revise these Terms & Conditions periodically. Continued use of our site and services signifies acceptance of any updates.",
    },
  ];

  const handleScrollToSection = (index: number) => {
    const target = sectionsRef.current[index];
    if (target) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#10263D] font-montserrat pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF5FC]">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#10263D] mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC400]/20 border border-[#FFC400]/40 text-[#10263D] font-bold text-xs uppercase tracking-wider mb-6">
              <FileText className="w-3.5 h-3.5 text-[#10263D]" />
              Service Agreement
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-[#10263D] tracking-tight leading-tight"
          >
            Terms &amp; <span className="text-[#347DBB]">Conditions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-4xl text-base sm:text-lg text-[#64748B] font-normal leading-relaxed"
          >
            Please read these terms carefully before engaging with <span className="font-bold text-[#10263D]">AaplaEditHub</span>. They define our mutual obligations and working standards.
          </motion.p>
        </div>
      </section>

      {/* Layout Grid with Table of Contents */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Table of Contents - Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 p-6 bg-[#F8FAFC] rounded-2xl border border-[#10263D]/8 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#64748B]">
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-1.5">
                {terms.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleScrollToSection(index)}
                    className={`text-left text-sm font-semibold py-2 px-3 rounded-xl transition-all duration-300 ${
                      activeSection === index
                        ? "text-[#10263D] bg-[#FFC400]/20 font-bold border-l-4 border-[#FFC400] pl-3"
                        : "text-[#64748B] hover:text-[#10263D] hover:bg-white pl-3"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Table of Contents - Mobile Horizontal Scroll Bar (Sticky) */}
          <div className="lg:hidden sticky top-20 z-30 bg-white/95 backdrop-blur-md py-4 border-b border-[#10263D]/10 flex gap-2 overflow-x-auto scrollbar-none px-4 -mx-4 mb-8">
            {terms.map((item, index) => (
              <button
                key={index}
                onClick={() => handleScrollToSection(index)}
                className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeSection === index
                    ? "bg-[#FFC400] text-[#10263D] border-[#FFC400] shadow-sm"
                    : "bg-[#F8FAFC] text-[#64748B] border-[#10263D]/10"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Policy Sections (Content Area) */}
          <div className="lg:col-span-3 space-y-6">
            {terms.map((item, index) => (
              <div
                key={index}
                data-index={index}
                ref={(el) => {
                  sectionsRef.current[index] = el;
                }}
                className="group rounded-3xl border border-[#10263D]/8 bg-white/90 backdrop-blur-xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-[#FFC400] hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-[#F8FAFC] border border-[#10263D]/10 text-[#10263D] font-bold text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#10263D] mb-3">
                      {item.title}
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-[#64748B]">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Note Section */}
            <div className="rounded-3xl bg-gradient-to-b from-[#F8FAFC] to-[#EEF5FC] border border-[#10263D]/8 p-8 sm:p-10 shadow-sm mt-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#10263D] mb-3">
                Have Contract Questions?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#64748B] max-w-xl mx-auto mb-6">
                By engaging with AaplaEditHub, you acknowledge that you have read and agreed to these terms. For custom master service agreements, contact us.
              </p>
              <div className="flex justify-center">
                <a
                  href="mailto:contact@aaplaedithub.com"
                  className="inline-flex items-center gap-3 bg-[#FFC400] text-[#10263D] px-8 py-3.5 rounded-full font-bold shadow-md hover:bg-[#e6b000] transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  contact@aaplaedithub.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Terms;
