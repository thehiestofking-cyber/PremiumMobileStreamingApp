import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 50);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#090B10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
      >
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(59,130,246,0.4)',
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M8 6L30 19L8 32V6Z" fill="white" opacity="0.95" />
            <path d="M8 6L30 19L19 25.5V6H8Z" fill="white" />
            <circle cx="28" cy="12" r="5" fill="rgba(255,255,255,0.3)" />
          </svg>
        </motion.div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.5px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            STREAM<span style={{ color: '#3B82F6' }}>ORA</span>
          </div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 400,
              color: '#6B7280',
              letterSpacing: '3px',
              marginTop: '4px',
              textTransform: 'uppercase',
            }}
          >
            Premium Streaming
          </div>
        </motion.div>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '60px',
          right: '60px',
        }}
      >
        <div
          style={{
            height: '2px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
              borderRadius: '2px',
              width: `${progress}%`,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
