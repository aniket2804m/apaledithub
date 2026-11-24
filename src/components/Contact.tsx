import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Phone, MapPin, FileText, ChevronDown, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Select Component
interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}

const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`w-full form-field flex flex-col gap-2 relative ${isOpen ? "z-40" : "z-10"}`}>
      <label className="text-xs font-bold text-[#10263D] tracking-wider uppercase">
        {label}
      </label>
      <div className="relative group">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`select-trigger w-full flex items-center justify-between bg-white border ${
            error ? "border-red-500/50" : "border-[#10263D]/15"
          } text-[#10263D] px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-[#FFC400] transition-all duration-300 group rounded-xl shadow-sm`}
        >
          <span className={`truncate ${!value ? "text-[#64748B]/60" : "text-[#10263D]"}`}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#347DBB] transition-transform duration-300 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 left-0 w-full mt-1 bg-white/98 backdrop-blur-2xl border border-[#10263D]/10 shadow-[0_15px_40px_rgba(16,38,61,0.12)] max-h-60 overflow-y-auto scrollbar-none rounded-xl p-1"
            >
              {options.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-left px-4 py-2.5 text-sm text-[#10263D] hover:bg-[#F8FAFC] hover:text-[#347DBB] transition-colors duration-200 rounded-lg font-medium"
                  >
                    <span>{option}</span>
                    {value === option && (
                      <Check className="w-4 h-4 text-[#FFC400] shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && <span className="text-xs text-red-500 font-medium mt-0.5">{error}</span>}
    </div>
  );
};

// Custom Input Component
interface CustomInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const CustomInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error
}: CustomInputProps) => {
  return (
    <div className="w-full form-field flex flex-col gap-2 relative">
      <label className="text-xs font-bold text-[#10263D] tracking-wider uppercase">
        {label}
      </label>
      <div className="relative group">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white border ${
            error ? "border-red-500/50" : "border-[#10263D]/15"
          } text-[#10263D] placeholder:text-[#64748B]/50 px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-[#FFC400] transition-all duration-300 rounded-xl shadow-sm`}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium mt-0.5">{error}</span>}
    </div>
  );
};

// Custom Textarea Component
interface CustomTextareaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const CustomTextarea = ({
  label,
  placeholder,
  value,
  onChange,
  error
}: CustomTextareaProps) => {
  return (
    <div className="w-full form-field flex flex-col gap-2 relative col-span-full">
      <label className="text-xs font-bold text-[#10263D] tracking-wider uppercase">
        {label}
      </label>
      <div className="relative group">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white border ${
            error ? "border-red-500/50" : "border-[#10263D]/15"
          } text-[#10263D] placeholder:text-[#64748B]/50 px-4 py-3.5 text-sm font-medium min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-[#FFC400] transition-all duration-300 resize-none rounded-xl shadow-sm`}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium mt-0.5">{error}</span>}
    </div>
  );
};

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
    message: "",
    source: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleFieldChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else {
      const digitsOnly = form.phone.replace(/\D/g, "");
      if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        newErrors.phone = "Phone number must contain between 10 and 15 digits";
      }
    }

    if (!form.requirement) {
      newErrors.requirement = "Requirement selection is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company || "N/A",
          requirement: form.requirement,
          message: form.message,
          source: form.source || "N/A",
          time: new Date().toLocaleString(),
          title: form.name
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
      );
      toast.success("Message sent! We'll get back to you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        requirement: "",
        message: "",
        source: ""
      });
      setErrors({});
    } catch {
      toast.error("Failed to send message. Please try again or reach out directly.");
    } finally {
      setSending(false);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:contact@aaplaedithub.com", text: "contact@aaplaedithub.com" },
    { icon: Phone, label: "Phone", href: "tel:+918390025023", text: "+91 83900 25023" },
    { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/918390025023", text: "Chat on WhatsApp" },
    { icon: MapPin, label: "Studio Location", href: "https://maps.app.goo.gl/ni1Votk8grV3SUHg8", text: "602, D Wing, Swami Chaya Apartments, Lane, DP Rd, Karvenagar, Pune" },
  ];

  // GSAP scroll animations
  useEffect(() => {
    const leftColumn = sectionRef.current?.querySelector(".left-column");
    const rightForm = sectionRef.current?.querySelector(".form-container-card");
    const header = sectionRef.current?.querySelector(".contact-header");

    const ctx = gsap.context(() => {
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%"
            }
          }
        );
      }

      if (leftColumn) {
        const leftItems = leftColumn.querySelectorAll(".contact-link-item");
        gsap.fromTo(
          leftColumn,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%"
            }
          }
        );

        if (leftItems && leftItems.length > 0) {
          gsap.fromTo(
            leftItems,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%"
              }
            }
          );
        }
      }

      if (rightForm) {
        gsap.fromTo(
          rightForm,
          { opacity: 0, x: 40, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const requirements = [
    "Video Editing & Production",
    "Brand Strategy & Identity",
    "Performance Marketing & Ads",
    "Portfolio / Business Website",
    "Social Media Management",
    "SEO Optimization",
    "Content Creation",
    "Other"
  ];

  const sources = [
    "Google Search",
    "Instagram",
    "LinkedIn",
    "YouTube",
    "Referral / Friend",
    "Existing Client",
    "Other"
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-gradient-to-b from-white via-[#F8FAFC] to-white font-montserrat" ref={sectionRef}>
      {/* Decorative ambient glows */}
      <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-[#347DBB]/6 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-[#FFC400]/8 blur-[120px] pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
        <div className="contact-header text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#10263D]/10 text-xs font-bold text-[#1E4C73] uppercase tracking-wider mb-4 shadow-sm">
            Let's Collaborate
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#10263D] font-cinzel tracking-wide leading-tight">
            Let's <span className="text-[#FFC400]">Connect</span>
          </h2>

          <p className="mt-4 text-[#64748B] text-base md:text-lg max-w-xl mx-auto">
            Ready to scale your business with standout video editing and creative marketing? Tell us about your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start font-montserrat">
          {/* Left Column: Info & Links */}
          <div className="left-column space-y-4 opacity-0">
            {/* Consultation helper box */}
            <div className="contact-link-item flex items-center gap-3 mb-6 p-5 rounded-2xl glass-card border border-white shadow-sm">
              <FileText className="w-5 h-5 text-[#FFC400] shrink-0" />
              <p className="text-sm text-[#10263D] font-medium">
                Want a custom strategy for your brand? <span className="text-[#347DBB] underline cursor-pointer font-bold">Book a free call</span> and we'll craft a plan tailored for you.
              </p>
            </div>

            {contactLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="contact-link-item flex items-center gap-4 bg-white/90 border border-[#10263D]/8 backdrop-blur-md rounded-2xl p-4 hover:border-[#FFC400] hover:shadow-[0_10px_30px_rgba(16,38,61,0.08)] transition-all duration-300 group"
              >
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] text-[#10263D] group-hover:bg-[#FFC400] group-hover:text-[#10263D] transition-all duration-300 shadow-sm border border-[#10263D]/5">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider group-hover:text-[#347DBB] transition-colors">{item.label}</p>
                  <p className="text-sm text-[#10263D] font-bold group-hover:text-[#10263D] transition-colors mt-0.5">{item.text}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <div className="form-container-card relative opacity-0">
            <form
              onSubmit={handleSubmit}
              className="glass-card bg-white/95 p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl border border-white shadow-[0_20px_50px_rgba(16,38,61,0.08)]"
            >
              {/* Row 1 */}
              <CustomInput
                label="Full Name"
                placeholder="E.g. Alexander Mercer"
                value={form.name}
                onChange={(val) => handleFieldChange("name", val)}
                error={errors.name}
              />
              <CustomInput
                label="Email Address"
                type="email"
                placeholder="E.g. alexander@company.com"
                value={form.email}
                onChange={(val) => handleFieldChange("email", val)}
                error={errors.email}
              />

              {/* Row 2 */}
              <CustomInput
                label="Phone Number"
                placeholder="E.g. +91 83900 25023"
                value={form.phone}
                onChange={(val) => handleFieldChange("phone", val)}
                error={errors.phone}
              />
              <CustomInput
                label="Company Name"
                placeholder="E.g. Acme Studio (Optional)"
                value={form.company}
                onChange={(val) => handleFieldChange("company", val)}
                error={errors.company}
              />

              {/* Row 3 */}
              <div className="col-span-full">
                <CustomSelect
                  label="Project Requirement"
                  placeholder="Select your requirement"
                  value={form.requirement}
                  onChange={(val) => handleFieldChange("requirement", val)}
                  options={requirements}
                  error={errors.requirement}
                />
              </div>

              {/* Row 4 */}
              <div className="col-span-full">
                <CustomTextarea
                  label="Tell us about your project"
                  placeholder="Tell us about your brand vision, target audience, and goals..."
                  value={form.message}
                  onChange={(val) => handleFieldChange("message", val)}
                  error={errors.message}
                />
              </div>

              {/* Row 5 */}
              <div className="col-span-full">
                <CustomSelect
                  label="How did you hear about us?"
                  placeholder="Select source"
                  value={form.source}
                  onChange={(val) => handleFieldChange("source", val)}
                  options={sources}
                  error={errors.source}
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-full form-field pt-2">
                <motion.button
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 10px 25px rgba(255, 196, 0, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#FFC400] text-[#10263D] py-4 rounded-full font-bold font-montserrat tracking-wider uppercase text-sm flex gap-2 items-center justify-center transition-all duration-300 shadow-[0_4px_15px_rgba(255,196,0,0.35)] hover:bg-[#FFD54F] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-[#10263D]" />
                  {sending ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
