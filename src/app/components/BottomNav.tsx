import { Home, Search, Download, User } from 'lucide-react';
import { motion } from 'motion/react';

type Tab = 'home' | 'search' | 'downloads' | 'profile';

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'downloads', icon: Download, label: 'Downloads' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
    >
      <div
        className="mx-4 mb-4 flex items-center justify-around px-2 py-3"
        style={{
          background: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {TABS.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center gap-1 relative px-4 py-1"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0"
                  style={{
                    background: 'rgba(59,130,246,0.15)',
                    borderRadius: '14px',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  color={isActive ? '#3B82F6' : '#A1A1AA'}
                />
              </motion.div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#3B82F6' : '#A1A1AA',
                  letterSpacing: '0.3px',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
