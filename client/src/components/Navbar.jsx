import { useWeb3 } from '../context/Web3Context';

export default function Navbar() {
  const { account, isConnecting, connectWallet, isAdmin, votingActive } = useWeb3();

  const formatAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 26, 0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
            }}
          >
            🗳️
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              E-Voting <span className="gradient-text">DApp</span>
            </h1>
            <p className="hide-mobile" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Blokzincir Tabanlı Oylama
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Status Badges — desktop only */}
          {account && (
            <div
              className="hide-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: votingActive ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                border: `1px solid ${votingActive ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
                color: votingActive ? 'var(--success)' : 'var(--danger)',
              }}
            >
              <span
                style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: votingActive ? 'var(--success)' : 'var(--danger)',
                  boxShadow: votingActive ? '0 0 8px rgba(16,185,129,0.6)' : 'none',
                }}
              />
              {votingActive ? 'Oylama Aktif' : 'Oylama Pasif'}
            </div>
          )}

          {isAdmin && (
            <div
              className="hide-mobile"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '12px',
                fontSize: '0.75rem', fontWeight: 700,
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.25)',
                color: 'var(--warning)',
              }}
            >
              ⚙️ Admin
            </div>
          )}

          {/* Wallet / Connect Button */}
          {account ? (
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 18px', borderRadius: '14px',
                fontSize: '0.85rem', fontWeight: 600,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                color: 'var(--primary-light)',
              }}
            >
              <span
                style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: 'var(--success)',
                  boxShadow: '0 0 8px rgba(16,185,129,0.6)',
                }}
              />
              <span style={{ fontFamily: 'monospace' }}>{formatAddress(account)}</span>
            </div>
          ) : (
            <button
              id="connect-wallet-btn"
              onClick={connectWallet}
              disabled={isConnecting}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px', borderRadius: '16px',
                fontSize: '0.95rem', fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
                backgroundSize: '200% 200%',
                animation: 'gradient-border 4s ease infinite',
                color: '#fff',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 6px 30px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.1)',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                opacity: isConnecting ? 0.7 : 1,
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                if (!isConnecting) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.1)';
              }}
            >
              {isConnecting ? (
                <>
                  <svg style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Bağlanıyor...
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.2rem' }}>🦊</span>
                  <span>MetaMask'a Bağlan</span>
                  <svg style={{ width: '16px', height: '16px', opacity: 0.7 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
