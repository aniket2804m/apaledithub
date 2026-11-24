import React, { useState } from "react";
import { faqDataSocialMedia } from "../../data/faqData";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden py-10 bg-white text-[#10263D] border-t border-[#10263D]/8 font-montserrat">
      {/* Dotted pattern background overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#FFC400_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10" />
      
      {/* Ambient luxury glows */}
      <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-2xl bg-[#347DBB]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-2xl bg-[#FFC400]/1 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center mb-4">
          <span className="inline-flex rounded-2xl border border-[#10263D]/8 bg-[#FFC400]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#FFC400] font-montserrat">
            COMMON QUESTIONS
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold uppercase leading-tight text-[#10263D] md:text-5xl font-cinzel tracking-wider text-center mb-16">
          Frequently Asked{" "}
          <span className="text-[#FFC400]">
            Questions
          </span>
        </h2>

        {/* Accordion Wrapper */}
        <div className="space-y-4 font-montserrat">
          {faqDataSocialMedia.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className={`group rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden backdrop-blur-lg ${
                activeIndex === index
                  ? "bg-[#F8FAFC] border border-[#FFC400] shadow-[0_10px_30px_rgba(201,168,76,0.1)]"
                  : "bg-[#F8FAFC]/40 border border-[#10263D]/8 hover:bg-[#F8FAFC] hover:border-[#10263D]/8 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
              }`}
            >
              {/* Question Header */}
              <div className="flex justify-between items-center p-6 gap-4">
                <h4 className="font-semibold text-base md:text-lg text-[#10263D] font-cinzel tracking-wide group-hover:text-[#FFC400] transition-colors duration-300">
                  {item.question}
                </h4>

                <span className={`text-xl text-[#FFC400] font-bold w-8 h-8 rounded-2xl border border-[#10263D]/8 bg-[#FFC400]/20 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? "rotate-180 border-[#10263D]/8 bg-[#FFC400]/55" : ""}`}>
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              {/* Answer Box */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-[300px] opacity-100 px-6 pb-6 pt-1"
                    : "max-h-0 opacity-0 pointer-events-none"
                } overflow-hidden`}
              >
                <p className="text-[#64748B] text-sm md:text-base leading-relaxed font-light">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default React.memo(FAQ);