// ============================================================
//  <BadgeModal/> — Feedback pop-up matching the "CORRECT ACTION!" design
//  Also used for the "OUT OF HEARTS" screen (variant="gameover")
// ============================================================
import React, { useEffect } from 'react';
import CyberByte from './CyberByte';

export default function BadgeModal({
  isOpen,
  isCorrect,
  variant = 'feedback',          // 'feedback' | 'gameover'
  pointsEarned = 0,
  heading,
  summary,
  explanation,
  explanationLabel = 'FEEDBACK EXPLANATION',
  buttonLabel = 'CONTINUE QUEST →',
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

  const gameOver = variant === 'gameover';

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-modal-heading"
      onClick={e => { if (e.target === e.currentTarget) onContinue?.(); }}
    >
      <div className={`modal-card ${gameOver ? 'gameover' : ''}`}>
        <div className="modal-top-row">
          <CyberByte size={52} animated />
          {gameOver ? (
            <span className="chip-pink" aria-label="No hearts left">♥ ♡ ♡ 0 LEFT</span>
          ) : (
            <span
              className="chip-cyan"
              aria-label={`${pointsEarned > 0 ? '+' : ''}${pointsEarned} points earned`}
            >
              {pointsEarned > 0 ? `+${pointsEarned} POINTS` : '0 POINTS'}
            </span>
          )}
        </div>

        <h2 id="badge-modal-heading" className={`modal-heading ${isCorrect && !gameOver ? '' : 'wrong'}`}>
          {heading}
        </h2>

        <p className="modal-summary">{summary}</p>

        <div className="modal-explanation-box">
          <p className="modal-explanation-label">{explanationLabel}</p>
          <p className="modal-explanation-text">{explanation}</p>
        </div>

        <div className="modal-actions">
          <button
            id="badge-modal-continue"
            className="btn-pink"
            onClick={onContinue}
            aria-label={gameOver ? 'Try the quest again' : 'Continue to next quest'}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
