import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { asset } from '../../utils';

const COLS = 10;
const ROWS = 5;
const IMG_ASPECT = 1024 / 578;

const GRID_TOP = 0.055;
const GRID_LEFT = 0.058;
const GRID_W = 0.885;
const GRID_H = 0.76;

const initialItems = [
  { id: 1, title: 'Handgun ammo', desc: 'te handgun ammo', img: asset('/sprites/re_handgun_ammo.png'), c: 1, r: 1, w: 2, h: 1 },
  { id: 2, title: 'Foto 2', desc: 'Aquí va la descripción o recuerdo de esta foto.', c: 4, r: 1, w: 5, h: 2 },
  { id: 3, title: 'Foto 3', desc: 'Aquí va la descripción o recuerdo de esta foto.', c: 9, r: 1, w: 2, h: 2 },
  { id: 4, title: 'Foto 4', desc: 'Aquí va la descripción o recuerdo de esta foto.', c: 1, r: 3, w: 1, h: 1 },
  { id: 5, title: 'Foto 5', desc: 'Aquí va la descripción o recuerdo de esta foto.', c: 2, r: 3, w: 2, h: 1 },
  { id: 6, title: 'Foto 6', desc: 'Aquí va la descripción o recuerdo de esta foto.', c: 5, r: 3, w: 2, h: 2 },
  { id: 7, title: 'Foto 7', desc: 'Aquí va la descripción o recuerdo de esta foto.', c: 7, r: 3, w: 1, h: 1 },
  { id: 8, title: 'Foto 8', desc: 'Aquí va la descripción o recuerdo de esta foto.', c: 1, r: 4, w: 4, h: 2 },
];

