import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import CandidateCard from './CandidateCard';
import VoteChart from './VoteChart';
import Confetti from './Confetti';
import TransactionFeed from './TransactionFeed';

export default function VotingArea({ onToast }) {
  const { candidates, account, hasVoted, votingActive, vote } = useWeb3();
  const totalVotes = candidates.reduce((sum, c) => sum + c.voteCount, 0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleVote = async (candidateId) => {
    try {
      await vote(candidateId);
      setShowConfetti(true);
      onToast('🎉 Oyunuz başarıyla blokzincire işlendi! Tebrikler!', 'success');
      setTimeout(() => setShowConfetti(false), 3500);
    } catch (err) {
      const reason = err?.reason || err?.info?.error?.message || err?.message || '';
      if (err.code === 'ACTION_REJECTED' || reason.includes('user rejected')) {
        onToast('İşlem MetaMask üzerinden iptal edildi.', 'warning');
      } else if (reason.includes('daha önce oy')) {
        onToast('Bu cüzdan ile daha önce oy kullanılmış.', 'error');
      } else if (reason.includes('aktif değil')) {
        onToast('Oylama şu anda durdurulmuş durumda.', 'error');
      } else {
        onToast('Oy verme işlemi başarısız oldu.', 'error');
      }
      throw err;
    }
  };

  const isDisabled = !account || hasVoted || !votingActive;

  return (
    <div>
      {/* Confetti */}
      <Confetti active={showConfetti} />

      {/* ─── Section Header ─── */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 18px', borderRadius: '50px',
          fontSize: '0.75rem', fontWeight: 600,
          background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
          color: 'var(--primary-light)', marginBottom: '1rem',
        }}>
          🗳️ Oylama Alanı
        </div>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Adaylar ve Oylama
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {candidates.length > 0
            ? `${candidates.length} aday kayıtlı • Toplam ${totalVotes} oy kullanıldı`
            : 'Henüz aday eklenmedi — yönetici panelinden aday eklenebilir'}
        </p>

        {account && hasVoted && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 22px', borderRadius: '14px',
            fontSize: '0.85rem', fontWeight: 600,
            background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)',
            color: 'var(--success)', marginTop: '1.25rem',
          }}>
            ✓ Oyunuz blokzincire kaydedildi
          </div>
        )}
      </div>

      {/* ─── Wallet Warning ─── */}
      {!account && (
        <div
          className="animate-fade-in"
          style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1.25rem 1.5rem', borderRadius: '16px',
            maxWidth: '600px', margin: '0 auto 2.5rem',
            background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.12)',
          }}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', flexShrink: 0,
            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
          }}>
            🦊
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--warning)', marginBottom: '3px' }}>
              Cüzdan Bağlantısı Gerekli
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Sağ üstteki <strong style={{ color: 'var(--text-secondary)' }}>"MetaMask'a Bağlan"</strong> butonuna tıklayın.
            </p>
          </div>
        </div>
      )}

      {/* ─── Voting Inactive ─── */}
      {account && !votingActive && (
        <div
          className="animate-fade-in"
          style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1.25rem 1.5rem', borderRadius: '16px',
            maxWidth: '600px', margin: '0 auto 2.5rem',
            background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)',
          }}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', flexShrink: 0,
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          }}>
            ⏸
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '3px' }}>
              Oylama Durdurulmuş
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Yönetici oylamayı tekrar başlatana kadar oy kullanılamaz.
            </p>
          </div>
        </div>
      )}

      {/* ─── Live Chart ─── */}
      <VoteChart candidates={candidates} />

      {/* ─── Candidates Grid ─── */}
      {candidates.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {candidates.map((c, i) => (
            <CandidateCard key={c.id} candidate={c} onVote={handleVote} disabled={isDisabled} hasVoted={hasVoted} index={i} totalVotes={totalVotes} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '5rem 2rem', borderRadius: '20px',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
        }}>
          <div className="animate-float" style={{
            width: '80px', height: '80px', margin: '0 auto 1.75rem',
            borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))',
            border: '1px solid rgba(99,102,241,0.15)',
          }}>
            🗳️
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Henüz Aday Eklenmedi
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
            Yönetici hesabıyla bağlanarak "Yönetici Paneli"nden aday ekleyebilirsiniz.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '12px',
            fontSize: '0.75rem', fontWeight: 500,
            background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)',
            color: 'var(--primary-light)',
          }}>
            💡 Admin = kontratı deploy eden ilk cüzdan
          </div>
        </div>
      )}

      {/* ─── Transaction Feed ─── */}
      <TransactionFeed />
    </div>
  );
}
