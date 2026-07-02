import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, Play, Download, Plus, Share2, Star,
  Globe, Clock, Calendar, ChevronRight, Check,
} from 'lucide-react';
import { TRENDING, type ContentItem } from './streamora-data';

interface MovieDetailScreenProps {
  item: ContentItem;
  onBack: () => void;
  onPlay: (item: ContentItem) => void;
}

const TABS = ['Overview', 'Episodes', 'Cast', 'More'];

export function MovieDetailScreen({ item, onBack, onPlay }: MovieDetailScreenProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [inList, setInList] = useState(false);
  const [downloading, setDownloading] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#090B10',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        zIndex: 20,
      }}
    >
      {/* Hero backdrop */}
      <div style={{ position: 'relative', height: '360px', flexShrink: 0 }}>
        <img
          src={item.backdrop}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(9,11,16,0.2) 0%, rgba(9,11,16,0.5) 60%, #090B10 100%)' }} />

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '52px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={18} color="#fff" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Share2 size={16} color="#fff" />
          </motion.button>
        </div>

        {/* Play button center */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onPlay(item)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'rgba(59,130,246,0.9)',
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(59,130,246,0.5)',
          }}
        >
          <Play size={22} fill="white" strokeWidth={0} style={{ marginLeft: '2px' }} />
        </motion.button>

        {/* Type badge */}
        {item.isNew && (
          <div
            style={{
              position: 'absolute',
              top: '52px',
              right: '60px',
              background: '#3B82F6',
              borderRadius: '8px',
              padding: '3px 8px',
              fontSize: '10px',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            NEW
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px', marginTop: '-10px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
          {item.genres.map(g => (
            <span
              key={g}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#60A5FA',
                background: 'rgba(59,130,246,0.15)',
                borderRadius: '6px',
                padding: '3px 8px',
              }}
            >
              {g}
            </span>
          ))}
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.4px',
            lineHeight: '1.2',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '10px',
          }}
        >
          {item.title}
        </h1>

        {/* Metadata row */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
          <MetaChip icon={Star} value={`${item.rating} IMDb`} color="#FBBF24" />
          <MetaChip icon={Calendar} value={String(item.year)} color="#A1A1AA" />
          <MetaChip icon={Clock} value={item.duration} color="#A1A1AA" />
          <MetaChip icon={Globe} value={item.language} color="#A1A1AA" />
          {item.type === 'series' && (
            <MetaChip icon={Globe} value={`${item.seasons}S · ${item.episodes}ep`} color="#A1A1AA" />
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onPlay(item)}
            style={{
              flex: 1,
              height: '50px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              border: 'none',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 6px 24px rgba(59,130,246,0.4)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <Play size={16} fill="white" strokeWidth={0} />
            {item.progress ? `Resume (${item.progress}%)` : 'Watch Now'}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setInList(v => !v)}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: inList ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)',
              border: inList ? '1.5px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {inList ? <Check size={18} color="#60A5FA" /> : <Plus size={18} color="#A1A1AA" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setDownloading(v => !v)}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: downloading ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
              border: downloading ? '1.5px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Download size={18} color={downloading ? '#10B981' : '#A1A1AA'} />
          </motion.button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px' }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1,
                height: '40px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === i ? '2px solid #3B82F6' : '2px solid transparent',
                color: activeTab === i ? '#3B82F6' : '#6B7280',
                fontSize: '13px',
                fontWeight: activeTab === i ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 0 && <OverviewTab item={item} />}
        {activeTab === 1 && <EpisodesTab item={item} onPlay={onPlay} />}
        {activeTab === 2 && <CastTab item={item} />}
        {activeTab === 3 && <MoreTab item={item} />}
      </div>
    </motion.div>
  );
}

