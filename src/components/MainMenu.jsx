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
  MATCHING_PAIRS.forEach((pair) => {
    const img1 = new Image();
    img1.src = pair.left.img;
    const img2 = new Image();
    img2.src = pair.right.img;
  });
}

let lastPairIndex = -1;

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

export default function MainMenu({ onNavigate }) {
  const [currentPair] = useState(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * MATCHING_PAIRS.length);
    } while (nextIndex === lastPairIndex && MATCHING_PAIRS.length > 1);
    lastPairIndex = nextIndex;
    return MATCHING_PAIRS[nextIndex];
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full flex flex-col p-6 bg-blue-900 justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-8 text-white text-center">Dale pero choose</h2>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
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