export default function ResidentEvilSection({ onBack }) {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const [imgBounds, setImgBounds] = useState(null);
  
  // Estado para nuestro sistema manual de Drag
  const [dragState, setDragState] = useState(null);

  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const check = () => setIsPortrait(window.innerHeight > window.innerWidth);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const updateBounds = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const containerAspect = cw / ch;
    let renderW, renderH, offsetX, offsetY;
    if (containerAspect > IMG_ASPECT) {
      renderH = ch;
      renderW = ch * IMG_ASPECT;
      offsetX = (cw - renderW) / 2;
      offsetY = 0;
    } else {
      renderW = cw;
      renderH = cw / IMG_ASPECT;
      offsetX = 0;
      offsetY = (ch - renderH) / 2;
    }
    setImgBounds({ renderW, renderH, offsetX, offsetY });
  }, []);

  useEffect(() => {
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [updateBounds, isPortrait]);

  const isOccupied = (newC, newR, w, h, currentId) => {
    if (newC < 1 || newC + w - 1 > COLS) return true;
    if (newR < 1 || newR + h - 1 > ROWS) return true;
    for (const it of items) {
      if (it.id === currentId) continue;
      const noOverlap =
        newC + w - 1 < it.c ||
        newC > it.c + it.w - 1 ||
        newR + h - 1 < it.r ||
        newR > it.r + it.h - 1;
      if (!noOverlap) return true;
    }
    return false;
  };

  // ----- SISTEMA DE ARRASTRE MANUAL (Soluciona el bug de ejes 100%) -----
  const handlePointerDown = (e, item) => {
    e.target.setPointerCapture(e.pointerId);
    setDragState({
      id: item.id,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      hasMoved: false,
    });
  };

  const handlePointerMove = (e, item) => {
    if (dragState && dragState.id === item.id) {
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      setDragState((prev) => ({
        ...prev,
        currentX: e.clientX,
        currentY: e.clientY,
        hasMoved: prev.hasMoved || Math.abs(dx) > 5 || Math.abs(dy) > 5, // Umbral para no confundir con tap
      }));
    }
  };

  const handlePointerUp = (e, item) => {
    e.target.releasePointerCapture(e.pointerId);
    if (!dragState || dragState.id !== item.id) return;

    if (!dragState.hasMoved) {
      // Fue un toque/click
      setSelectedItem(item);
      setDragState(null);
      return;
    }

    if (!gridRef.current) {
      setDragState(null);
      return;
    }

    const dx = dragState.currentX - dragState.startX;
    const dy = dragState.currentY - dragState.startY;
    const rect = gridRef.current.getBoundingClientRect();

    let deltaC, deltaR;
    if (isPortrait) {
      // Cálculo preciso para pantalla rotada
      const cellW = rect.height / COLS; // El alto de la pantalla es el ancho del maletín
      const cellH = rect.width / ROWS;  // El ancho de la pantalla es el alto del maletín
      deltaC = Math.round(dy / cellW);
      deltaR = Math.round(-dx / cellH);
    } else {
      const cellW = rect.width / COLS;
      const cellH = rect.height / ROWS;
      deltaC = Math.round(dx / cellW);
      deltaR = Math.round(dy / cellH);
    }

    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== item.id) return i;
        const newC = i.c + deltaC;
        const newR = i.r + deltaR;
        if ((deltaC !== 0 || deltaR !== 0) && !isOccupied(newC, newR, i.w, i.h, i.id)) {
          return { ...i, c: newC, r: newR };
        }
        return i;
      })
    );
    setDragState(null);
  };

  // Usamos transform CSS directo en el contenedor para asegurar consistencia
  const landscapeStyle = isPortrait
    ? {
        position: 'fixed',
        width: '100vh',
        height: '100vw',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(90deg)',
        zIndex: 40,
      }
    : {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 40,
      };

  const gridStyle = imgBounds
    ? {
        position: 'absolute',
        left: imgBounds.offsetX + imgBounds.renderW * GRID_LEFT,
        top: imgBounds.offsetY + imgBounds.renderH * GRID_TOP,
        width: imgBounds.renderW * GRID_W,
        height: imgBounds.renderH * GRID_H,
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gap: '2px',
        padding: '1px',
        backgroundColor: '#282828',
        borderRadius: '2px',
      }
    : { display: 'none' };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={landscapeStyle}
        className="bg-black flex items-center justify-center overflow-hidden"
      >
        <button
          onClick={onBack}
          className="absolute top-3 left-3 z-50 w-9 h-9 bg-black/80 rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/20 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>

        <div ref={containerRef} className="w-full h-full relative">
          {/* 1. Fondo Foggy original (detrás de la imagen) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div 
              className="absolute inset-0 opacity-70" 
              style={{ background: 'radial-gradient(circle at 50% 50%, #3d402b 0%, #12140c 55%, #000000 90%)' }} 
            />
            <div 
              className="absolute inset-0 opacity-[0.06]" 
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
            />
          </div>

          <img
            src={asset("/sprites/attache_case.png")}
            alt="RE4 Attaché Case"
            className="absolute inset-0 w-full h-full object-contain select-none z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            draggable={false}
            onLoad={updateBounds}
          />

          {/* 2. Viñeta oscura en los bordes para difuminar cualquier corte recto de la imagen */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_60px_rgba(0,0,0,1)] z-15" />

          <div ref={gridRef} style={gridStyle} className="z-20">
            {Array.from({ length: COLS * ROWS }).map((_, i) => (
              <div
                key={`cell-${i}`}
                style={{
                  gridColumn: (i % COLS) + 1,
                  gridRow: Math.floor(i / COLS) + 1,
                }}
                className="bg-[#1a1a1a]"
              />
            ))}

            {items.map((item) => {
              const isDragging = dragState?.id === item.id;
              let x = 0, y = 0;

              // Calcular transformación visual exacta mapeando los ejes físicos a la rotación de pantalla
              if (isDragging) {
                const dx = dragState.currentX - dragState.startX;
                const dy = dragState.currentY - dragState.startY;
                if (isPortrait) {
                  x = dy;
                  y = -dx;
                } else {
                  x = dx;
                  y = dy;
                }
              }

              return (
                <motion.div
                  key={item.id}
                  onPointerDown={(e) => handlePointerDown(e, item)}
                  onPointerMove={(e) => handlePointerMove(e, item)}
                  onPointerUp={(e) => handlePointerUp(e, item)}
                  onPointerCancel={(e) => handlePointerUp(e, item)}
                  animate={{
                    x,
                    y,
                    scale: isDragging ? 1.06 : 1,
                    zIndex: isDragging ? 50 : 10,
                  }}
                  transition={{
                    x: { type: 'tween', duration: 0 },
                    y: { type: 'tween', duration: 0 },
                    scale: { duration: 0.15 },
                  }}
                  style={{
                    gridColumn: `${item.c} / span ${item.w}`,
                    gridRow: `${item.r} / span ${item.h}`,
                    touchAction: 'none',
                  }}
                  className="bg-[#222] border border-white/20 hover:border-white/40 cursor-grab active:cursor-grabbing flex items-center justify-center transition-colors relative group"
                >
                  <div className="absolute inset-[2px] border border-white/10 flex items-center justify-center pointer-events-none bg-[#1e1e1e] overflow-hidden p-1">
                    {item.img ? (
                      <img src={item.img} alt={item.title} className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                    ) : (
                      <span className="text-white/35 text-[7px] sm:text-[9px] font-mono select-none tracking-wider uppercase text-center">
                        {item.title}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-[2px] left-[3px] w-2.5 h-[2px] bg-white/30 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Modal Examinar */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            style={
              isPortrait
                ? {
                    position: 'fixed',
                    width: '100vh',
                    height: '100vw',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                    zIndex: 200,
                  }
                : { position: 'fixed', inset: 0, zIndex: 200 }
            }
            className="bg-black/95 flex items-center justify-center p-6"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white z-50 transition-colors"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[90%] max-w-lg h-[80vw] max-h-[400px] sm:aspect-[4/3] sm:h-auto bg-[#0d0d0d] border border-white/10 rounded flex flex-col overflow-hidden shadow-2xl relative"
            >
              <div className="flex-1 min-h-0 bg-gradient-to-b from-[#141414] to-[#080808] flex items-center justify-center p-6 relative">
                {selectedItem.img ? (
                  <img 
                    src={selectedItem.img} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-28 h-28 border border-dashed border-white/15 rounded flex items-center justify-center mx-auto mb-3">
                      <span className="text-white/15 text-sm font-mono">FOTO</span>
                    </div>
                    <p className="text-white/20 text-xs tracking-widest uppercase">Tu foto irá aquí</p>
                  </div>
                )}
              </div>
              <div className="shrink-0 bg-black border-t border-white/10 px-5 py-4">
                <h2
                  className="text-[#c8a84e] font-bold uppercase tracking-[0.15em] mb-1"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: '14px' }}
                >
                  {selectedItem.title}
                </h2>
                <p className="text-gray-400 text-xs leading-relaxed font-mono tracking-wide">
                  {selectedItem.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
