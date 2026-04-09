export default function VoteChart({ candidates }) {
  const totalVotes = candidates.reduce((sum, c) => sum + c.voteCount, 0);

  if (candidates.length === 0 || totalVotes === 0) return null;

  const sorted = [...candidates].sort((a, b) => b.voteCount - a.voteCount);

  const colors = ['#6366f1', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: '20px', padding: '2rem', marginBottom: '2.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.75rem' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem',
          background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
        }}>
          📊
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Canlı Sonuçlar</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toplam {totalVotes} oy kullanıldı</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {sorted.map((c, i) => {
          const pct = Math.round((c.voteCount / totalVotes) * 100);
          const color = colors[i % colors.length];
          const isLeader = i === 0;

          return (
            <div key={c.id}>
              {/* Label Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {isLeader && <span style={{ fontSize: '0.9rem' }}>🏆</span>}
                  <span style={{ fontSize: '0.9rem', fontWeight: isLeader ? 700 : 500, color: isLeader ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {c.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color }}>{pct}%</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({c.voteCount} oy)</span>
                </div>
              </div>

              {/* Bar */}
              <div style={{
                height: isLeader ? '14px' : '10px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.04)', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: '10px',
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${color}, ${color}bb)`,
                  transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
                  minWidth: c.voteCount > 0 ? '12px' : '0px',
                  boxShadow: isLeader ? `0 2px 12px ${color}40` : 'none',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
