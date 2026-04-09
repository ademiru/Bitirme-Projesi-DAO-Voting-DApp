import { useState, useCallback, useEffect } from 'react';
import { Web3Provider, useWeb3 } from './context/Web3Context';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import VotingArea from './components/VotingArea';
import HowItWorks from './components/HowItWorks';
import OnboardingGuide from './components/OnboardingGuide';
import MetaMaskGuide from './components/MetaMaskGuide';
import Toast from './components/Toast';

function AppContent() {
  const [toast, setToast] = useState(null);
  const [showMetaMaskGuide, setShowMetaMaskGuide] = useState(false);
  const { error, setError, account } = useWeb3();

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      setError(null);
    }
  }, [error, showToast, setError]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ─── Hero Section ─── */}
      <header style={{ padding: '5rem 0 4rem', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blobs */}
        <div className="animate-float" style={{ position: 'absolute', top: '5rem', left: '-5rem', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(99,102,241,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="animate-float" style={{ position: 'absolute', bottom: '-3rem', right: '-3rem', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(6,182,212,0.03)', filter: 'blur(100px)', pointerEvents: 'none', animationDelay: '3s' }} />

        <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Badge */}
          <div
            className="animate-fade-in-up"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '50px',
              fontSize: '0.8rem', fontWeight: 600,
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.15)',
              color: 'var(--primary-light)',
              marginBottom: '2rem',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', animation: 'pulse-glow 2s infinite', display: 'inline-block' }} />
            Ethereum Blokzinciri Üzerinde Çalışıyor
          </div>

          {/* Title */}
          <h1
            className="animate-fade-in-up"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              animationDelay: '0.1s',
              animationFillMode: 'both',
              letterSpacing: '-0.02em',
            }}
          >
            Şeffaf <span className="gradient-text">Elektronik Oylama</span> Sistemi
          </h1>

          {/* Description */}
          <p
            className="animate-fade-in-up"
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
              animationDelay: '0.2s',
              animationFillMode: 'both',
            }}
          >
            Blokzincir teknolojisi ile güvenli, değiştirilemez ve tamamen şeffaf oy kullanın.
            Her oy Ethereum ağına kaydedilir ve herkes tarafından doğrulanabilir.
          </p>

          {/* Feature Badges */}
          <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', animationDelay: '0.35s', animationFillMode: 'both' }}>
            {[
              { icon: '🔒', text: 'Değiştirilemez Oylar', c: '#6366f1' },
              { icon: '👁️', text: 'Şeffaf Sonuçlar', c: '#06b6d4' },
              { icon: '🚫', text: 'Mükerrer Oy Engeli', c: '#f59e0b' },
              { icon: '⚡', text: 'Anlık Doğrulama', c: '#10b981' },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 20px', borderRadius: '14px',
                  fontSize: '0.85rem', fontWeight: 500,
                  background: `${b.c}08`, border: `1px solid ${b.c}20`,
                  color: 'var(--text-secondary)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = b.c + '50'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = b.c + '20'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{ fontSize: '1rem' }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Stats ─── */}
      <StatsSection />

      {/* ─── Main Content ─── */}
      <main className="container-main" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        {/* Onboarding — only when not connected */}
        {!account && (
          <OnboardingGuide onOpenMetaMaskGuide={() => setShowMetaMaskGuide(true)} />
        )}

        <AdminPanel onToast={showToast} />
        <VotingArea onToast={showToast} />
      </main>

      <div className="section-divider" />

      {/* ─── How It Works ─── */}
      <HowItWorks />

      <div className="section-divider" />

      {/* ─── Tech Stack ─── */}
      <TechStack />

      {/* ─── Footer ─── */}
      <footer style={{ padding: '2.5rem 0', borderTop: '1px solid var(--border)', background: 'rgba(10,10,26,0.6)' }}>
        <div className="container-main" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            Geliştiren: <span className="gradient-text" style={{ fontWeight: 800 }}>Adem Emir UZEL</span>
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            © 2026 E-Voting DApp — Üniversite Bitirme Projesi
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Powered by</span>
            <span style={{ fontWeight: 700, color: 'var(--primary-light)' }}>Ethereum</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>Solidity</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>React</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <MetaMaskGuide isOpen={showMetaMaskGuide} onClose={() => setShowMetaMaskGuide(false)} />
      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

function StatsSection() {
  const { candidates, account } = useWeb3();
  const totalVotes = candidates.reduce((sum, c) => sum + c.voteCount, 0);
  const leader = candidates.length > 0 ? candidates.reduce((a, b) => a.voteCount > b.voteCount ? a : b) : null;

  const stats = [
    { label: 'Toplam Aday', value: candidates.length, color: '#6366f1', icon: '👥' },
    { label: 'Kullanılan Oy', value: totalVotes, color: '#06b6d4', icon: '🗳️' },
    { label: 'Önde Olan', value: leader ? leader.name : '—', color: '#10b981', icon: '🏆' },
  ];

  if (!account) return null;

  return (
    <div className="container-main" style={{ paddingTop: '2.5rem', paddingBottom: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            className="animate-fade-in-up"
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '1.5rem 1.75rem', borderRadius: '18px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              transition: 'all 0.3s',
              animationDelay: `${i * 0.1}s`, animationFillMode: 'both',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color + '40'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', flexShrink: 0,
              background: `${s.color}10`, border: `1px solid ${s.color}20`,
            }}>
              {s.icon}
            </div>
            <div>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechStack() {
  const techs = [
    { name: 'Solidity', desc: 'Akıllı Kontrat', icon: '📝', color: '#6366f1' },
    { name: 'Ethereum', desc: 'Blokzincir Ağı', icon: '⛓️', color: '#627eea' },
    { name: 'React.js', desc: 'Arayüz', icon: '⚛️', color: '#61dafb' },
    { name: 'Ethers.js', desc: 'Web3 Kütüphanesi', icon: '🔗', color: '#8b5cf6' },
    { name: 'Hardhat', desc: 'Test Ortamı', icon: '🛠️', color: '#f59e0b' },
    { name: 'MetaMask', desc: 'Kripto Cüzdan', icon: '🦊', color: '#f6851b' },
  ];

  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="container-main" style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 18px', borderRadius: '50px',
          fontSize: '0.75rem', fontWeight: 600,
          background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)',
          color: '#a78bfa', marginBottom: '1.25rem',
        }}>
          🧰 Tech Stack
        </div>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Kullanılan Teknolojiler
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Projede kullanılan araç ve framework'ler
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
          {techs.map((t, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{
                textAlign: 'center', padding: '1.75rem 1rem', borderRadius: '18px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                transition: 'all 0.3s', cursor: 'default',
                animationDelay: `${i * 0.08}s`, animationFillMode: 'both',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.color + '50'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${t.color}12`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{t.icon}</div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: t.color }}>{t.name}</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
}
