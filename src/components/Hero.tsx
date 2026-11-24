import React from "react";
import { ModernHero } from "./Home/ModernHero";
import { ModernAbout } from "./Home/ModernAbout";
import { WhyChooseUs } from "./Home/WhyChooseUs";
import { TrendingCardsScroll } from "./Home/TrendingCardsScroll";
import { ServicesGrid } from "./Home/ServicesGrid";
import { PortfolioGrid } from "./Home/PortfolioGrid";
import { AISolutions } from "./Home/AISolutions";
import { BeyondOrdinary } from "./Home/BeyondOrdinary";
import { ClientVideoShowcase } from "./Home/ClientVideoShowcase";
import { DeepDive } from "./Home/DeepDive";
import { FaqAccordion } from "./Home/FaqAccordion";
import { FinalCta } from "./Home/FinalCta";
import { BrandLogosMarquee } from "./Home/BrandLogosMarquee";

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FFB800] selection:text-black">
      {/* 1. Hero Section with 3D Moving Blocks Background */}
      <ModernHero />

      {/* 2. About Us Section */}
      <ModernAbout />

      {/* 3. Why Choose Us (6 Dark Cards) */}
      <WhyChooseUs />

      {/* 4. Trusted By Our Customers / Trending at Oyemarketor (Card Scrolling) */}
      <TrendingCardsScroll />

      {/* 5. Everything Your Brand Needs to Grow (11 Service Cards) */}
      <ServicesGrid />

      {/* 6. Our Work (6-Card Portfolio Grid) */}
      <PortfolioGrid />

      {/* 7. Our Most In-Demand AI Solutions (4 Premium Cards) */}
      <AISolutions />

      {/* 8. Where Brands Are Beyond The Ordinary (3D Golden Sculpture Split) */}
      <BeyondOrdinary />

      {/* 9 & 10. Client Success Stories & Client Video Showcase */}
      <ClientVideoShowcase />

      {/* 11. Deep Dive (Articles & Insights) */}
      <DeepDive />

      {/* 12. Frequently Asked Questions (Accordion FAQ) */}
      <FaqAccordion />

      {/* 13. Final CTA Banner */}
      <FinalCta />

      {/* 14. Partner Brand Logos Showcase */}
      <BrandLogosMarquee />
    </div>
  );
};

export default Hero;
