export default function HowItWorks() {
  const steps = [
    {
      n: '01', title: 'Cüzdan Bağlantısı',
      desc: 'Seçmen, MetaMask kripto cüzdanı ile sisteme bağlanır. Cüzdan adresi kişinin dijital kimliği gibi benzersizdir.',
      icon: '🔑', color: '#6366f1',
      tip: 'Sandık başına gidip kimliğinizi göstermek gibi',
    },
    {
      n: '02', title: 'Oy Kullanma',
      desc: 'Seçmen, aday listesinden birini seçip "Oy Ver" butonuna tıklar. Bu işlem blokzincire gönderilir.',
      icon: '✅', color: '#06b6d4',
      tip: 'Zarfı sandığa atmak gibi — ama dijital ortamda',
    },
    {
      n: '03', title: 'Blokzincire Kayıt',
      desc: 'Oy, Ethereum blokzincirine yazılır. Bu kayıt geri alınamaz, silinemez ve değiştirilemez.',
      icon: '⛓️', color: '#8b5cf6',
      tip: 'Dijital beton bloğa kazınır — sonsuza dek kalır',
    },
    {
      n: '04', title: 'Mükerrer Oy Engeli',
      desc: 'Akıllı kontrat, her cüzdanın yalnızca bir kez oy kullanmasına izin verir. İkinci deneme otomatik reddedilir.',
      icon: '🛡️', color: '#10b981',
      tip: 'Parmak izi kontrolü — aynı kişi iki kez oy kullanamaz',
    },
  ];

  const comparisons = [
    { old: 'Kâğıt oylar kaybolabilir veya değiştirilebilir', new: 'Dijital oylar kalıcı ve değiştirilemez', icon: '📝' },
    { old: 'Sayım hataları ve insan müdahalesi riski', new: 'Otomatik sayım — hata payı sıfır', icon: '🔢' },
    { old: 'Sonuçlar gecikebilir, şeffaflık sınırlı', new: 'Anlık ve herkes tarafından doğrulanabilir', icon: '⏱️' },
    { old: 'Merkezi güven gerektirir', new: 'Merkeziyetsiz — güven matematiğe dayalı', icon: '🏛️' },
  ];

  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="container-main">
        {/* ─── Title ─── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 18px', borderRadius: '50px',
            fontSize: '0.75rem', fontWeight: 600,
            background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)',
            color: 'var(--accent)', marginBottom: '1.25rem',
          }}>
            📚 Sistem Hakkında
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Sistem Nasıl Çalışır?
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Blokzincir tabanlı oylama sistemi 4 basit adımda çalışır
          </p>
        </div>

        {/* ─── Steps Grid ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
          {steps.map((s, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{
                position: 'relative', padding: '2rem',
                borderRadius: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)',
                transition: 'all 0.3s',
                animationDelay: `${i * 0.1}s`, animationFillMode: 'both',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color + '40'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}10`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Number */}
              <div style={{ fontSize: '3rem', fontWeight: 900, color: s.color, opacity: 0.07, marginBottom: '0.75rem', lineHeight: 1 }}>
                {s.n}
              </div>

              {/* Icon */}
              <div style={{
                width: '52px', height: '52px', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', marginBottom: '1.25rem',
                background: `${s.color}0d`, border: `1px solid ${s.color}20`,
              }}>
                {s.icon}
              </div>

              {/* Content */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                {s.desc}
              </p>

              {/* Tip */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                padding: '12px', borderRadius: '12px',
                fontSize: '0.75rem', fontStyle: 'italic',
                background: `${s.color}06`, border: `1px solid ${s.color}10`,
                color: 'var(--text-muted)', lineHeight: 1.5,
              }}>
                <span style={{ flexShrink: 0 }}>💡</span>
                {s.tip}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Comparison Table ─── */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Geleneksel vs Blokzincir Oylama
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Neden blokzincir tabanlı bir sistem tercih edilmeli?
            </p>
          </div>

          <div style={{ borderRadius: '20px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '50px 1fr 1fr',
              padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              background: 'rgba(99,102,241,0.04)', borderBottom: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}>
              <div />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--danger)' }}>✕</span> Geleneksel
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> Blokzincir
              </div>
            </div>

            {comparisons.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'grid', gridTemplateColumns: '50px 1fr 1fr',
                  padding: '1rem 1.5rem', transition: 'background 0.2s',
                  borderBottom: i < comparisons.length - 1 ? '1px solid var(--border)' : 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99,102,241,0.02)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{c.icon}</div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', paddingRight: '1rem' }}>{c.old}</div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.new}</div>
              </div>
            ))}
          </div>

          {/* ─── Smart Contract Explainer ─── */}
          <div style={{
            marginTop: '3.5rem', padding: '2rem', borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(6,182,212,0.03))',
            border: '1px solid rgba(99,102,241,0.1)',
            display: 'flex', alignItems: 'flex-start', gap: '1.25rem',
          }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', flexShrink: 0,
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
            }}>
              🧠
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Akıllı Kontrat Nedir?
              </h4>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                Akıllı kontrat (Smart Contract), blokzincir üzerinde çalışan ve önceden belirlenmiş kurallara göre
                otomatik işlem yapan bir programdır. Bu projede oylama kuralları bir akıllı kontrat tarafından yönetilir.
                Kimse bu kuralları değiştiremez — kod bir kez deploy edildikten sonra değiştirilemez hale gelir.
                Seçim güvenliği insan müdahalesine değil, <strong>matematiksel kesinliğe</strong> dayanır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
