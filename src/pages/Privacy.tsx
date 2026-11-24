"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Mail, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Privacy = () => {
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

  const sections = [
    {
      title: "Information We Collect",
      content:
        "We collect personal information such as your name, email address, phone number, and business details when you contact us or use our digital marketing, video editing, and creative services.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used to provide creative and marketing services, improve client experience, communicate project milestones, generate performance analytics, and optimize growth strategies.",
    },
    {
      title: "Data Protection",
      content:
        "AaplaEditHub follows industry-standard security measures and encrypted data handling to protect your personal and commercial information from unauthorized access, misuse, or disclosure.",
    },
    {
      title: "Cookies & Tracking",
      content:
        "Our website may use cookies and analytics tools to understand visitor behavior, measure traffic, and improve site performance and user experience.",
    },
    {
      title: "Third-Party Services",
      content:
        "We may collaborate with trusted third-party platforms such as Google, Meta, and specialized analytics providers to deliver and measure our services effectively.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, modify, or request deletion of your personal data at any time by getting in touch with our team.",
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
              <ShieldCheck className="w-3.5 h-3.5 text-[#10263D]" />
              Official Documentation
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-[#10263D] tracking-tight leading-tight"
          >
            Privacy <span className="text-[#347DBB]">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-4xl text-base sm:text-lg text-[#64748B] font-normal leading-relaxed"
          >
            At <span className="font-bold text-[#10263D]">AaplaEditHub</span>, we respect your privacy and are committed to protecting your personal information and commercial creative assets.
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
                {sections.map((item, index) => (
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
            {sections.map((item, index) => (
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
            {sections.map((item, index) => (
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

            {/* Contact Section */}
            <div className="rounded-3xl bg-gradient-to-b from-[#F8FAFC] to-[#EEF5FC] border border-[#10263D]/8 p-8 sm:p-10 shadow-sm mt-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#10263D] mb-3">
                Questions Regarding Privacy?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#64748B] max-w-xl mx-auto mb-8">
                If you have any questions or requests regarding this Privacy Policy, feel free to contact AaplaEditHub directly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="mailto:contact@aaplaedithub.com"
                  className="flex items-center gap-3 bg-white text-[#10263D] px-7 py-3.5 rounded-full font-bold shadow-md hover:bg-[#FFC400] transition-all duration-300 w-full sm:w-auto justify-center border border-[#10263D]/10"
                >
                  <Mail className="w-4 h-4 text-[#FFC400]" />
                  contact@aaplaedithub.com
                </a>

                <a
                  href="tel:+918390025023"
                  className="flex items-center gap-3 bg-[#FFC400] text-[#10263D] px-7 py-3.5 rounded-full font-bold shadow-md hover:bg-[#e6b000] transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <Phone className="w-4 h-4" />
                  +91 83900 25023
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Privacy;
