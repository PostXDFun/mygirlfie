import { motion } from 'framer-motion';
import { asset } from '../utils';

const menuItems = [
  { 
    id: 'pokemon', 
    label: 'Pokédex', 
    avatar: asset('/sprites/maki.jpg'), 
    color: 'bg-gradient-to-b from-emerald-600 to-teal-800',
    borderColor: 'border-emerald-300/30',
    character: 'Maki',
  },
  { 
    id: 'jojo', 
    label: 'Playlist', 
    avatar: asset('/sprites/yuta.jpg'), 
    color: 'bg-gradient-to-b from-indigo-600 to-purple-900',
    borderColor: 'border-indigo-300/30',
    character: 'Yuta',
  },
];

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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full flex flex-col p-6 bg-blue-900 justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-8 text-white text-center">Elige una sorpresa</h2>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => onNavigate(item.id)}
            className={`aspect-square rounded-3xl ${item.color} flex flex-col items-center justify-center p-3 sm:p-4 shadow-xl border ${item.borderColor} transition-all`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/60 shadow-md mb-2 sm:mb-3 bg-black/20">
              <img 
                src={item.avatar} 
                alt={item.character} 
                className="w-full h-full object-cover object-center scale-105" 
              />
            </div>
            <span className="text-white font-bold text-base sm:text-lg tracking-wide drop-shadow-sm">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
