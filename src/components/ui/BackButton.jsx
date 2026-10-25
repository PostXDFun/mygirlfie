import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BackButton({ onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute top-4 left-4 z-50 flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 shadow-lg"
      aria-label="Volver al Menú Principal"
    >
      <ArrowLeft size={24} />
    </motion.button>
  );
}
