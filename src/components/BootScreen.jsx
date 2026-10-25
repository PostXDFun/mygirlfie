import { motion } from 'framer-motion';

export default function BootScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex flex-col items-center justify-center bg-blue-600 text-white p-6"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
        className="text-4xl font-bold mb-12 text-center tracking-wider"
      >
        Hola mi skibidi
      </motion.h1>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={onComplete}
        className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full text-xl shadow-xl min-w-[200px] min-h-[60px] flex items-center justify-center"
      >
        Toca para entrar
      </motion.button>
    </motion.div>
  );
}
