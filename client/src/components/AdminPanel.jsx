import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

export default function AdminPanel({ onToast }) {
  const { addCandidate, toggleVoting, votingActive, isAdmin } = useWeb3();
  const [candidateName, setCandidateName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  if (!isAdmin) return null;

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = candidateName.trim();
    if (!name) { onToast('Lütfen bir aday ismi girin.', 'warning'); return; }
    setIsAdding(true);
    try {
      await addCandidate(name);
      setCandidateName('');
      onToast(`"${name}" adayı başarıyla eklendi!`, 'success');
    } catch (err) {
      if (err.code === 'ACTION_REJECTED') onToast('İşlem iptal edildi.', 'warning');
      else onToast('Aday eklenirken hata oluştu.', 'error');
    } finally { setIsAdding(false); }
  };

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await toggleVoting(!votingActive);
      onToast(votingActive ? 'Oylama durduruldu.' : 'Oylama başlatıldı!', 'success');
    } catch (err) {
      if (err.code === 'ACTION_REJECTED') onToast('İşlem iptal edildi.', 'warning');
      else onToast('Durum değiştirme hatası.', 'error');
    } finally { setIsToggling(false); }
  };

  return (
    <div
      className="animate-fade-in-up"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(245,158,11,0.15)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '3rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.75rem' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem',
          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
        }}>
          ⚙️
        </div>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Yönetici Paneli</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Aday ekleme ve oylama yönetimi</p>
        </div>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <form onSubmit={handleAdd} style={{ display: 'flex', flex: '1 1 350px', gap: '10px' }}>
          <input
            id="candidate-name-input"
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Aday adını yazın..."
            style={{
              flex: 1, minWidth: 0,
              padding: '14px 18px', borderRadius: '14px',
              fontSize: '0.9rem', fontWeight: 500,
              background: 'var(--bg-input)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
          <button
            id="add-candidate-btn"
            type="submit"
            disabled={isAdding || !candidateName.trim()}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '14px 24px', borderRadius: '14px',
              fontSize: '0.9rem', fontWeight: 700,
              background: isAdding || !candidateName.trim() ? 'rgba(99,102,241,0.1)' : 'linear-gradient(135deg, var(--primary), var(--accent))',
              color: isAdding || !candidateName.trim() ? 'var(--text-muted)' : '#fff',
              border: 'none', cursor: isAdding || !candidateName.trim() ? 'not-allowed' : 'pointer',
              boxShadow: isAdding || !candidateName.trim() ? 'none' : '0 4px 15px rgba(99,102,241,0.25)',
              transition: 'all 0.3s', whiteSpace: 'nowrap',
            }}
          >
            {isAdding ? '⏳ Ekleniyor...' : '➕ Aday Ekle'}
          </button>
        </form>

        <button
          id="toggle-voting-btn"
          onClick={handleToggle}
          disabled={isToggling}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '14px 22px', borderRadius: '14px',
            fontSize: '0.9rem', fontWeight: 700,
            background: votingActive ? 'rgba(239,68,68,0.06)' : 'rgba(16,185,129,0.06)',
            border: `1px solid ${votingActive ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
            color: votingActive ? 'var(--danger)' : 'var(--success)',
            cursor: isToggling ? 'wait' : 'pointer',
            transition: 'all 0.3s', whiteSpace: 'nowrap',
            opacity: isToggling ? 0.6 : 1,
          }}
        >
          {isToggling ? '⏳' : votingActive ? '⏸ Oylamayı Durdur' : '▶ Oylamayı Başlat'}
        </button>
      </div>
    </div>
  );
}
