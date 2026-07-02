import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Trash2, Play, CheckCircle, HardDrive, Wifi, ChevronRight, Plus } from 'lucide-react';
import { DOWNLOADS, type ContentItem } from './streamora-data';

interface DownloadsScreenProps {
  onSelect: (item: ContentItem) => void;
  onPlay: (item: ContentItem) => void;
}

export function DownloadsScreen({ onSelect, onPlay }: DownloadsScreenProps) {
  const [items, setItems] = useState(DOWNLOADS);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const totalSize = '7.3 GB';
  const usedPercent = 58;

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setItems(prev => prev.filter(x => x.id !== id));
      setDeletingId(null);
    }, 400);
  };

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
      <div style={{ padding: '52px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', fontFamily: 'Inter, sans-serif' }}>
            Downloads
          </h1>
          <span
            style={{
              fontSize: '12px',
              color: '#3B82F6',
              background: 'rgba(59,130,246,0.12)',
              borderRadius: '8px',
              padding: '4px 10px',
              fontWeight: 500,
            }}
          >
            {items.length} items
          </span>
        </div>

        {/* Storage indicator */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '18px',
            padding: '16px',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HardDrive size={16} color="#3B82F6" />
              <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Storage Used</span>
            </div>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>{totalSize} / 12.6 GB</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usedPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                borderRadius: '3px',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: '#6B7280' }}>Downloads: {totalSize}</span>
            <span style={{ fontSize: '11px', color: '#6B7280' }}>{100 - usedPercent}% free</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All Downloads', 'Movies', 'Series'].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '7px 14px',
                borderRadius: '10px',
                background: activeTab === i ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                border: activeTab === i ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: activeTab === i ? '#60A5FA' : '#6B7280',
                fontSize: '13px',
                fontWeight: activeTab === i ? 600 : 400,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Download list */}
      <div style={{ padding: '0 20px' }}>
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: deletingId === item.id ? 0 : 1, x: deletingId === item.id ? -60 : 0, height: deletingId === item.id ? 0 : 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'center',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '18px',
                      padding: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '80px',
                        height: '56px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        position: 'relative',
                        background: '#111827',
                      }}
                    >
                      <img src={item.backdrop} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onPlay(item)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Play size={11} fill="white" strokeWidth={0} style={{ marginLeft: '1px' }} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: '1.3' }} className="truncate">
                        {item.title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#6B7280' }}>{item.type === 'series' ? `${item.seasons}S · ${item.episodes}ep` : item.duration}</span>
                        <span style={{ fontSize: '10px', color: '#374151' }}>·</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <CheckCircle size={11} color="#10B981" />
                          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 500 }}>Offline ready</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                        <HardDrive size={11} color="#4B5563" />
                        <span style={{ fontSize: '11px', color: '#4B5563' }}>{item.downloadSize}</span>
                        <span style={{ fontSize: '11px', color: '#374151' }}>· HD</span>
                      </div>
                    </div>

                    {/* Delete */}
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={() => handleDelete(item.id)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '12px',
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <Trash2 size={15} color="#EF4444" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Download settings */}
        <div
          style={{
            marginTop: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '18px',
            overflow: 'hidden',
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', letterSpacing: '0.8px', textTransform: 'uppercase', padding: '14px 16px 10px' }}>
            Settings
          </p>
          {[
            { icon: Wifi, label: 'Download over Wi-Fi only', value: 'On' },
            { icon: Download, label: 'Download quality', value: 'HD (1080p)' },
            { icon: HardDrive, label: 'Auto-delete watched', value: 'Off' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={15} color="#9CA3AF" />
              </div>
              <span style={{ flex: 1, fontSize: '13px', color: '#D1D5DB' }}>{label}</span>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>{value}</span>
              <ChevronRight size={15} color="#4B5563" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center', padding: '60px 20px' }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '24px',
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
        }}
      >
        <Download size={32} color="#3B82F6" />
      </div>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
        No downloads yet
      </h2>
      <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>
        Download movies and shows to watch offline anytime, anywhere.
      </p>
      <motion.button
        whileTap={{ scale: 0.96 }}
        style={{
          marginTop: '24px',
          padding: '12px 24px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
          border: 'none',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Plus size={16} />
        Browse to Download
      </motion.button>
    </motion.div>
  );
}
