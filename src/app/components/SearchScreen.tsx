import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Mic, X, TrendingUp } from 'lucide-react';
import { ALL_CONTENT, GENRES, SEARCH_SUGGESTIONS, type ContentItem } from './streamora-data';

interface SearchScreenProps {
  onSelect: (item: ContentItem) => void;
}

export function SearchScreen({ onSelect }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const results = query.length > 1
    ? ALL_CONTENT.filter(x => x.title.toLowerCase().includes(query.toLowerCase()) || x.genres.some(g => g.toLowerCase().includes(query.toLowerCase())))
    : [];

  const suggestions = query.length === 1
    ? SEARCH_SUGGESTIONS.filter(s => s.toLowerCase().startsWith(query.toLowerCase()))
    : [];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#090B10',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        paddingBottom: '100px',
      }}
    >
      {/* Header */}
      <div style={{ padding: '52px 20px 0' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
          Search
        </h1>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          >
            <Search size={18} color={focused ? '#3B82F6' : '#6B7280'} />
          </div>
          <input
            type="text"
            placeholder="Movies, shows, genres..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: '100%',
              height: '50px',
              background: 'rgba(255,255,255,0.06)',
              border: focused ? '1.5px solid rgba(59,130,246,0.6)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              color: '#fff',
              fontSize: '15px',
              padding: '0 46px 0 46px',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              boxSizing: 'border-box',
              transition: 'border 0.2s',
            }}
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={13} color="#9CA3AF" />
            </button>
          ) : (
            <button
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(59,130,246,0.15)', border: 'none', borderRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Mic size={15} color="#60A5FA" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 ? (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '0 20px' }}>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '14px' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for <span style={{ color: '#fff' }}>"{query}"</span>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {results.map((item, i) => (
                <SearchResultCard key={item.id} item={item} onSelect={onSelect} index={i} />
              ))}
            </div>
          </motion.div>
        ) : suggestions.length > 0 ? (
          <motion.div key="suggestions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '0 20px' }}>
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                style={{
                  width: '100%',
                  padding: '13px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  color: '#E5E7EB',
                  fontSize: '15px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Search size={16} color="#6B7280" />
                {s}
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div key="discover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Trending searches */}
            <div style={{ padding: '0 20px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <TrendingUp size={15} color="#3B82F6" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Trending Searches</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SEARCH_SUGGESTIONS.map(s => (
                  <motion.button
                    key={s}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuery(s)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '20px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#D1D5DB',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Browse Genres */}
            <div style={{ padding: '0 20px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', display: 'block', marginBottom: '14px' }}>
                Browse Genres
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {GENRES.map((g, i) => {
                  const colors = ['#EF4444', '#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EC4899', '#06B6D4', '#84CC16'];
                  const color = colors[i % colors.length];
                  return (
                    <motion.div
                      key={g}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setQuery(g)}
                      style={{
                        height: '48px',
                        borderRadius: '14px',
                        background: `${color}18`,
                        border: `1px solid ${color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 600, color: color }}>{g}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchResultCard({ item, onSelect, index }: { item: ContentItem; onSelect: (item: ContentItem) => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onSelect(item)}
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          height: '140px',
          borderRadius: '14px',
          overflow: 'hidden',
          position: 'relative',
          background: '#111827',
        }}
      >
        <img src={item.poster} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,11,16,0.85) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#fff', display: 'block' }} className="truncate">{item.title}</span>
          <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{item.genres[0]}</span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: '6px',
            padding: '2px 5px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <span style={{ fontSize: '9px', color: '#FBBF24' }}>★</span>
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#fff' }}>{item.rating}</span>
        </div>
      </div>
    </motion.div>
  );
}
