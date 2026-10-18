// ============================================================
//  <BadgeModal/> — Feedback pop-up matching the "CORRECT ACTION!" design
// ============================================================
import React, { useEffect } from 'react';
import CyberByte from './CyberByte';

export default function BadgeModal({
  isOpen,
  isCorrect,
  pointsEarned = 0,
  heading,
  summary,
  explanation,
  onContinue,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = e => {
      if (e.key === 'Escape') onContinue?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onContinue]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-modal-heading"
      onClick={e => { if (e.target === e.currentTarget) onContinue?.(); }}
    >
      <div className="modal-card">
        <div className="modal-top-row">
          <CyberByte size={52} animated />
          <span
            className="chip-cyan"
            aria-label={`${pointsEarned > 0 ? '+' : ''}${pointsEarned} points earned`}
          >
            {pointsEarned > 0 ? `+${pointsEarned} POINTS` : '0 POINTS'}
          </span>
        </div>

        <h2 id="badge-modal-heading" className={`modal-heading ${isCorrect ? '' : 'wrong'}`}>
          {heading}
        </h2>

        <p className="modal-summary">{summary}</p>

        <div className="modal-explanation-box">
          <p className="modal-explanation-label">FEEDBACK EXPLANATION</p>
          <p className="modal-explanation-text">{explanation}</p>
        </div>

        <div className="modal-actions">
          <button
            id="badge-modal-continue"
            className="btn-pink"
            onClick={onContinue}
            aria-label="Continue to next quest"
          >
            CONTINUE QUEST →
          </button>
        </div>
      </div>
    </div>
  );
}
