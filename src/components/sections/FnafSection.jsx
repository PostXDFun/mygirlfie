import { useState } from 'react';
import { motion } from 'framer-motion';
import BackButton from '../ui/BackButton';

const letters = [
  { id: 1, cam: 'CAM 01', text: 'Aquí puedes escribir tu primera carta de amor. Imagina que es un mensaje secreto que se encuentra en la cámara 1 de seguridad.' },
  { id: 2, cam: 'CAM 02', text: 'Esta es la segunda carta. Puedes hacerla más larga, el contenedor tiene scroll para que quepa todo lo que quieras decirle.' },
  { id: 3, cam: 'CAM 03', text: 'Tercera carta. Sigue añadiendo tantos recuerdos y cosas bonitas como quieras.' },
  { id: 4, cam: 'CAM 04', text: 'Cuarta carta. ¡La cámara 4 revela otro mensaje!' },
];

export default function FnafSection({ onBack }) {
  const [activeCam, setActiveCam] = useState(letters[0]);
  const [staticOverlay, setStaticOverlay] = useState(false);

  const handleCamSwitch = (letter) => {
    setStaticOverlay(true);
    setActiveCam(letter);
    setTimeout(() => setStaticOverlay(false), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-black text-white flex flex-col font-mono relative overflow-hidden"
    >
      {/* CRT Scanline & Static Effects */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 mix-blend-overlay"></div>
      
      {staticOverlay && (
        <div className="absolute inset-0 pointer-events-none z-40 bg-white opacity-20 mix-blend-screen animate-pulse"></div>
      )}

      {/* Red recording dot */}
      <div className="absolute top-6 right-6 flex items-center z-20">
        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse mr-2 shadow-[0_0_10px_red]"></div>
        <span className="text-red-500 font-bold tracking-widest">REC</span>
      </div>

      <BackButton onClick={onBack} />
      
      {/* Top half: Reading Area */}
      <div className="flex-1 mt-20 mb-4 px-6 relative z-10">
        <div className="w-full h-full border-2 border-white/20 rounded-lg p-6 flex flex-col bg-white/5 backdrop-blur-sm relative">
          <h2 className="text-2xl font-bold mb-4 text-white/50">{activeCam.cam}</h2>
          <div className="flex-1 overflow-y-auto pr-2 no-scrollbar text-lg leading-relaxed text-gray-300">
            {/* PLACEHOLDER: Pon el texto de tu carta aquí */}
            {activeCam.text}
          </div>
          
          {/* Decorative battery */}
          <div className="absolute bottom-4 right-4 flex gap-1 opacity-50">
            <div className="w-4 h-8 bg-green-500 rounded-sm"></div>
            <div className="w-4 h-8 bg-green-500 rounded-sm"></div>
            <div className="w-4 h-8 bg-green-500 rounded-sm"></div>
            <div className="w-4 h-8 bg-green-500/30 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Bottom half: Camera Buttons */}
      <div className="h-48 px-4 pb-6 z-10 w-full max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3 h-full">
          {letters.map((letter) => (
            <button
              key={letter.id}
              onClick={() => handleCamSwitch(letter)}
              className={`w-full h-full rounded border-2 font-bold text-xl tracking-widest transition-colors flex items-center justify-center ${
                activeCam.id === letter.id 
                  ? 'bg-white text-black border-white shadow-[0_0_15px_white]' 
                  : 'bg-black text-white/70 border-white/30 hover:bg-white/10'
              }`}
            >
              {letter.cam}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
