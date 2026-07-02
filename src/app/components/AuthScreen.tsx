import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';

type AuthMode = 'login' | 'signup' | 'forgot' | 'otp';

interface AuthScreenProps {
  onComplete: () => void;
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtp = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '52px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    color: '#fff',
    fontSize: '15px',
    padding: '0 16px 0 46px',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  };

  const btnStyle: React.CSSProperties = {
    width: '100%',
    height: '54px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
    fontFamily: 'Inter, sans-serif',
  };

  const socialStyle: React.CSSProperties = {
    flex: 1,
    height: '48px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#090B10',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top bar */}
      <div style={{ padding: '52px 20px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        {mode !== 'login' && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMode(mode === 'signup' ? 'login' : mode === 'otp' ? 'forgot' : 'login')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={18} color="#fff" />
          </motion.button>
        )}
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M3 2.5L13 8L3 13.5V2.5Z" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>
            STREAM<span style={{ color: '#3B82F6' }}>ORA</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          style={{ flex: 1, padding: '36px 24px 24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
        >
          {mode === 'login' && (
            <LoginForm
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              showPass={showPass} setShowPass={setShowPass}
              inputStyle={inputStyle} btnStyle={btnStyle} socialStyle={socialStyle}
              onSignup={() => setMode('signup')}
              onForgot={() => setMode('forgot')}
              onComplete={onComplete}
            />
          )}
          {mode === 'signup' && (
            <SignupForm
              name={name} setName={setName}
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              showPass={showPass} setShowPass={setShowPass}
              inputStyle={inputStyle} btnStyle={btnStyle} socialStyle={socialStyle}
              onLogin={() => setMode('login')}
              onNext={() => setMode('otp')}
            />
          )}
          {mode === 'forgot' && (
            <ForgotForm
              email={email} setEmail={setEmail}
              inputStyle={inputStyle} btnStyle={btnStyle}
              onNext={() => setMode('otp')}
            />
          )}
          {mode === 'otp' && (
            <OtpForm
              otp={otp} onOtp={handleOtp} onKey={handleOtpKey}
              otpRefs={otpRefs} btnStyle={btnStyle}
              email={email}
              onComplete={onComplete}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function InputWrapper({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
        <Icon size={18} color="#6B7280" />
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
      <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 400 }}>or continue with</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
    </div>
  );
}

function LoginForm({ email, setEmail, password, setPassword, showPass, setShowPass, inputStyle, btnStyle, socialStyle, onSignup, onForgot, onComplete }: any) {
  return (
    <>
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '6px' }}>
          Sign in to continue watching
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
        <InputWrapper icon={Mail}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
        </InputWrapper>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
            <Lock size={18} color="#6B7280" />
          </div>
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: '46px' }}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {showPass ? <EyeOff size={18} color="#6B7280" /> : <Eye size={18} color="#6B7280" />}
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onForgot} style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>
            Forgot password?
          </button>
        </div>
      </div>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onComplete} style={{ ...btnStyle, marginTop: '24px' }}>
        Sign In
      </motion.button>
      <Divider />
      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={socialStyle}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google
        </button>
        <button style={socialStyle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Apple
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <span style={{ fontSize: '14px', color: '#6B7280' }}>Don't have an account? </span>
        <button onClick={onSignup} style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: '14px', cursor: 'pointer', fontWeight: 600 }}>
          Sign up
        </button>
      </div>
    </>
  );
}

function SignupForm({ name, setName, email, setEmail, password, setPassword, showPass, setShowPass, inputStyle, btnStyle, socialStyle, onLogin, onNext }: any) {
  return (
    <>
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif' }}>
          Create account
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '6px' }}>
          Join millions of premium viewers
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
        <InputWrapper icon={User}>
          <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
        </InputWrapper>
        <InputWrapper icon={Mail}>
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        </InputWrapper>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
            <Lock size={18} color="#6B7280" />
          </div>
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Create password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: '46px' }}
          />
          <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
            {showPass ? <EyeOff size={18} color="#6B7280" /> : <Eye size={18} color="#6B7280" />}
          </button>
        </div>
        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', padding: '10px 14px' }}>
          <p style={{ fontSize: '12px', color: '#60A5FA', lineHeight: '1.5' }}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onNext} style={{ ...btnStyle, marginTop: '24px' }}>
        Continue
      </motion.button>
      <Divider />
      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={socialStyle}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google
        </button>
        <button style={socialStyle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Apple
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <span style={{ fontSize: '14px', color: '#6B7280' }}>Already have an account? </span>
        <button onClick={onLogin} style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: '14px', cursor: 'pointer', fontWeight: 600 }}>
          Sign in
        </button>
      </div>
    </>
  );
}

function ForgotForm({ email, setEmail, inputStyle, btnStyle, onNext }: any) {
  return (
    <>
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif' }}>
          Reset password
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '6px', lineHeight: '1.6' }}>
          Enter your email and we'll send a verification code to reset your password.
        </p>
      </div>
      <div style={{ marginTop: '32px' }}>
        <InputWrapper icon={Mail}>
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        </InputWrapper>
      </div>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onNext} style={{ ...btnStyle, marginTop: '24px' }}>
        Send OTP Code
      </motion.button>
    </>
  );
}

function OtpForm({ otp, onOtp, onKey, otpRefs, btnStyle, email, onComplete }: any) {
  const [resent, setResent] = useState(false);
  return (
    <>
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif' }}>
          Verify your email
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '6px', lineHeight: '1.6' }}>
          We sent a 6-digit code to <span style={{ color: '#fff' }}>{email || 'your email'}</span>
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '40px', justifyContent: 'center' }}>
        {otp.map((val: string, i: number) => (
          <input
            key={i}
            ref={el => { otpRefs.current[i] = el; }}
            value={val}
            onChange={e => onOtp(e.target.value, i)}
            onKeyDown={(e: React.KeyboardEvent) => onKey(e, i)}
            maxLength={1}
            style={{
              width: '46px',
              height: '56px',
              background: val ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
              border: val ? '2px solid #3B82F6' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              textAlign: 'center',
              color: '#fff',
              fontSize: '22px',
              fontWeight: 700,
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <span style={{ fontSize: '14px', color: '#6B7280' }}>Didn't receive it? </span>
        <button
          onClick={() => setResent(true)}
          style={{ background: 'none', border: 'none', color: resent ? '#6B7280' : '#3B82F6', fontSize: '14px', cursor: 'pointer', fontWeight: 600 }}
          disabled={resent}
        >
          {resent ? 'Sent!' : 'Resend code'}
        </button>
      </div>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onComplete} style={{ ...btnStyle, marginTop: '36px' }}>
        Verify & Continue
      </motion.button>
    </>
  );
}
