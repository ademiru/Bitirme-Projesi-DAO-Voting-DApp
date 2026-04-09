import { useState } from 'react';

export default function CandidateCard({ candidate, onVote, disabled, hasVoted, index, totalVotes }) {
  const [isVoting, setIsVoting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleVote = async () => {
    setIsVoting(true);
    try {
      await onVote(candidate.id);
    } catch (err) {
      // Error handled by parent
    } finally {
      setIsVoting(false);
    }
  };

  const percentage = totalVotes > 0
    ? Math.round((candidate.voteCount / totalVotes) * 100)
    : 0;

  const colors = [
    { gradient: 'linear-gradient(135deg, #6366f1, #818cf8)', glow: 'rgba(99, 102, 241, 0.3)', solid: '#6366f1' },
    { gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)', glow: 'rgba(6, 182, 212, 0.3)', solid: '#06b6d4' },
    { gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', glow: 'rgba(139, 92, 246, 0.3)', solid: '#8b5cf6' },
    { gradient: 'linear-gradient(135deg, #ec4899, #f472b6)', glow: 'rgba(236, 72, 153, 0.3)', solid: '#ec4899' },
    { gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', glow: 'rgba(245, 158, 11, 0.3)', solid: '#f59e0b' },
    { gradient: 'linear-gradient(135deg, #10b981, #34d399)', glow: 'rgba(16, 185, 129, 0.3)', solid: '#10b981' },
  ];

  const color = colors[index % colors.length];

  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'both',
      }}
    >
      <div
        className="relative overflow-hidden transition-all duration-300"
        style={{
          background: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
          border: `1px solid ${isHovered ? color.solid + '40' : 'var(--border)'}`,
          borderRadius: '16px',
          padding: '24px',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: isHovered ? `0 12px 40px ${color.glow}` : '0 4px 15px rgba(0,0,0,0.2)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Gradient Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: color.gradient,
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Candidate Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{
                background: color.gradient,
                color: '#fff',
                boxShadow: `0 4px 15px ${color.glow}`,
              }}
            >
              #{candidate.id}
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {candidate.name}
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Aday #{candidate.id}
              </p>
            </div>
          </div>
        </div>

        {/* Vote Stats */}
        <div
          className="flex items-center justify-between mb-3 p-3 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke={color.solid} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {candidate.voteCount}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>oy</span>
          </div>
          <div
            className="text-lg font-bold"
            style={{ color: color.solid }}
          >
            %{percentage}
          </div>
        </div>

        {/* Vote Bar */}
        <div
          className="mb-5 rounded-full overflow-hidden"
          style={{
            height: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${percentage}%`,
              background: color.gradient,
              minWidth: candidate.voteCount > 0 ? '8px' : '0px',
            }}
          />
        </div>

        {/* Vote Button */}
        <button
          id={`vote-btn-${candidate.id}`}
          onClick={handleVote}
          disabled={disabled || isVoting}
          className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
          style={{
            background: disabled
              ? 'rgba(100, 116, 139, 0.1)'
              : isVoting
                ? 'rgba(99, 102, 241, 0.2)'
                : color.gradient,
            color: disabled ? 'var(--text-muted)' : '#fff',
            border: disabled ? '1px solid var(--border)' : 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: disabled ? 'none' : `0 4px 15px ${color.glow}`,
            opacity: isVoting ? 0.7 : 1,
          }}
        >
          {isVoting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Blokzincire İşleniyor...
            </span>
          ) : hasVoted ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Oyunuz Kaydedildi ✓
            </span>
          ) : disabled ? (
            'Cüzdan Bağlayın'
          ) : (
            <span className="flex items-center justify-center gap-2">
              🗳️ Bu Adaya Oy Ver
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
