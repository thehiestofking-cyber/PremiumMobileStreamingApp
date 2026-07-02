import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { ContentItem } from './streamora-data';

interface ContentRailProps {
  title: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  variant?: 'poster' | 'wide' | 'continue';
  badge?: string;
}

export function ContentRail({ title, items, onSelect, variant = 'poster', badge }: ContentRailProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#fff', letterSpacing: '-0.2px' }}>
            {title}
          </span>
          {badge && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#3B82F6',
                background: 'rgba(59,130,246,0.15)',
                borderRadius: '6px',
                padding: '2px 6px',
                letterSpacing: '0.5px',
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
        >
          <span style={{ fontSize: '12px', color: '#3B82F6', fontWeight: 500 }}>See all</span>
          <ChevronRight size={14} color="#3B82F6" />
        </button>
      </div>

      <div
        className="flex gap-3 overflow-x-auto px-4"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(item)}
            style={{ flexShrink: 0, cursor: 'pointer' }}
          >
            {variant === 'continue' ? (
              <ContinueCard item={item} />
            ) : variant === 'wide' ? (
              <WideCard item={item} />
            ) : (
              <PosterCard item={item} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PosterCard({ item }: { item: ContentItem }) {
  return (
    <div style={{ width: '110px' }}>
      <div
        style={{
          width: '110px',
          height: '160px',
          borderRadius: '14px',
          overflow: 'hidden',
          position: 'relative',
          background: '#111827',
        }}
      >
        <img
          src={item.poster}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {item.isNew && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: '#3B82F6',
              borderRadius: '6px',
              padding: '2px 6px',
              fontSize: '9px',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.5px',
            }}
          >
            NEW
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(9,11,16,0.6) 0%, transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: '6px',
            padding: '2px 5px',
          }}
        >
          <span style={{ fontSize: '9px', color: '#FBBF24' }}>★</span>
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#fff' }}>{item.rating}</span>
        </div>
      </div>
      <p style={{ fontSize: '11px', fontWeight: 500, color: '#E5E7EB', marginTop: '6px', lineHeight: '1.3' }} className="truncate">
        {item.title}
      </p>
      <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>
        {item.genres[0]}
      </p>
    </div>
  );
}

function WideCard({ item }: { item: ContentItem }) {
  return (
    <div
      style={{
        width: '200px',
        height: '115px',
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        background: '#111827',
        flexShrink: 0,
      }}
    >
      <img
        src={item.backdrop}
        alt={item.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(9,11,16,0.85) 0%, transparent 55%)',
        }}
      />
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', lineHeight: '1.3' }} className="truncate">
          {item.title}
        </p>
        <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>
          {item.genres.slice(0, 2).join(' · ')}
        </p>
      </div>
      {item.isTrending && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: 'rgba(239,68,68,0.85)',
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '9px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.5px',
          }}
        >
          🔥 HOT
        </div>
      )}
    </div>
  );
}

function ContinueCard({ item }: { item: ContentItem }) {
  const progress = item.progress ?? 0;
  return (
    <div style={{ width: '200px' }}>
      <div
        style={{
          width: '200px',
          height: '115px',
          borderRadius: '14px',
          overflow: 'hidden',
          position: 'relative',
          background: '#111827',
        }}
      >
        <img
          src={item.backdrop}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(9,11,16,0.9) 0%, transparent 60%)',
          }}
        />
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '8px 10px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#fff' }} className="truncate">
            {item.title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '5px' }}>
            <div
              style={{
                flex: 1,
                height: '3px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: '#3B82F6',
                  borderRadius: '2px',
                }}
              />
            </div>
            <span style={{ fontSize: '9px', color: '#9CA3AF', flexShrink: 0 }}>
              {progress}%
            </span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-8px',
          }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
            <path d="M1 1.5L11 7L1 12.5V1.5Z" fill="white" />
          </svg>
        </div>
      </div>
      <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '5px' }}>
        {item.type === 'series' ? `S${item.seasons} · ${item.episodes} Episodes` : item.duration}
      </p>
    </div>
  );
}
