import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Clock, Calendar } from "lucide-react";
import articleImg1 from "../../img/card/brand strategy 1.jpg.jpeg";
import articleImg2 from "../../img/card/SEO optimization.jpg.jpeg";
import articleImg3 from "../../img/card/web devlopment_.jpg.jpeg";

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  image: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: "ai-brand-future",
    title: "How Autonomous AI Workflows Will Redefine High-Growth Brand Marketing in 2026",
    category: "AI & Innovation",
    readTime: "5 min read",
    date: "November 2026",
    summary: "Discover how machine intelligence and generative creative pipelines are allowing agile agencies to outperform traditional holding companies.",
    image: articleImg1,
  },
  {
    id: "organic-seo-mastery",
    title: "The Zero-Click Search Era: Why Authority Branding Beats Commodity Keywords",
    category: "Search & Growth",
    readTime: "7 min read",
    date: "October 2026",
    summary: "Search engines are transforming into answers engines. Here is the modern playbook for maintaining dominance and brand search volume.",
    image: articleImg2,
  },
  {
    id: "conversion-rate-engineering",
    title: "The Anatomy of a 10x Conversion Funnel: Design Psychology & Micro-Interactions",
    category: "Design Strategy",
    readTime: "6 min read",
    date: "October 2026",
    summary: "Analyzing the visual friction points that lose 70% of e-commerce traffic and how to engineer seamless checkout velocity.",
    image: articleImg3,
  },
];

export const DeepDive: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[300px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              Insights & Frameworks
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Deep <span className="text-[#FFB800]">Dive</span>
            </h2>

            <p className="mt-3 text-base text-[#9CA3AF] max-w-xl">
              Latest strategic thinking on AI automation, brand psychology, and performance scaling.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14141A] border border-white/10 hover:border-[#FFB800]/40 text-xs font-bold text-white uppercase tracking-wider transition-colors self-start md:self-auto"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4 text-[#FFB800]" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-3xl bg-[#0B0B0E] border border-white/8 hover:border-[#FFB800]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.1)]"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#14141C]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-transparent opacity-80" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#050505]/85 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-[#FFB800] uppercase tracking-wider">
                  {article.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#71717A] mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#8E8E93] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FFB800] group-hover:underline uppercase tracking-wider flex items-center gap-1.5">
                    Read Full Article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
