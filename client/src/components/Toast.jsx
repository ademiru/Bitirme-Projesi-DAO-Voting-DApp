import { useState, useEffect, useCallback } from 'react';

export default function Toast({ message, type = 'info', onClose, duration = 5000 }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  };

  const colors = {
    success: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
      icon: '#10b981',
      bar: '#10b981',
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.3)',
      icon: '#ef4444',
      bar: '#ef4444',
    },
    info: {
      bg: 'rgba(99, 102, 241, 0.1)',
      border: 'rgba(99, 102, 241, 0.3)',
      icon: '#6366f1',
      bar: '#6366f1',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.3)',
      icon: '#f59e0b',
      bar: '#f59e0b',
    },
  };

  const color = colors[type] || colors.info;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        minWidth: '340px',
        maxWidth: '420px',
        background: color.bg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${color.border}`,
        borderRadius: '12px',
        padding: '16px',
        animation: isClosing ? 'toast-out 0.3s ease-in forwards' : 'toast-in 0.4s ease-out',
        overflow: 'hidden',
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 mt-0.5"
          style={{ color: color.icon }}
        >
          {icons[type]}
        </div>
        <p className="text-sm font-medium flex-1" style={{ color: 'var(--text-primary)' }}>
          {message}
        </p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          background: color.bar,
          borderRadius: '0 0 12px 12px',
          animation: `progress-bar ${duration}ms linear`,
        }}
      />
    </div>
  );
}
