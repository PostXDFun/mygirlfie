import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { asset } from './utils';
import BootScreen from './components/BootScreen';
import MainMenu from './components/MainMenu';
import PokemonSection from './components/sections/PokemonSection';
import JojoSection from './components/sections/JojoSection';

function App() {
  const [currentScreen, setCurrentScreen] = useState('boot');
  const [pairIndex, setPairIndex] = useState(0);
  const audioRef = useRef(null);

  const navigateTo = (screen) => {
    if (screen === 'menu' && currentScreen !== 'boot') {
      setPairIndex((prev) => prev + 1);
    }
    setCurrentScreen(screen);
  };

  // Manejar el reproductor global de música
  useEffect(() => {
    if (!audioRef.current) return;

    if (currentScreen === 'boot' || currentScreen === 'jojo') {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Autoplay bloqueado:', err));
    }
  }, [currentScreen]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-white selection:bg-white/30">
      {/* Audio Global */}
      <audio 
        ref={audioRef} 
        src={asset('/audio/bgm_sky_full_of_stars.mp3')} 
        loop 
        preload="auto" 
      />

      <AnimatePresence mode="wait">
        {currentScreen === 'boot' && <BootScreen key="boot" onComplete={() => navigateTo('menu')} />}
        {currentScreen === 'menu' && <MainMenu key="menu" onNavigate={navigateTo} pairIndex={pairIndex} />}
        {currentScreen === 'pokemon' && <PokemonSection key="pokemon" onBack={() => navigateTo('menu')} />}
        {currentScreen === 'jojo' && <JojoSection key="jojo" onBack={() => navigateTo('menu')} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
