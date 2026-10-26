import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { asset } from '../utils';

const MATCHING_PAIRS = [
  {
    name: 'Maki & Yuta',
    left: { id: 'pokemon', img: asset('/sprites/matches/maki.jpg'), alt: 'Maki' },
    right: { id: 'jojo', img: asset('/sprites/matches/yuta.jpg'), alt: 'Yuta' },
  },
  {
    name: 'Claire & Leon',
    left: { id: 'pokemon', img: asset('/sprites/matches/claire.jpg'), alt: 'Claire' },
    right: { id: 'jojo', img: asset('/sprites/matches/leon.jpg'), alt: 'Leon' },
  },
  {
    name: 'Yasuho & Josuke',
    left: { id: 'pokemon', img: asset('/sprites/matches/yasuho.jpg'), alt: 'Yasuho' },
    right: { id: 'jojo', img: asset('/sprites/matches/josuke.jpg'), alt: 'Josuke' },
  },
  {
    name: 'Ren & Sumire',
    left: { id: 'pokemon', img: asset('/sprites/matches/ren.jpg'), alt: 'Ren' },
    right: { id: 'jojo', img: asset('/sprites/matches/sumire.jpg'), alt: 'Sumire' },
  },
];

// Preload all pair images so they appear instantaneously without lag
if (typeof window !== 'undefined') {
  const bgImg = new Image();
  bgImg.src = asset('/sprites/floral_bg.jpg');

  MATCHING_PAIRS.forEach((pair) => {
    const img1 = new Image();
    img1.src = pair.left.img;
    const img2 = new Image();
    img2.src = pair.right.img;
  });
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  },
  exit: { opacity: 0, scale: 0.95 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function MainMenu({ onNavigate, pairIndex = 0 }) {
  const currentPair = MATCHING_PAIRS[pairIndex % MATCHING_PAIRS.length];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full flex flex-col p-6 pb-24 justify-center items-center relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${asset('/sprites/floral_bg.jpg')})`,
      }}
    >
      {/* Dark overlay to give depth and contrast */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      <h2 
        className="text-2xl sm:text-3xl font-normal mb-8 text-white text-center tracking-wide z-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Dale pero choose
      </h2>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs z-10">
        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.93 }}
          whileHover={{ scale: 1.04 }}
          onClick={() => onNavigate(currentPair.left.id)}
          className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative cursor-pointer group focus:outline-none ring-0 active:ring-2 active:ring-white/40 transition-all bg-black/20"
        >
          <img 
            src={currentPair.left.img} 
            alt={currentPair.left.alt} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </motion.button>

        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.93 }}
          whileHover={{ scale: 1.04 }}
          onClick={() => onNavigate(currentPair.right.id)}
          className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative cursor-pointer group focus:outline-none ring-0 active:ring-2 active:ring-white/40 transition-all bg-black/20"
        >
          <img 
            src={currentPair.right.img} 
            alt={currentPair.right.alt} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
