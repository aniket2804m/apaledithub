import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-[#10263D] font-montserrat px-6">
      <div className="text-center max-w-md">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFC400]/20 text-[#10263D] font-bold text-xs uppercase tracking-widest mb-4">
          Error 404
        </span>
        <h1 className="mb-2 text-7xl font-bold font-serif text-[#10263D]">
          Page Not <span className="text-[#347DBB]">Found</span>
        </h1>
        <p className="mb-8 text-base text-[#64748B]">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-[#FFC400] text-[#10263D] hover:bg-[#e6b000] px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:scale-105"
        >
          Return to Home →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