function MetaChip({ icon: Icon, value, color }: { icon: typeof Star; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <Icon size={13} color={color} />
      <span style={{ fontSize: '12px', color: color, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function OverviewTab({ item }: { item: ContentItem }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p style={{ fontSize: '14px', color: '#9CA3AF', lineHeight: '1.7', marginBottom: '6px', display: expanded ? 'block' : '-webkit-box', WebkitLineClamp: expanded ? undefined : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {item.description}
      </p>
      <button
        onClick={() => setExpanded(v => !v)}
        style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: '13px', fontWeight: 500, cursor: 'pointer', padding: 0, marginBottom: '24px' }}
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>

      {/* Trailer button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '14px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.07)',
          marginBottom: '24px',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #EF4444, #DC2626)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Play size={18} fill="white" strokeWidth={0} style={{ marginLeft: '2px' }} />
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Official Trailer</p>
          <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>2m 34s · HD</p>
        </div>
        <ChevronRight size={18} color="#6B7280" style={{ marginLeft: 'auto' }} />
      </div>

      {/* Recommendations */}
      <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff', display: 'block', marginBottom: '14px' }}>More Like This</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
        {TRENDING.slice(0, 6).map(x => (
          <div key={x.id} style={{ borderRadius: '12px', overflow: 'hidden', background: '#111827' }}>
            <img src={x.poster} alt={x.title} style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EpisodesTab({ item, onPlay }: { item: ContentItem; onPlay: (item: ContentItem) => void }) {
  if (item.type !== 'series') return (
    <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280', fontSize: '14px' }}>
      This is a film. No episodes available.
    </div>
  );

  const episodes = Array.from({ length: 6 }, (_, i) => ({
    ep: i + 1,
    title: `Episode ${i + 1}: ${['The Beginning', 'Descent', 'Lost Signal', 'Mirror Image', 'Dark Territory', 'The Truth'][i]}`,
    duration: `${42 + i * 3}m`,
    watched: i < 3,
  }));

  return (
    <div>
      {/* Season selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {Array.from({ length: item.seasons ?? 1 }, (_, i) => (
          <button
            key={i}
            style={{
              padding: '7px 16px',
              borderRadius: '10px',
              background: i === 0 ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
              border: i === 0 ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.08)',
              color: i === 0 ? '#60A5FA' : '#6B7280',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Season {i + 1}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {episodes.map(ep => (
          <motion.div
            key={ep.ep}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPlay(item)}
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              padding: '12px',
              background: ep.watched ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              opacity: ep.watched ? 0.6 : 1,
            }}
          >
            <div
              style={{
                width: '72px',
                height: '48px',
                borderRadius: '10px',
                background: '#1F2937',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img src={item.backdrop} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
              <Play size={16} fill="white" strokeWidth={0} style={{ position: 'absolute' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '2px' }}>S1 · E{ep.ep}</p>
              <p style={{ fontSize: '13px', fontWeight: 500, color: ep.watched ? '#6B7280' : '#fff', lineHeight: '1.3' }} className="truncate">{ep.title}</p>
              <p style={{ fontSize: '11px', color: '#4B5563', marginTop: '2px' }}>{ep.duration}</p>
            </div>
            {ep.watched && (
              <div style={{ flexShrink: 0 }}>
                <Check size={16} color="#3B82F6" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CastTab({ item }: { item: ContentItem }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {item.cast.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <img
              src={c.photo}
              alt={c.name}
              style={{ width: '52px', height: '52px', borderRadius: '16px', objectFit: 'cover', background: '#111827', flexShrink: 0 }}
            />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{c.name}</p>
              <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{c.role}</p>
            </div>
            <ChevronRight size={16} color="#4B5563" style={{ marginLeft: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MoreTab({ item }: { item: ContentItem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '24px' }}>
      {[
        ['Director', 'A. Karev'],
        ['Writer', 'M. Cross, T. Blake'],
        ['Language', item.language],
        ['Country', 'United States'],
        ['Released', String(item.year)],
        ['Studio', 'Apex Pictures'],
        ['Rating', 'TV-MA'],
      ].map(([label, val]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '14px', color: '#6B7280' }}>{label}</span>
          <span style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 500 }}>{val}</span>
        </div>
      ))}
    </div>
  );
}
