import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, Play, Plus, Info, ChevronRight } from 'lucide-react';
import { ContentRail } from './ContentRail';
import {
  HERO_ITEMS, TRENDING, CONTINUE_WATCHING, NEW_RELEASES, TOP_RATED,
  type ContentItem,
} from './streamora-data';

const CATEGORIES = ['For You', 'Movies', 'Series', 'Anime', 'Live'];

interface HomeScreenProps {
  onSelect: (item: ContentItem) => void;
  onSearch: () => void;
}

export function HomeScreen({ onSelect, onSearch }: HomeScreenProps) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeCat, setActiveCat] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setHeroIdx(i => (i + 1) % HERO_ITEMS.length);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const hero = HERO_ITEMS[heroIdx];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#090B10',
        overflowY: 'auto',
        paddingBottom: '100px',
        scrollbarWidth: 'none',
      }}
    >
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '480px', flexShrink: 0 }}>
        {/* Hero Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={hero.backdrop}
              alt={hero.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(9,11,16,0.3) 0%, rgba(9,11,16,0.1) 40%, rgba(9,11,16,0.95) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,11,16,0.5) 0%, transparent 100%)' }} />

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '52px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                <path d="M2 1.5L12 7L2 12.5V1.5Z" />
              </svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>
              STREAM<span style={{ color: '#3B82F6' }}>ORA</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={onSearch}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Search size={17} color="#fff" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <Bell size={17} color="#fff" />
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '9px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#EF4444',
                  border: '1.5px solid #090B10',
                }}
              />
            </motion.button>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #3B82F6',
                background: '#1D4ED8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>A</span>
            </div>
          </div>
        </div>

        {/* Hero metadata */}
        <div style={{ position: 'absolute', bottom: '24px', left: '20px', right: '20px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                {hero.genres.map(g => (
                  <span
                    key={g}
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#93C5FD',
                      background: 'rgba(59,130,246,0.2)',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {g}
                  </span>
                ))}
                <span style={{ fontSize: '10px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#FBBF24' }}>★</span> {hero.rating} · {hero.duration} · {hero.year}
                </span>
              </div>

              <h1
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: '1.15',
                  letterSpacing: '-0.5px',
                  marginBottom: '10px',
                  fontFamily: 'Inter, sans-serif',
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}
              >
                {hero.title}
              </h1>

              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: '1.5', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {hero.description}
              </p>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelect(hero)}
                  style={{
                    flex: 1,
                    height: '44px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                  }}
                >
                  <Play size={16} fill="white" strokeWidth={0} />
                  Play Now
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => onSelect(hero)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Plus size={18} color="#fff" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => onSelect(hero)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Info size={18} color="#fff" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Hero Dots */}
          <div style={{ display: 'flex', gap: '5px', marginTop: '14px', justifyContent: 'center' }}>
            {HERO_ITEMS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setHeroIdx(i)}
                animate={{ width: i === heroIdx ? '20px' : '5px', background: i === heroIdx ? '#3B82F6' : 'rgba(255,255,255,0.3)' }}
                style={{ height: '5px', borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          padding: '16px 16px 4px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCat(i)}
            whileTap={{ scale: 0.95 }}
            style={{
              flexShrink: 0,
              height: '34px',
              padding: '0 16px',
              borderRadius: '10px',
              background: activeCat === i ? 'rgba(59,130,246,0.2)' : 'transparent',
              border: activeCat === i ? '1px solid rgba(59,130,246,0.4)' : '1px solid transparent',
              color: activeCat === i ? '#60A5FA' : '#6B7280',
              fontSize: '13px',
              fontWeight: activeCat === i ? 600 : 400,
              cursor: 'pointer',
              marginRight: '6px',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Content Rails */}
      <div style={{ marginTop: '8px' }}>
        <ContentRail
          title="Continue Watching"
          items={CONTINUE_WATCHING}
          onSelect={onSelect}
          variant="continue"
        />

        <ContentRail
          title="Trending Now"
          items={TRENDING}
          onSelect={onSelect}
          variant="poster"
          badge="HOT"
        />

        {/* Featured wide banner */}
        <FeaturedBanner onSelect={() => onSelect(TRENDING[1])} />

        <ContentRail
          title="New Releases"
          items={NEW_RELEASES.slice(0, 6)}
          onSelect={onSelect}
          variant="poster"
          badge="NEW"
        />

        <ContentRail
          title="Top Rated"
          items={TOP_RATED}
          onSelect={onSelect}
          variant="wide"
        />

        <GenreGrid onSelect={onSelect} />
      </div>
    </div>
  );
}

function FeaturedBanner({ onSelect }: { onSelect: () => void }) {
  return (
    <div style={{ padding: '0 16px', marginBottom: '24px' }}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onSelect}
        style={{
          position: 'relative',
          height: '140px',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1634361522365-72d91d5dec85?w=800&q=80&auto=format&fit=crop"
          alt="Lunar Descent"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,11,16,0.9) 0%, rgba(9,11,16,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '6px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#FFF', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', borderRadius: '5px', padding: '2px 6px', letterSpacing: '0.5px' }}>
              STREAMORA ORIGINAL
            </span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', fontFamily: 'Inter, sans-serif' }}>
            Lunar Descent
          </h3>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
            Sci-Fi · 2h 32m · ★ 8.6
          </p>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(59,130,246,0.85)',
                borderRadius: '8px',
                padding: '5px 10px',
              }}
            >
              <Play size={11} fill="white" strokeWidth={0} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>Watch now</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const GENRE_DATA = [
  { name: 'Action', color: '#EF4444', img: 'https://images.unsplash.com/photo-1767823608836-980209ad69ab?w=300&q=80&auto=format&fit=crop' },
  { name: 'Sci-Fi', color: '#3B82F6', img: 'https://images.unsplash.com/photo-1692871480784-4fd78f25459f?w=300&q=80&auto=format&fit=crop' },
  { name: 'Horror', color: '#8B5CF6', img: 'https://images.unsplash.com/photo-1511812201571-630da3a98887?w=300&q=80&auto=format&fit=crop' },
  { name: 'Thriller', color: '#F59E0B', img: 'https://images.unsplash.com/photo-1482424917728-d82d29662023?w=300&q=80&auto=format&fit=crop' },
  { name: 'Drama', color: '#10B981', img: 'https://images.unsplash.com/photo-1505274664176-44ccaa7969a8?w=300&q=80&auto=format&fit=crop' },
  { name: 'Mystery', color: '#EC4899', img: 'https://images.unsplash.com/photo-1495581600346-93f223866d0a?w=300&q=80&auto=format&fit=crop' },
];

function GenreGrid({ onSelect }: { onSelect: (item: ContentItem) => void }) {
  return (
    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Browse by Genre</span>
        <span style={{ fontSize: '12px', color: '#3B82F6', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '2px' }}>
          See all <ChevronRight size={14} color="#3B82F6" />
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {GENRE_DATA.map(g => (
          <motion.div
            key={g.name}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(TRENDING[0])}
            style={{
              position: 'relative',
              height: '64px',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <img src={g.img} alt={g.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${g.color}40, ${g.color}20)` }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{g.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
