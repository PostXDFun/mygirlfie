import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function BootScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-6 pb-24 relative overflow-hidden"
    >
      <motion.h1
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
        className="text-3xl sm:text-4xl font-normal mb-14 text-center tracking-wide text-white/90"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Hola mi skibidi
      </motion.h1>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.88 }}
        onClick={onComplete}
        className="w-16 h-16 rounded-full border border-white/25 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.06)] backdrop-blur-md cursor-pointer group transition-all"
        aria-label="Entrar"
      >
        <ArrowRight 
          size={26} 
          className="text-white/80 group-hover:text-white transition-transform group-hover:translate-x-1" 
          strokeWidth={1.75}
        />
      </motion.button>
    </motion.div>
  );
}
