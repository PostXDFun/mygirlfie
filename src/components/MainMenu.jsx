import { motion } from 'framer-motion';
import { MessageSquare, Music, Image as ImageIcon, Mail } from 'lucide-react';

const menuItems = [
  { id: 'pokemon', label: 'Mensajes', icon: MessageSquare, color: 'bg-emerald-500' },
  { id: 'jojo', label: 'Playlist', icon: Music, color: 'bg-amber-500' },
  { id: 're', label: 'Galería', icon: ImageIcon, color: 'bg-rose-500' },
  { id: 'fnaf', label: 'Cartas', icon: Mail, color: 'bg-indigo-500' },
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
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(item.id)}
            className={`aspect-square rounded-3xl ${item.color} flex flex-col items-center justify-center p-4 shadow-lg border border-white/20`}
          >
            <item.icon size={48} className="text-white mb-4" strokeWidth={1.5} />
            <span className="text-white font-semibold text-lg">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
