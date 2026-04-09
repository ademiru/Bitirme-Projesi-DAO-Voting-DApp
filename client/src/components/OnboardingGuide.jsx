export default function OnboardingGuide({ onOpenMetaMaskGuide }) {
  const steps = [
    {
      n: '1',
      title: 'MetaMask Yükleyin',
      desc: 'Kripto cüzdanınız yoksa yükleyin',
      icon: '🦊',
      color: '#f6851b',
      action: onOpenMetaMaskGuide,
      actionLabel: 'Nasıl Kurulur?',
    },
    {
      n: '2',
      title: 'Cüzdanı Bağlayın',
      desc: 'Sağ üstteki butona tıklayın',
      icon: '🔗',
      color: '#6366f1',
    },
    {
      n: '3',
      title: 'Oy Verin!',
      desc: 'Adayınızı seçip oy kullanın',
      icon: '🗳️',
      color: '#10b981',
    },
  ];

  return (
    <div style={{
      maxWidth: '700px', margin: '0 auto 3rem',
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: '20px', padding: '2rem',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
          🚀 Başlamak İçin 3 Adım
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Oy kullanmaya başlamak çok kolay
        </p>
      </div>

      {/* Steps Row */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', minWidth: '180px' }}>
            <div
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                padding: '1.25rem 1rem', borderRadius: '16px', width: '100%',
                background: `${s.color}06`, border: `1px solid ${s.color}15`,
                transition: 'all 0.3s', cursor: s.action ? 'pointer' : 'default',
              }}
              onClick={s.action}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color + '40'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = s.color + '15'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Number Badge */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 800,
                background: `${s.color}15`, color: s.color,
              }}>
                {s.n}
              </div>

              <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  {s.title}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.desc}</p>
              </div>

              {s.action && (
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600,
                  padding: '4px 12px', borderRadius: '8px',
                  background: `${s.color}15`, color: s.color,
                  marginTop: '4px',
                }}>
                  {s.actionLabel} →
                </span>
              )}
            </div>

            {/* Arrow Connector */}
            {i < steps.length - 1 && (
              <div className="hide-mobile" style={{ color: 'var(--border-light)', fontSize: '1.2rem', flexShrink: 0 }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
