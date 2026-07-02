import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1628093218069-0d095423e463?w=600&q=80&auto=format&fit=crop',
    title: 'Cinematic Worlds\nAt Your Fingertips',
    subtitle: 'Discover thousands of films, series, and originals — curated for the discerning viewer.',
    accent: '#3B82F6',
  },
  {
    image: 'https://images.unsplash.com/photo-1482424917728-d82d29662023?w=600&q=80&auto=format&fit=crop',
    title: 'Stream Anywhere,\nAnytime',
    subtitle: 'Download and watch offline. Your library travels with you, no matter where you are.',
    accent: '#60A5FA',
  },
  {
    image: 'https://images.unsplash.com/photo-1667857431728-00884201d629?w=600&q=80&auto=format&fit=crop',
    title: 'Premium Quality,\nZero Compromise',
    subtitle: '4K HDR · Dolby Atmos · Multi-language subtitles. Experience cinema as it was meant to be.',
    accent: '#93C5FD',
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < SLIDES.length - 1) setCurrent(c => c + 1);
    else onComplete();
  };

  const slide = SLIDES[current];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', overflow: 'hidden' }}>
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img
            src={slide.image}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(9,11,16,0.3) 0%, rgba(9,11,16,0.6) 50%, rgba(9,11,16,0.98) 80%)',
        }}
      />

      {/* Skip */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          top: '52px',
          right: '20px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          color: '#A1A1AA',
          fontSize: '13px',
          fontWeight: 500,
          padding: '6px 14px',
          cursor: 'pointer',
        }}
      >
        Skip
      </button>

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 28px 56px',
        }}
      >
        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? '24px' : '6px',
                background: i === current ? slide.accent : 'rgba(255,255,255,0.25)',
              }}
              transition={{ duration: 0.3 }}
              style={{ height: '6px', borderRadius: '3px' }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#fff',
                lineHeight: '1.2',
                letterSpacing: '-0.5px',
                marginBottom: '14px',
                whiteSpace: 'pre-line',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {slide.title}
            </h1>
            <p
              style={{
                fontSize: '15px',
                color: '#A1A1AA',
                lineHeight: '1.6',
                marginBottom: '36px',
              }}
            >
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={next}
          style={{
            width: '100%',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 8px 32px rgba(59,130,246,0.4)',
          }}
        >
          {current < SLIDES.length - 1 ? 'Continue' : 'Get Started'}
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
