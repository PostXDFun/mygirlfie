import { motion } from 'framer-motion';
import { asset } from '../utils';

const menuItems = [
  { 
    id: 'pokemon', 
    label: 'Pokédex', 
    avatar: asset('/sprites/maki.jpg'), 
    character: 'Maki',
  },
  { 
    id: 'jojo', 
    label: 'Playlist', 
    avatar: asset('/sprites/yuta.jpg'), 
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
      <h2 className="text-2xl font-bold mb-8 text-white text-center">Dale pero choose</h2>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => onNavigate(item.id)}
            className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative cursor-pointer group focus:outline-none ring-0 active:ring-2 active:ring-white/40 transition-all"
          >
            <img 
              src={item.avatar} 
              alt={item.character} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
