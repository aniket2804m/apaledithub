// logos
import img11 from "../../img/background.png";
import img20 from "../../img/logo_white.png";


export type Category =
  | "Media"
  | "Products"
  | "Education"
  | "Healthcare"
  | "Personal Branding"
  | "Hotels & Restaurants"
  | "Events"
  | "Fashion"
  | "Automotive"
  | "Real Estate"
  | "Interior Design"
  | "Spiritual & Wellness"
  | "Import & Export Business"
  | "Travel & Tourism"
  | "Fitness"
  | "Beauty";

export interface Client {
  id: string;
  name: string;
  handle: string;
  category: Category;
  logo?: string | null; // e.g. "/logos/bushare.png" - shown on the card
  cover?: string | null; // e.g. "/covers/bushare.jpg" - bigger image shown in modal, falls back to logo
  services: string[];
  result?: string; // e.g. "+150% Reach"
  testimonial?: string;
  description?: string; // short paragraph shown inside the modal
  caseStudy?: boolean;
  caseStudyRoute?: string;
  featured?: boolean;
  // route: string;
}

export const CLIENTS: Client[] = [
  {
  id: "hotelwada",
  name: "Hotel Wada Pashan",
  handle: "@hotelwada",
  category: "Hotels & Restaurants",
  services: ["Booking Website", "Local SEO"],
  result: "81.3K Followers",
  logo: img11,
  cover: img11,
  testimonial:
    "AaplaEditHub transformed our online presence. Our bookings increased significantly, and guests now find us much more easily online.",
  description:
    "Hotel Wada wanted a modern digital presence that reflected its warm hospitality and authentic experience. AaplaEditHub designed a high-performance booking website with a seamless reservation process, optimized it for local SEO, and improved its visibility on Google. The result was a faster booking experience, stronger local reach, and a noticeable increase in direct customer inquiries and reservations.",
  caseStudy: true,
  featured: true,
},
{
  id: "drauto",
  name: "DR Auto",
  handle: "@_the_dr_auto_",
  category: "Automotive",
  services: ["Reels", "Content Calendar"],
  result: "+4.4M Views",
  logo: img20,
  cover: img20,
  testimonial:
    "AaplaEditHub helped us create engaging automotive content that boosted our online visibility and brought more customers to our workshop.",
  description:
    "DR Auto wanted to grow its presence on social media and showcase its expertise in the automotive industry. AaplaEditHub developed a strategic content calendar and produced high-quality, engaging reels that highlighted services, customer transformations, and expert tips. The consistent content strategy increased brand awareness, generated over 4.4M views, and helped attract more inquiries from potential customers.",
  caseStudy: true,
  featured: true,
},

];