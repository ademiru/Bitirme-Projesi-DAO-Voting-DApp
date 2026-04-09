import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

export default function TransactionFeed() {
  const { contract, candidates } = useWeb3();
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    if (!contract) return;

    const handleVoteCast = (voter, candidateId, event) => {
      const id = Number(candidateId);
      const candidate = candidates.find((c) => c.id === id);
      const newTx = {
        id: Date.now() + Math.random(),
        voter: voter,
        candidateName: candidate?.name || `Aday #${id}`,
        timestamp: new Date(),
        blockHash: event?.log?.blockHash || '',
      };
      setTxs((prev) => [newTx, ...prev].slice(0, 10));
    };

    contract.on('Voted', handleVoteCast);

    return () => {
      contract.off('Voted', handleVoteCast);
    };
  }, [contract, candidates]);

  if (txs.length === 0) return null;

  const formatAddr = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const formatTime = (d) => d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: '20px', padding: '2rem', marginTop: '2.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem',
          background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)',
        }}>
          📡
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Canlı İşlem Akışı</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Blokzincire kaydedilen son oylar</p>
        </div>
        <div style={{
          marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px', borderRadius: '8px',
          background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', animation: 'pulse-glow 2s infinite', display: 'inline-block' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--success)' }}>Canlı</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {txs.map((tx, i) => (
          <div
            key={tx.id}
            className={i === 0 ? 'animate-fade-in' : ''}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 14px', borderRadius: '14px',
              background: i === 0 ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.01)',
              border: `1px solid ${i === 0 ? 'rgba(16,185,129,0.12)' : 'var(--border)'}`,
              transition: 'all 0.3s',
            }}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.85rem', flexShrink: 0,
              background: 'rgba(16,185,129,0.08)',
            }}>
              ✅
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                <span style={{ fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 600 }}>{formatAddr(tx.voter)}</span>
                {' '}→{' '}
                <span style={{ fontWeight: 700 }}>{tx.candidateName}</span>
              </p>
            </div>

            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', flexShrink: 0 }}>
              {formatTime(tx.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
