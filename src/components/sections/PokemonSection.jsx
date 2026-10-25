import { useState } from 'react';
import { motion } from 'framer-motion';
import BackButton from '../ui/BackButton';
import { asset } from '../../utils';

const favoritePokemons = [
  { 
    id: '584', 
    name: 'Vanilluxe',  
    level: 7,   
    type: 'Hielo', 
    sprite: asset('/sprites/vanilluxe.png'), 
    phrase: 'el goat' 
  },
  { 
    id: '925', 
    name: 'Maushold',  
    level: 67,  
    type: 'Normal', 
    sprite: asset('/sprites/maushold.png'), 
    phrase: 'us literal' 
  },
  { 
    id: '143', 
    name: 'Snorlax',   
    level: 69,  
    type: 'Normal', 
    sprite: asset('/sprites/snorlax.png'), 
    phrase: 'goat fatass' 
  },
  { 
    id: '380', 
    name: 'Latios y Latias', 
    level: 78,  
    type: 'Dragón/Psíquico', 
    sprite: [asset('/sprites/latios.png'), asset('/sprites/latias.png')], 
    phrase: 'mira que peak somos juntos mi amor bello' 
  },
  { 
    id: '791', 
    name: 'Solgaleo',  
    level: 100, 
    type: 'Psíquico/Acero', 
    sprite: asset('/sprites/solgaleo.png'), 
    phrase: 'se como Solgaleo y aguanta las monstruaciones, leona' 
  },
];

