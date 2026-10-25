import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Disc, Volume2, VolumeX } from 'lucide-react';
import BackButton from '../ui/BackButton';
import { asset } from '../../utils';

const initialSongs = [
  { 
    id: 1, 
    title: 'And I Love Her', 
    artist: 'The Beatles', 
    coverImg: asset('/covers/asa_denji.jpg'), 
    coverPosition: 'object-[75%_25%] scale-125',
    coverColor: 'from-[#8b0000] to-[#2b0000]',
    audioSrc: asset('/audio/And I Love Her (Remastered 2009) 4.mp3') 
  },
  { 
    id: 2, 
    title: 'Memories of You', 
    artist: 'Yumi Kawamura', 
    coverImg: asset('/covers/makoto_aigis.jpg'),
    coverPosition: 'object-[center_35%]',
    coverColor: 'from-[#191970] to-[#050520]',
    audioSrc: asset('/audio/Memories of You (Remix) - Persona 3 The Movie.mp3') 
  },
  { 
    id: 3, 
    title: 'Love Buzz', 
    artist: 'Nirvana', 
    coverImg: asset('/covers/reze_denji.jpg'),
    coverPosition: 'object-center',
    coverColor: 'from-[#b8860b] to-[#3a2002]',
    audioSrc: asset('/audio/Nirvana - Love Buzz 4.mp3') 
  },
  { 
    id: 4, 
    title: 'Wait and Bleed', 
    artist: 'Slipknot', 
    coverImg: asset('/covers/reze_bomb.jpg'), 
    coverPosition: 'object-[center_20%]',
    coverColor: 'from-[#800000] to-[#1a0000]',
    audioSrc: asset('/audio/Slipknot - Wait And Bleed (Audio) 4.mp3') 
  },
  { 
    id: 5, 
    title: 'Forever', 
    artist: 'The Little Dippers', 
    coverImg: asset('/covers/josuke_yasuho.jpg'),
    coverPosition: 'object-[center_25%]',
    coverColor: 'from-[#c71585] to-[#4a0033]',
    audioSrc: asset('/audio/The Little Dippers - Forever (Sub. Español) _ _ Lyrics.mp3') 
  },
  { 
    id: 6, 
    title: 'The Rumbling', 
    artist: 'SiM', 
    coverImg: asset('/covers/mikasa_eren.jpg'), 
    coverPosition: 'object-[center_40%]',
    coverColor: 'from-[#2f4f4f] to-[#0f1f1f]',
    audioSrc: asset('/audio/Attack on Titan The Final Season Part 2 Opening｜The Rumbling - SiM 4.mp3') 
  },
  { 
    id: 7, 
    title: 'Roundabout', 
    artist: 'Yes', 
    coverImg: asset('/covers/jolyne_jotaro.jpg'), 
    coverPosition: 'object-center',
    coverColor: 'from-[#d2691e] to-[#4a250a]',
    audioSrc: asset('/audio/Yes - Roundabout (Original 1971) 4.mp3') 
  },
  { 
    id: 8, 
    title: 'Vermilion', 
    artist: 'Slipknot', 
    coverImg: asset('/covers/springtrap.jpg'), 
    coverPosition: 'object-[center_30%]',
    coverColor: 'from-[#a00000] to-[#300000]',
    audioSrc: asset('/audio/Vermilion 4.mp3') 
  },
  { 
    id: 9, 
    title: 'SPIN', 
    artist: 'Kroi', 
    coverImg: asset('/covers/gyro.jpg'),
    coverPosition: 'object-center',
    coverColor: 'from-[#ff6347] to-[#4a1a10]',
    audioSrc: asset('/audio/SPIN.mp3') 
  },
  { 
    id: 10, 
    title: 'Holy Steel', 
    artist: 'Nico Bellisario, Shihori', 
    coverImg: asset('/covers/steel_ball.jpg'), 
    coverColor: 'from-[#4169e1] to-[#0a1a40]',
    audioSrc: asset("/audio/JoJo_ ★ STEEL BALL RUN OP ★『Holy Steel』- Original - JoJo's Bizarre Adventure Part 7 【ジョジョの奇妙な冒険】 4.mp3") 
  },
  { 
    id: 11, 
    title: 'Louise', 
    artist: 'TV Girl', 
    coverImg: asset('/covers/reze_pink.jpg'),
    coverPosition: 'object-[center_35%]',
    coverColor: 'from-[#ff69b4] to-[#4a0028]',
    audioSrc: asset('/audio/TV Girl - Louise.mp3') 
  },
  { 
    id: 12, 
    title: 'Your Affection', 
    artist: 'Shihoko Hirata', 
    coverImg: asset('/covers/bruno.jpg'), 
    coverPosition: 'object-[60%_center]',
    coverColor: 'from-[#ffd700] to-[#4a3a00]',
    audioSrc: asset('/audio/Your Affection 4.mp3') 
  },
  { 
    id: 13, 
    title: 'Sweet', 
    artist: 'Shoji Meguro', 
    coverImg: asset('/covers/ren_sumire.jpg'), 
    coverPosition: 'object-[center_30%] scale-125',
    coverColor: 'from-[#dc143c] to-[#3a0510]',
    audioSrc: asset('/audio/Persona 5 OST 69 - Sweet.mp3') 
  },
];

