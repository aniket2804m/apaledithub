import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, LineChart, Workflow, Sparkles, Cpu, ArrowRight } from "lucide-react";

interface AISolutionCard {
  icon: React.ElementType;
  title: string;
  badge: string;
  description: string;
  benefits: string[];
}

const AI_SOLUTIONS: AISolutionCard[] = [
  {
    icon: Bot,
    title: "AI Customer Agents & Autonomous Chatbots",
    badge: "24/7 Operations",
    description:
      "Trained on your brand's unique knowledge base to handle inquiries, book consultations, and nurture inbound prospects automatically.",
    benefits: ["Zero Response Latency", "Multi-Language Support", "Direct CRM Booking"],
  },
  {
    icon: LineChart,
    title: "Predictive Analytics & Audience Forecasting",
    badge: "Algorithmic Precision",
    description:
      "Machine learning models that analyze historical consumer behavior to forecast campaign performance, churn risks, and customer lifetime value.",
    benefits: ["Dynamic Budget Shifting", "High-Value Buyer ID", "Cohort Retention Trends"],
  },
  {
    icon: Workflow,
    title: "Automated Workflow Systems & Integrations",
    badge: "Time Savings",
    description:
      "Connecting marketing, sales, and analytics tools into seamless automated pipelines that eliminate repetitive manual data entry.",
    benefits: ["Custom Zapier & Make Pipes", "Automated Lead Routing", "Instant Slack Alerts"],
  },
  {
    icon: Cpu,
    title: "Generative Multi-Modal Content Engines",
    badge: "Creative Synthesis",
    description:
      "Proprietary AI pipelines for generating high-converting ad variations, tailored video scripts, and bespoke hyper-realistic visual creative.",
    benefits: ["10x Creative Output", "A/B Variant Automation", "Brand Voice Calibration"],
  },
];

export const AISolutions: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB800]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            Artificial Intelligence
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Most <span className="text-[#FFB800]">In-Demand AI Solutions</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Supercharge your business with enterprise-grade artificial intelligence and autonomous workflows built for measurable commercial return.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AI_SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 sm:p-10 rounded-3xl bg-[#0C0C10] border border-white/8 hover:border-[#FFB800]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(255,184,0,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Top: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#14141C] border border-[#FFB800]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(255,184,0,0.2)]">
                      <Icon className="w-7 h-7 text-[#FFB800]" />
                    </div>

                    <span className="px-3.5 py-1 rounded-full bg-[#181822] border border-white/10 text-xs font-semibold text-[#FFB800] uppercase tracking-wider">
                      {solution.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                    {solution.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-[#8E8E93] leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Benefits tags */}
                  <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {solution.benefits.map((b, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-3 py-1 rounded-xl bg-[#121218] border border-white/5 text-xs text-[#A1A1AA] font-medium"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#FFB800] transition-colors uppercase tracking-wider"
                  >
                    <span>Request AI Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFB800] hover:bg-[#FFC400] text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(255,184,0,0.4)] hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] hover:-translate-y-0.5"
          >
            <span>Deploy AI Solutions For Your Brand</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </div>
      </div>
    </section>
  );
};
