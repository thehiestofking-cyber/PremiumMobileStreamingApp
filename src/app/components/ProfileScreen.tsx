import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, Crown, Globe, Subtitles, Mic2, Palette, CreditCard,
  HelpCircle, Flag, Star, LogOut, Bell, Shield, Download, Heart,
  BookOpen, Moon, ChevronDown,
} from 'lucide-react';

interface ProfileScreenProps {
  onLogout: () => void;
}

type SubPage = null | 'language' | 'subtitles' | 'audio' | 'theme' | 'subscription';

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [subPage, setSubPage] = useState<SubPage>(null);

  if (subPage === 'subscription') return <SubscriptionPage onBack={() => setSubPage(null)} />;
  if (subPage === 'theme') return <ThemePage onBack={() => setSubPage(null)} />;
  if (subPage === 'language') return <LanguagePage onBack={() => setSubPage(null)} />;

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
      <div
        style={{
          padding: '52px 20px 24px',
          background: 'linear-gradient(to bottom, rgba(59,130,246,0.08) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          {/* Avatar */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '22px',
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(59,130,246,0.4)',
              }}
            >
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#fff' }}>A</span>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                width: '22px',
                height: '22px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                border: '2px solid #090B10',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Crown size={11} color="#fff" />
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.2px', fontFamily: 'Inter, sans-serif' }}>
              Alex Rivera
            </h1>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>alex@example.com</p>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '6px',
                background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.2))',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '8px',
                padding: '3px 8px',
              }}
            >
              <Crown size={10} color="#F59E0B" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#F59E0B' }}>PREMIUM</span>
            </span>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '18px',
            border: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Watchlist', value: '24' },
            { label: 'Downloads', value: '8' },
            { label: 'Reviews', value: '31' },
          ].map(({ label, value }, i) => (
            <div
              key={label}
              style={{
                flex: 1,
                padding: '14px 8px',
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{value}</p>
              <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings sections */}
      <div style={{ padding: '20px' }}>
        <Section title="Account">
          <SettingRow icon={Bell} label="Notifications" value="On" onPress={() => {}} />
          <SettingRow icon={Shield} label="Privacy & Security" onPress={() => {}} />
          <SettingRow icon={Download} label="Download Quality" value="HD" onPress={() => {}} />
        </Section>

        <Section title="Preferences">
          <SettingRow icon={Globe} label="Language" value="English" onPress={() => setSubPage('language')} />
          <SettingRow icon={BookOpen} label="Subtitles" value="Auto" onPress={() => setSubPage('subtitles')} />
          <SettingRow icon={Mic2} label="Audio Track" value="Default" onPress={() => setSubPage('audio')} />
          <SettingRow icon={Moon} label="Theme" value="Dark" onPress={() => setSubPage('theme')} />
        </Section>

        <Section title="Subscription">
          <div
            onClick={() => setSubPage('subscription')}
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(29,78,216,0.12))',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '16px',
              padding: '16px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Crown size={14} color="#F59E0B" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Premium Plan</span>
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>$12.99/month · Renews Jul 15</p>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#3B82F6',
                  background: 'rgba(59,130,246,0.15)',
                  borderRadius: '8px',
                  padding: '4px 10px',
                }}
              >
                Manage
              </span>
            </div>
          </div>
          <SettingRow icon={CreditCard} label="Payment Method" value="•••• 4242" onPress={() => {}} />
        </Section>

        <Section title="Support">
          <SettingRow icon={HelpCircle} label="Help Center" onPress={() => {}} />
          <SettingRow icon={Flag} label="Report a Problem" onPress={() => {}} />
          <SettingRow icon={Star} label="Rate Streamora" onPress={() => {}} />
        </Section>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          style={{
            width: '100%',
            height: '50px',
            borderRadius: '16px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#EF4444',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '8px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <LogOut size={17} />
          Sign Out
        </motion.button>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#374151', marginTop: '20px' }}>
          Streamora v2.1.4 · © 2026 Streamora Inc.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>
        {title}
      </p>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function SettingRow({ icon: Icon, label, value, onPress }: { icon: typeof Bell; label: string; value?: string; onPress: () => void }) {
  return (
    <div
      onClick={onPress}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        cursor: 'pointer',
      }}
    >
      <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={16} color="#9CA3AF" />
      </div>
      <span style={{ flex: 1, fontSize: '14px', color: '#E5E7EB', fontWeight: 400 }}>{label}</span>
      {value && <span style={{ fontSize: '13px', color: '#6B7280' }}>{value}</span>}
      <ChevronRight size={16} color="#4B5563" />
    </div>
  );
}

function SubscriptionPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState(1);
  const plans = [
    { name: 'Basic', price: '$6.99', period: 'month', features: ['HD streaming', '1 device', '10 downloads', 'Ads supported'], color: '#6B7280' },
    { name: 'Premium', price: '$12.99', period: 'month', features: ['4K Ultra HD', '4 devices', 'Unlimited downloads', 'No ads', 'Early access', 'Dolby Atmos'], color: '#3B82F6', popular: true },
    { name: 'Family', price: '$18.99', period: 'month', features: ['4K Ultra HD', '6 devices', 'Unlimited downloads', 'No ads', '6 profiles', 'Parental controls'], color: '#8B5CF6' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: '40px' }}>
      <div style={{ padding: '52px 20px 0', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
        <button onClick={onBack} style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronRight size={16} color="#fff" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif' }}>Choose Plan</h1>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(i)}
            style={{
              borderRadius: '20px',
              border: selected === i ? `2px solid ${plan.color}` : '2px solid rgba(255,255,255,0.08)',
              background: selected === i ? `${plan.color}12` : 'rgba(255,255,255,0.03)',
              padding: '18px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {plan.popular && (
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', borderRadius: '10px', padding: '3px 12px', fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                MOST POPULAR
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{plan.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginTop: '4px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: plan.color }}>{plan.price}</span>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>/{plan.period}</span>
                </div>
              </div>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${selected === i ? plan.color : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: selected === i ? plan.color : 'transparent' }}>
                {selected === i && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: `${plan.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '10px', color: plan.color }}>✓</span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
        <motion.button
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(59,130,246,0.4)',
            fontFamily: 'Inter, sans-serif',
            marginTop: '8px',
          }}
        >
          Start {plans[selected].name} Plan
        </motion.button>
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#4B5563' }}>
          Cancel anytime. Billed monthly. Taxes may apply.
        </p>
      </div>
    </div>
  );
}

function ThemePage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState('Dark');
  const themes = [
    { name: 'Dark', bg: '#090B10', accent: '#3B82F6' },
    { name: 'Midnight', bg: '#0D0D1A', accent: '#8B5CF6' },
    { name: 'Amoled', bg: '#000000', accent: '#22D3EE' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', overflowY: 'auto', scrollbarWidth: 'none', padding: '52px 20px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
        <button onClick={onBack} style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronRight size={16} color="#fff" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif' }}>Theme</h1>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        {themes.map(t => (
          <motion.div key={t.name} whileTap={{ scale: 0.96 }} onClick={() => setSelected(t.name)} style={{ flex: 1, cursor: 'pointer' }}>
            <div style={{ height: '80px', borderRadius: '14px', background: t.bg, border: selected === t.name ? `2px solid ${t.accent}` : '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <div style={{ width: '20px', height: '4px', borderRadius: '2px', background: t.accent }} />
              <div style={{ width: '30px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.1)' }} />
            </div>
            <p style={{ textAlign: 'center', fontSize: '12px', color: selected === t.name ? '#fff' : '#6B7280', marginTop: '8px', fontWeight: selected === t.name ? 600 : 400 }}>{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LanguagePage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState('English');
  const langs = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Chinese', 'Portuguese', 'Arabic', 'Hindi'];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', overflowY: 'auto', scrollbarWidth: 'none', padding: '52px 20px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
        <button onClick={onBack} style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronRight size={16} color="#fff" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif' }}>Language</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', background: 'rgba(255,255,255,0.03)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {langs.map(l => (
          <div key={l} onClick={() => setSelected(l)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: selected === l ? 'rgba(59,130,246,0.08)' : 'transparent' }}>
            <span style={{ fontSize: '14px', color: selected === l ? '#fff' : '#9CA3AF', fontWeight: selected === l ? 600 : 400 }}>{l}</span>
            {selected === l && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