export default function JojoSection({ onBack }) {
  const [songs] = useState(initialSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = songs[currentSongIndex];
  const audioRef = useRef(null);

  // Control de reproducción de audio local si existe audioSrc
  useEffect(() => {
    if (currentSong.audioSrc && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex, currentSong.audioSrc]);

  // Al cambiar de canción reiniciar contadores
  useEffect(() => {
    setCurrentTime(0);
    setProgress(0);
    setDuration(0);
  }, [currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(currentProgress) ? 0 : currentProgress);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-[#ebdcb9] text-[#2c1d11] flex flex-col font-serif relative overflow-hidden select-none"
    >
      {/* Audio local */}
      {currentSong.audioSrc && (
        <audio 
          ref={audioRef} 
          src={currentSong.audioSrc} 
          onEnded={handleNext}
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}

      {/* Elementos decorativos estilo Manga / Steel Ball Run */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(#8c6239 1px, transparent 1px), radial-gradient(#8c6239 1px, #ebdcb9 1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />
      
      {/* Onomatopeyas y Elementos Decorativos JoJo */}
      <div className="absolute top-[35%] right-[2%] sm:right-[15%] text-lg sm:text-2xl md:text-3xl font-extrabold text-[#74471b]/25 pointer-events-none rotate-[12deg] tracking-widest z-0">
        GO JOHNNY GO!
      </div>

      {/* Doodles Pequeños (Adaptados para móvil) */}
      <img src={asset("/sprites/doodle_josuke_dog.jpg")} alt="Josuke Dog Doodle" className="absolute top-[5%] right-[5%] sm:right-[15%] w-14 sm:w-20 rotate-[-10deg] opacity-40 mix-blend-multiply pointer-events-none z-0" />
      <img src={asset("/sprites/doodle_iggy.jpg")} alt="Iggy Doodle" className="absolute top-[16%] left-[6%] sm:left-[18%] w-16 sm:w-20 rotate-[15deg] opacity-40 mix-blend-multiply pointer-events-none z-0" />
      <img src={asset("/sprites/johnny.jpg")} alt="Johnny Doodle" className="absolute top-[22%] right-[8%] sm:right-[12%] w-20 sm:w-28 rotate-[-18deg] opacity-40 mix-blend-multiply pointer-events-none z-0" />
      <img src={asset("/sprites/soft_and_wet.jpg")} alt="Soft and Wet Doodle" className="absolute top-[45%] left-[2%] sm:left-[10%] w-16 sm:w-24 rotate-[25deg] opacity-40 mix-blend-multiply pointer-events-none z-0" />
      <img src={asset("/sprites/doodle_abbacchio.jpg")} alt="Abbacchio Doodle" className="absolute bottom-[5%] left-[5%] sm:left-[15%] w-14 sm:w-20 rotate-[-15deg] opacity-40 mix-blend-multiply pointer-events-none z-0" />

      <BackButton onClick={onBack} />

      {/* Header Western / SBR */}
      <div className="pt-14 pb-2 text-center z-10">
        <h1 
          className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#3d2314] drop-shadow-sm uppercase"
          style={{ fontFamily: "'Rye', serif" }}
        >
          ★ Playlist ★
        </h1>
        <div className="w-32 h-0.5 bg-[#74471b] mx-auto mt-1 opacity-60"></div>
      </div>

      {/* REPRODUCTOR: VINILO GIRATORIO CON ARTE */}
      <div className="flex-none flex flex-col items-center justify-center px-6 z-10 py-1">
        
        {/* Marco metálico / Esfera de Acero (Steel Ball Frame) */}
        <div className="relative p-3 rounded-full bg-gradient-to-b from-[#a38054] via-[#5c4028] to-[#2c1d11] shadow-2xl border-2 border-[#d4af37]">
          
          {/* DISCO DE VINILO */}
          <div
            className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#111111] border-4 border-[#222222] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] flex items-center justify-center relative overflow-hidden animate-[spin_4s_linear_infinite]"
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          >
            {/* Surcos del vinilo */}
            <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none"></div>
            <div className="absolute inset-5 rounded-full border border-white/5 pointer-events-none"></div>
            <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none"></div>
            <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none"></div>

            {/* CENTRO DEL DISCO (Arte de la Canción) */}
            <div className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr ${currentSong.coverColor} border-4 border-[#d4af37] shadow-lg flex items-center justify-center relative overflow-hidden z-10`}>
              {currentSong.coverImg ? (
                <img 
                  src={currentSong.coverImg} 
                  alt={currentSong.title}
                  className={`w-full h-full object-cover ${currentSong.coverPosition || 'object-center'}`} 
                />
              ) : (
                <div className="text-center p-1">
                  <Disc size={24} className={`text-[#d4af37] mx-auto ${isPlaying ? 'animate-spin' : 'opacity-80'}`} />
                  <span className="text-[7px] font-bold text-[#ebdcb9] block truncate w-14 mt-0.5">
                    {currentSong.title}
                  </span>
                </div>
              )}
              {/* Orificio central del vinilo */}
              <div className="w-3.5 h-3.5 bg-[#111111] rounded-full border-2 border-[#d4af37] absolute z-20"></div>
            </div>
          </div>

          {/* Aguja del tocadiscos (Estilo vintage) */}
          <div className="absolute top-2 right-4 w-12 h-16 pointer-events-none z-20">
            <div className="w-3 h-3 bg-[#d4af37] rounded-full border border-black shadow"></div>
            <div className="w-1 h-12 bg-gray-400 transform rotate-[25deg] origin-top-left shadow"></div>
          </div>
        </div>

        {/* Info de la Canción Actual */}
        <div className="mt-3 text-center max-w-xs px-2">
          <h2 
            className="text-base sm:text-lg font-bold truncate text-[#2c1d11]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {currentSong.title}
          </h2>
          <p className="text-xs font-semibold text-[#74471b] tracking-wider uppercase mt-0.5">
            {currentSong.artist}
          </p>
        </div>

        {/* Barra de Progreso Western */}
        <div className="w-full max-w-xs mt-2 flex flex-col gap-1 px-2">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[10px] font-bold text-[#74471b] uppercase">
              {isPlaying ? 'Playing now...' : 'Paused'}
            </span>
            <span className="text-[10px] font-bold text-[#74471b] tracking-wider">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-[#b8986c] rounded-full overflow-hidden border border-[#5c4028] shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#8c6239] to-[#d4af37]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#74471b] hover:text-[#d4af37] transition-colors p-1"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>

        {/* Controles Estilo Steel Ball / Western */}
        <div className="flex items-center justify-center gap-6 mt-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="w-9 h-9 bg-[#74471b] text-[#ebdcb9] rounded-full flex items-center justify-center border-2 border-[#d4af37] shadow-md"
          >
            <SkipBack size={16} fill="currentColor" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-13 h-13 bg-gradient-to-br from-[#d4af37] to-[#8c6239] text-[#2c1d11] rounded-full flex items-center justify-center border-2 border-[#2c1d11] shadow-xl p-3"
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} fill="currentColor" className="ml-1" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-9 h-9 bg-[#74471b] text-[#ebdcb9] rounded-full flex items-center justify-center border-2 border-[#d4af37] shadow-md"
          >
            <SkipForward size={16} fill="currentColor" />
          </motion.button>
        </div>
      </div>

      {/* LISTA DE CANCIONES (Western Wanted Card Style) */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6 no-scrollbar z-10 mt-1">
        <div className="flex flex-col gap-2 max-w-sm mx-auto">
          {songs.map((song, index) => {
            const isSelected = currentSongIndex === index;
            return (
              <motion.button
                key={song.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectSong(index)}
                className={`flex items-center w-full p-2.5 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'bg-[#5c4028] text-[#ebdcb9] border-[#d4af37] shadow-lg scale-[1.01]'
                    : 'bg-[#dfceaa] text-[#2c1d11] border-[#8c6239]/40 hover:bg-[#d5c29b]'
                }`}
              >
                {/* Mini disco giratorio si está seleccionada */}
                <div className="w-9 h-9 rounded-full bg-[#111111] border-2 border-[#d4af37] flex-none mr-3 flex items-center justify-center relative overflow-hidden">
                  <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${song.coverColor} flex items-center justify-center`}>
                    {song.coverImg && (
                      <img src={song.coverImg} alt="" className="w-full h-full object-cover rounded-full" />
                    )}
                    <div className="w-1 h-1 bg-[#111111] rounded-full border border-white"></div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 overflow-hidden">
                  <p 
                    className="font-bold text-xs sm:text-sm truncate"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {index + 1}. {song.title}
                  </p>
                  <p className={`text-[10px] truncate ${isSelected ? 'text-[#d4af37]' : 'text-[#74471b]'}`}>
                    {song.artist}
                  </p>
                </div>

                {/* Playing indicator */}
                {isSelected && isPlaying && (
                  <span className="text-[10px] font-extrabold text-[#d4af37] animate-pulse ml-2 shrink-0 uppercase">
                    ▶ Playing
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
