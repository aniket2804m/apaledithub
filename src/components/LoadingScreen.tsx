import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[99999] bg-[#050505]/98 backdrop-blur-2xl flex items-center justify-center font-montserrat"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-cinzel font-bold mb-6 flex flex-col md:flex-row gap-2 md:gap-3.5 justify-center items-center select-none px-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-white tracking-wider uppercase font-bold">
              Aapla<span className="text-[#FFB800]">EditHub</span>
            </span>
            <span className="hidden md:inline text-white/20 font-light">|</span>
            <span className="text-[#9CA3AF] tracking-widest font-medium text-xs sm:text-sm md:text-base lg:text-lg uppercase">
              Beyond Branding • Beyond AI
            </span>
          </motion.div>
          
          {/* Brand progress track */}
          <div className="w-56 h-[3px] bg-[#14141A] rounded-full overflow-hidden mx-auto border border-white/10 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FFB800] via-[#FF9900] to-[#FFB800]"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
