import { useState, useEffect } from 'react';

export default function MetaMaskGuide({ isOpen, onClose }) {
  const [browser, setBrowser] = useState('chrome');

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('firefox')) setBrowser('firefox');
    else if (ua.includes('edg')) setBrowser('edge');
    else if (ua.includes('brave')) setBrowser('brave');
    else setBrowser('chrome');
  }, []);

  if (!isOpen) return null;

  const browsers = [
    {
      id: 'chrome',
      name: 'Chrome',
      icon: (
        <svg viewBox="0 0 48 48" style={{ width: '32px', height: '32px' }}>
          <circle cx="24" cy="24" r="11" fill="#fff" />
          <path fill="#4CAF50" d="M24 13a11 11 0 00-9.53 5.5L7.64 6.79A24 24 0 0124 0a24 24 0 0121.18 12.79h-14.4A11 11 0 0024 13z" />
          <path fill="#F44336" d="M30.78 12.79h14.4A24 24 0 0148 24a24 24 0 01-7.64 17.5l-6.83-11.83A11 11 0 0024 35a11 11 0 01-9.53-5.5z" />
          <path fill="#FFC107" d="M14.47 29.5L7.64 41.33A24 24 0 010 24 24 24 0 017.64 6.79l6.83 11.83A11 11 0 0013 24c0 2.04.56 3.95 1.47 5.5z" />
          <circle cx="24" cy="24" r="8" fill="#2196F3" />
        </svg>
      ),
      url: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      color: '#4285F4',
    },
    {
      id: 'firefox',
      name: 'Firefox',
      icon: (
        <svg viewBox="0 0 48 48" style={{ width: '32px', height: '32px' }}>
          <linearGradient id="ffGrad1" x1="7" y1="7" x2="41" y2="41" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF9800" />
            <stop offset="1" stopColor="#F44336" />
          </linearGradient>
          <circle cx="24" cy="24" r="22" fill="url(#ffGrad1)" />
          <path fill="#FFE0B2" d="M33,14c-2-3-5-5-9-5c-7,0-12,5.4-12,12c0,7.2,5.4,13,12,13c5.3,0,9.8-3.5,11.3-8.3 C36.7,22,35.8,18,33,14z" opacity="0.3"/>
          <text x="24" y="30" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">🦊</text>
        </svg>
      ),
      url: 'https://addons.mozilla.org/tr/firefox/addon/ether-metamask/',
      color: '#FF6611',
    },
    {
      id: 'edge',
      name: 'Edge',
      icon: (
        <svg viewBox="0 0 48 48" style={{ width: '32px', height: '32px' }}>
          <linearGradient id="edgeGrad" x1="5" y1="5" x2="43" y2="43" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0078D4" />
            <stop offset="1" stopColor="#1DB954" />
          </linearGradient>
          <circle cx="24" cy="24" r="22" fill="url(#edgeGrad)" />
          <text x="24" y="32" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold">E</text>
        </svg>
      ),
      url: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
      color: '#0078D4',
    },
  ];

  const steps = [
    {
      n: '1',
      title: 'Uzantıyı Yükleyin',
      desc: 'Aşağıdan tarayıcınıza uygun bağlantıya tıklayarak MetaMask uzantısını yükleyin.',
      icon: '📥',
    },
    {
      n: '2',
      title: 'Cüzdan Oluşturun',
      desc: 'MetaMask açıldığında "Yeni Cüzdan Oluştur" seçeneğini seçin ve bir şifre belirleyin.',
      icon: '🔐',
    },
    {
      n: '3',
      title: 'Ağı Ayarlayın',
      desc: 'Sayfaya dönüp "MetaMask\'a Bağlan" butonuna tıklayın ve bağlantıyı onaylayın.',
      icon: '🔗',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: '520px',
          background: 'linear-gradient(135deg, #0f0f24, #141432)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px', padding: '2.5rem 2rem',
          animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem',
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px', margin: '0 auto 1rem',
            borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
            background: 'linear-gradient(135deg, rgba(246,133,27,0.15), rgba(246,133,27,0.05))',
            border: '1px solid rgba(246,133,27,0.25)',
          }}>
            🦊
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            MetaMask Nasıl Kurulur?
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            3 kolay adımda dijital cüzdanınızı oluşturun
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                padding: '1rem', borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.15rem', flexShrink: 0,
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
              }}>
                {s.icon}
              </div>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--primary-light)', marginRight: '6px' }}>Adım {s.n}</span>
                  {s.title}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Browser Download Links */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', textAlign: 'center' }}>
            Tarayıcınız İçin İndirin
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {browsers.map((b) => (
              <a
                key={b.id}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  padding: '16px 20px', borderRadius: '16px', textDecoration: 'none',
                  flex: '1', maxWidth: '140px',
                  background: browser === b.id ? `${b.color}12` : 'rgba(255,255,255,0.02)',
                  border: `2px solid ${browser === b.id ? b.color + '50' : 'var(--border)'}`,
                  transition: 'all 0.3s',
                  boxShadow: browser === b.id ? `0 4px 20px ${b.color}20` : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = b.color + '60';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 25px ${b.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = browser === b.id ? b.color + '50' : 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = browser === b.id ? `0 4px 20px ${b.color}20` : 'none';
                }}
              >
                {b.icon}
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{b.name}</span>
                {browser === b.id && (
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 600,
                    padding: '2px 8px', borderRadius: '6px',
                    background: `${b.color}20`, color: b.color,
                  }}>
                    Önerilen
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Note */}
        <div style={{
          padding: '12px 16px', borderRadius: '12px',
          background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.1)',
          fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6,
        }}>
          💡 MetaMask yüklendikten sonra bu sayfaya dönüp <strong style={{ color: 'var(--primary-light)' }}>"MetaMask'a Bağlan"</strong> butonuna tıklayın.
        </div>
      </div>
    </div>
  );
}
