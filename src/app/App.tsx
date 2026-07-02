import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { MovieDetailScreen } from './components/MovieDetailScreen';
import { PlayerScreen } from './components/PlayerScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { DownloadsScreen } from './components/DownloadsScreen';
import { BottomNav } from './components/BottomNav';
import type { ContentItem } from './components/streamora-data';

type Screen = 'splash' | 'onboarding' | 'auth' | 'app';
type Tab = 'home' | 'search' | 'downloads' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [tab, setTab] = useState<Tab>('home');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [playerItem, setPlayerItem] = useState<ContentItem | null>(null);

  const handleSelect = useCallback((item: ContentItem) => {
    setSelectedItem(item);
    setPlayerItem(null);
  }, []);

  const handlePlay = useCallback((item: ContentItem) => {
    setPlayerItem(item);
  }, []);

  const handleSearch = useCallback(() => {
    setTab('search');
    setSelectedItem(null);
  }, []);

  const handleLogout = useCallback(() => {
    setScreen('auth');
    setSelectedItem(null);
    setPlayerItem(null);
    setTab('home');
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Phone frame on desktop */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '430px',
          height: '100%',
          maxHeight: '100vh',
          background: '#090B10',
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(0,0,0,0.8)',
        }}
      >
        <AnimatePresence mode="wait">
          {screen === 'splash' && (
            <motion.div key="splash" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
              <SplashScreen onComplete={() => setScreen('onboarding')} />
            </motion.div>
          )}

          {screen === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, zIndex: 10 }}
            >
              <OnboardingScreen onComplete={() => setScreen('auth')} />
            </motion.div>
          )}

          {screen === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: 0, zIndex: 10 }}
            >
              <AuthScreen onComplete={() => setScreen('app')} />
            </motion.div>
          )}

          {screen === 'app' && (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, zIndex: 5 }}
            >
              {/* Main tab screens */}
              <AnimatePresence mode="wait">
                {tab === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <HomeScreen onSelect={handleSelect} onSearch={handleSearch} />
                  </motion.div>
                )}
                {tab === 'search' && (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <SearchScreen onSelect={handleSelect} />
                  </motion.div>
                )}
                {tab === 'downloads' && (
                  <motion.div
                    key="downloads"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <DownloadsScreen onSelect={handleSelect} onPlay={handlePlay} />
                  </motion.div>
                )}
                {tab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <ProfileScreen onLogout={handleLogout} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom nav — always on top of tab screens */}
              <BottomNav
                active={tab}
                onChange={t => {
                  setTab(t);
                  setSelectedItem(null);
                  setPlayerItem(null);
                }}
              />

              {/* Movie detail — slides over content */}
              <AnimatePresence>
                {selectedItem && !playerItem && (
                  <MovieDetailScreen
                    key={selectedItem.id}
                    item={selectedItem}
                    onBack={() => setSelectedItem(null)}
                    onPlay={handlePlay}
                  />
                )}
              </AnimatePresence>

              {/* Player — full screen over everything */}
              <AnimatePresence>
                {playerItem && (
                  <PlayerScreen
                    key={playerItem.id + '-player'}
                    item={playerItem}
                    onBack={() => setPlayerItem(null)}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
