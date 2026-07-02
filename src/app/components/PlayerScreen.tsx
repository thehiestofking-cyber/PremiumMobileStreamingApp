import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Settings, Cast, Play, Pause, SkipForward, SkipBack,
  Volume2, VolumeX, Maximize2, Lock, PictureInPicture2, List,
  Subtitles, Gauge, Mic2, ChevronRight, SkipForward as Next,
} from 'lucide-react';
import type { ContentItem } from './streamora-data';

interface PlayerScreenProps {
  item: ContentItem;
  onBack: () => void;
}

export function PlayerScreen({ item, onBack }: PlayerScreenProps) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(item.progress ? item.progress / 100 * 5400 : 840);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [locked, setLocked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const totalDuration = 5400; // 90 min in seconds
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (showControls && !locked) {
      const t = setTimeout(() => setShowControls(false), 3500);
      return () => clearTimeout(t);
    }
  }, [showControls, locked]);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => setProgress(p => Math.min(p + 1, totalDuration)), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const pct = progress / totalDuration;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#000',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => !locked && setShowControls(v => !v)}
    >
      {/* Video backdrop */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={item.backdrop}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      </div>

      {/* Cinematic gradient overlay during playing */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)`,
        pointerEvents: 'none',
      }} />

      {/* Lock overlay */}
      {locked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={e => e.stopPropagation()}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLocked(false)}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Lock size={22} color="#fff" />
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {showControls && !locked && (
          <motion.div
            key="controls"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 20,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top bar */}
            <div
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
                padding: '44px 16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} style={iconBtnStyle}>
                <ArrowLeft size={19} color="#fff" />
              </motion.button>
              <div style={{ flex: 1, textAlign: 'center', padding: '0 12px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }} className="truncate">
                  {item.title}
                </p>
                {item.type === 'series' && (
                  <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>S1 · E3 — Lost Signal</p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.button whileTap={{ scale: 0.9 }} style={iconBtnStyle}>
                  <Cast size={17} color="#fff" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowSettings(v => !v)} style={iconBtnStyle}>
                  <Settings size={17} color="#fff" />
                </motion.button>
              </div>
            </div>

            {/* Center controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px' }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setProgress(p => Math.max(0, p - 10))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
              >
                <SkipBack size={26} color="#fff" />
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>10s</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setPlaying(v => !v)}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {playing
                  ? <Pause size={26} color="#fff" fill="white" />
                  : <Play size={26} color="#fff" fill="white" style={{ marginLeft: '3px' }} />
                }
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setProgress(p => Math.min(totalDuration, p + 10))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
              >
                <SkipForward size={26} color="#fff" />
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>10s</span>
              </motion.button>
            </div>

            {/* Bottom controls */}
            <div
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                padding: '24px 16px 40px',
              }}
            >
              {/* Progress bar */}
              <div style={{ marginBottom: '12px' }}>
                <div
                  style={{
                    position: 'relative',
                    height: '4px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    setProgress(Math.round(ratio * totalDuration));
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${pct * 100}%`,
                      background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                      borderRadius: '2px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        right: '-6px',
                        top: '-4px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#fff',
                        boxShadow: '0 0 8px rgba(59,130,246,0.8)',
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{fmt(progress)}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{fmt(totalDuration)}</span>
                </div>
              </div>

              {/* Bottom icon row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMuted(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {muted ? <VolumeX size={20} color="rgba(255,255,255,0.7)" /> : <Volume2 size={20} color="rgba(255,255,255,0.9)" />}
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Subtitles size={20} color="rgba(255,255,255,0.7)" />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Gauge size={20} color="rgba(255,255,255,0.7)" />
                  </motion.button>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLocked(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Lock size={20} color="rgba(255,255,255,0.7)" />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <PictureInPicture2 size={20} color="rgba(255,255,255,0.7)" />
                  </motion.button>
                  {item.type === 'series' && (
                    <motion.button whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <List size={20} color="rgba(255,255,255,0.7)" />
                    </motion.button>
                  )}
                  <motion.button whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Maximize2 size={20} color="rgba(255,255,255,0.7)" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '220px',
              background: 'rgba(9,11,16,0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 50,
              padding: '60px 0 20px',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 20px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>Quality</span>
              <button onClick={() => setShowSettings(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '13px' }}>Close</button>
            </div>
            {[['Auto', '(Recommended)'], ['4K Ultra HD', '2160p'], ['Full HD', '1080p'], ['HD', '720p'], ['SD', '480p']].map(([q, sub]) => (
              <div key={q} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#fff', fontWeight: q === 'Auto' ? 600 : 400 }}>{q}</span>
                  <span style={{ fontSize: '11px', color: '#6B7280', marginLeft: '6px' }}>{sub}</span>
                </div>
                {q === 'Auto' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />}
              </div>
            ))}
            <div style={{ padding: '20px 16px 0' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff', display: 'block', marginBottom: '12px' }}>Speed</span>
              {['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'].map(s => (
                <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                  <span style={{ fontSize: '13px', color: s === '1x' ? '#3B82F6' : '#fff', fontWeight: s === '1x' ? 600 : 400 }}>{s}</span>
                  {s === '1x' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const iconBtnStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};
