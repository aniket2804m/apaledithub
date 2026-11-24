import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Sparkles } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "What makes your agency different from traditional marketing agencies?",
    answer:
      "Unlike traditional agencies that rely on outdated retainers and fragmented teams, we unify high-end artistic design direction with modern machine intelligence. We engineer full-funnel systems where branding, high-converting web engineering, and autonomous AI workflows work in continuous synchronicity to compound your revenue.",
  },
  {
    id: 2,
    question: "How do your AI solutions integrate into our existing workflows?",
    answer:
      "Our AI solutions are custom-built to layer seamlessly over your existing CRM (HubSpot, Salesforce, Pipedrive), messaging channels (WhatsApp, Slack), and ad platforms. We provide complete setup, custom API connectors, staff onboarding, and ongoing fine-tuning so there is zero operational disruption.",
  },
  {
    id: 3,
    question: "What is the typical timeline for an end-to-end brand transformation?",
    answer:
      "A complete brand transformation—including strategic positioning, visual identity system, custom website development, and initial viral campaign rollouts—typically takes 4 to 8 weeks depending on the project scope. We operate in rapid sprint cycles with weekly review milestones.",
  },
  {
    id: 4,
    question: "How do you measure and report campaign ROI and performance?",
    answer:
      "We believe in complete radical transparency. You receive a live 24/7 client dashboard tracking blended ROAS, customer acquisition costs (CAC), organic impressions, and pipeline conversions. Every dollar deployed is attributed accurately to business outcomes.",
  },
  {
    id: 5,
    question: "Do you offer dedicated monthly retainer partnerships?",
    answer:
      "Yes. Most of our high-growth clients partner with us on an ongoing monthly strategic retainer. This gives you dedicated creative directors, media buyers, web developers, and AI engineers acting as your embedded high-performance growth arm.",
  },
  {
    id: 6,
    question: "What industries do you have the deepest track record in?",
    answer:
      "We have scaled over 150+ brands across Automotive, Media & Entertainment, Real Estate & Architecture, Luxury Hospitality, Healthcare Clinics, and High-Ticket B2B & D2C Brands.",
  },
];

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB800]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            Got Questions?
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-[#FFB800]">Questions</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Everything you need to know about partnering with our digital marketing and AI growth studio.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-[#0C0C10] border-[#FFB800]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.1)]"
                    : "bg-[#09090C] border-white/8 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 select-none focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors ${
                    isOpen ? "text-[#FFB800]" : "text-white hover:text-white"
                  }`}>
                    {faq.question}
                  </span>

                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? "bg-[#FFB800] text-black border-[#FFB800]"
                      : "bg-[#14141A] text-white/80 border-white/10"
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[3]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-7 pt-1 text-sm sm:text-base text-[#9CA3AF] leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