export default function PokemonSection({ onBack }) {
  const [selected, setSelected] = useState(favoritePokemons[0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-[#303030] flex flex-col items-center justify-center relative"
      style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: 'pixelated' }}
    >
      <BackButton onClick={onBack} />

      {/* ===== GBA POKÉDEX SCREEN ===== */}
      <div className="w-[95%] max-w-[450px] flex flex-col mt-12 mb-3">

        {/* ── HEADER BAR (Red) ── */}
        <div
          className="w-full flex items-center justify-center py-3 relative shrink-0"
          style={{
            background: 'linear-gradient(180deg, #f86868 0%, #d83030 40%, #c02020 100%)',
            borderTop: '3px solid #f8a0a0',
            borderBottom: '4px solid #000',
            borderLeft: '3px solid #000',
            borderRight: '3px solid #000',
          }}
        >
          <span className="text-white text-[12px] sm:text-[14px] tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
            Kanto Pokédex
          </span>
        </div>

        {/* ── MAIN BODY (Fixed height 2-column layout) ── */}
        <div
          className="w-full flex h-[270px] sm:h-[320px] shrink-0"
          style={{
            border: '3px solid #000',
            borderTop: 'none',
          }}
        >

          {/* ▌LEFT COLUMN — Sprite, Name, Stats ▌ */}
          <div
            className="w-[45%] h-full flex flex-col items-center justify-between relative overflow-hidden shrink-0"
            style={{
              background: '#d8d8d0',
              borderRight: '3px solid #000',
            }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #b8b8b0 1px, transparent 1px), linear-gradient(to bottom, #b8b8b0 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Name plate */}
            <div
              className="relative z-10 w-[92%] mt-3 py-[6px] px-1 text-center text-black truncate shrink-0"
              style={{
                background: '#f0f0e8',
                borderLeft: '5px solid #d83030',
                borderRight: '5px solid #d83030',
                borderTop: '2px solid #888',
                borderBottom: '2px solid #888',
                fontSize: '9px',
              }}
            >
              {selected.name}
            </div>

            {/* Sprite area (fixed height flex box) */}
            <div className="flex-1 flex items-center justify-center z-10 relative w-full px-1 overflow-hidden">
              {/* Pokeball watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none">
                <svg width="90" height="90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="6" />
                  <rect x="0" y="47" width="100" height="6" fill="#000" />
                  <circle cx="50" cy="50" r="14" fill="#d8d8d0" stroke="#000" strokeWidth="5" />
                  <circle cx="50" cy="50" r="6" fill="#d8d8d0" stroke="#000" strokeWidth="3" />
                </svg>
              </div>

              {selected.sprite ? (
                Array.isArray(selected.sprite) ? (
                  <div className="flex items-center justify-center relative z-10 w-full h-full">
                    <img
                      src={selected.sprite[0]}
                      alt={`${selected.name} 1`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain -mr-4 relative z-10"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <img
                      src={selected.sprite[1]}
                      alt={`${selected.name} 2`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-20"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                ) : (
                  <img
                    src={selected.sprite}
                    alt={selected.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain relative z-10"
                    style={{ imageRendering: 'pixelated' }}
                  />
                )
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 relative z-10 flex items-center justify-center">
                  <span className="text-[8px] text-gray-500 bg-white/60 px-1 rounded text-center">{selected.name}</span>
                </div>
              )}
            </div>

            {/* Stats plate */}
            <div
              className="relative z-10 w-[94%] mb-3 py-[6px] px-2 text-black flex flex-col justify-center shrink-0"
              style={{
                background: '#f0f0e8',
                borderLeft: '4px solid #d83030',
                borderRight: '4px solid #d83030',
                borderTop: '2px solid #888',
                borderBottom: '2px solid #888',
                fontSize: '8px',
                lineHeight: '14px',
              }}
            >
              <div className="flex justify-between items-center mb-[4px]">
                <span>Niv:</span>
                <span className="font-bold">{selected.level}</span>
              </div>
              <div className="flex flex-col mt-[2px]">
                <span style={{ fontSize: '7px', color: '#555' }}>Tipo:</span>
                <span className="font-bold text-center tracking-tighter" style={{ fontSize: '7px', marginTop: '2px' }}>{selected.type}</span>
              </div>
            </div>
          </div>

          {/* ▌RIGHT COLUMN — Pokémon list ▌ */}
          <div className="w-[55%] flex bg-[#f0f0e8] relative h-full">

            {/* Red vertical strip */}
            <div
              className="absolute left-0 top-0 bottom-0 z-10"
              style={{
                width: '24px',
                background: 'linear-gradient(180deg, #f06060 0%, #d83030 100%)',
                borderRight: '2px solid #a02020',
              }}
            />

            {/* List area */}
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar z-20 text-black relative h-full">
              {favoritePokemons.map((pkmn) => {
                const isSelected = selected.id === pkmn.id;
                return (
                  <button
                    key={pkmn.id}
                    onClick={() => setSelected(pkmn)}
                    className="w-full flex items-center relative active:bg-black/5 shrink-0"
                    style={{
                      height: '54px',
                      borderBottom: '2px solid #b0b0a8',
                    }}
                  >
                    {/* Pokeball / circle indicator */}
                    <div
                      className="absolute z-30 flex items-center justify-center"
                      style={{ left: '4px', top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {isSelected ? (
                        /* Mini pokeball */
                        <svg width="16" height="16" viewBox="0 0 100 100" style={{ imageRendering: 'pixelated' }}>
                          <circle cx="50" cy="50" r="46" fill="#f0f0e8" stroke="#000" strokeWidth="8" />
                          <path d="M4,50 L96,50" stroke="#000" strokeWidth="6" />
                          <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="4" />
                          <path d="M 8 46 A 44 44 0 0 1 92 46 Z" fill="#d83030" />
                          <circle cx="50" cy="50" r="12" fill="#f0f0e8" stroke="#000" strokeWidth="6" />
                        </svg>
                      ) : (
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: '#f0f0e8',
                            border: '2px solid #888',
                          }}
                        />
                      )}
                    </div>

                    {/* Selection rounded outline */}
                    {isSelected && (
                      <div
                        className="absolute pointer-events-none z-20"
                        style={{
                          left: '-2px',
                          right: '2px',
                          top: '2px',
                          bottom: '2px',
                          border: '2px solid #d83030',
                          borderRadius: '16px 8px 8px 16px',
                        }}
                      />
                    )}

                    {/* ID and Name */}
                    <div className="flex items-center z-30 overflow-hidden pr-1" style={{ marginLeft: '26px', gap: '6px' }}>
                      <span style={{ fontSize: '8px', color: '#606060' }}>{pkmn.id}</span>
                      <span style={{ fontSize: '8px' }} className="truncate">{pkmn.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Decorative GBA scrollbar */}
            <div
              className="flex flex-col items-center justify-between py-[4px] z-20 shrink-0 h-full"
              style={{
                width: '24px',
                background: '#e0e0d8',
                borderLeft: '2px solid #000',
              }}
            >
              {/* Up arrow */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: '16px',
                  height: '16px',
                  background: '#c8c8c0',
                  border: '2px solid #000',
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderBottom: '6px solid #000',
                  }}
                />
              </div>

              {/* Blue scroll track */}
              <div
                className="flex-1 my-[4px] relative"
                style={{
                  width: '14px',
                  background: '#4060e0',
                  border: '2px solid #000',
                  borderRadius: '2px',
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full"
                  style={{ height: '3px', background: 'rgba(255,255,255,0.4)' }}
                />
              </div>

              {/* Down arrow */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: '16px',
                  height: '16px',
                  background: '#c8c8c0',
                  border: '2px solid #000',
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '6px solid #000',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM TEXT BOX (Classic RPG style) ===== */}
      <div
        className="w-[95%] max-w-[450px] mb-4 text-black"
        style={{
          background: '#f0f0e8',
          border: '4px solid #000',
          boxShadow: 'inset 3px 3px 0 #fff, inset -3px -3px 0 #a0a098',
          padding: '16px 16px',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <p style={{ fontSize: '11px', lineHeight: '22px' }}>
          {selected.phrase}
        </p>
      </div>
    </motion.div>
  );
}
