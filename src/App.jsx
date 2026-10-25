import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootScreen from './components/BootScreen';
import MainMenu from './components/MainMenu';
import PokemonSection from './components/sections/PokemonSection';
import JojoSection from './components/sections/JojoSection';
import ResidentEvilSection from './components/sections/ResidentEvilSection';
import FnafSection from './components/sections/FnafSection';

function App() {
  const [currentScreen, setCurrentScreen] = useState('boot');
  const audioRef = useRef(null);

  const navigateTo = (screen) => {
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
        src="/audio/bgm_sky_full_of_stars.mp3" 
        loop 
        preload="auto" 
      />

      <AnimatePresence mode="wait">
        {currentScreen === 'boot' && <BootScreen key="boot" onComplete={() => navigateTo('menu')} />}
        {currentScreen === 'menu' && <MainMenu key="menu" onNavigate={navigateTo} />}
        {currentScreen === 'pokemon' && <PokemonSection key="pokemon" onBack={() => navigateTo('menu')} />}
        {currentScreen === 'jojo' && <JojoSection key="jojo" onBack={() => navigateTo('menu')} />}
        {currentScreen === 're' && <ResidentEvilSection key="re" onBack={() => navigateTo('menu')} />}
        {currentScreen === 'fnaf' && <FnafSection key="fnaf" onBack={() => navigateTo('menu')} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
