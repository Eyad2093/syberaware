// ============================================================
//  <BadgeModal/> — Feedback pop-up matching the "CORRECT ACTION!" design
//  Also used for the "OUT OF HEARTS" screen (variant="gameover")
// ============================================================
import React, { useEffect } from 'react';
import CyberByte from './CyberByte';
import { playGameOverSound } from '../utils/audio';

export default function BadgeModal({
  isOpen,
  isCorrect,
  variant = 'feedback',          // 'feedback' | 'gameover'
  pointsEarned = 0,
  streak = 0,
  heading,
  summary,
  explanation,
  explanationLabel = 'FEEDBACK EXPLANATION',
  buttonLabel = 'CONTINUE QUEST →',
  onContinue,
}) {
  const gameOver = variant === 'gameover';

  useEffect(() => {
    if (!isOpen || !gameOver) return;
    const stop = playGameOverSound();
    return () => stop?.();
  }, [isOpen, gameOver]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = e => {
      if (e.key === 'Escape') onContinue?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onContinue]);

  if (!isOpen) return null;

  const mood = gameOver ? 'alert' : isCorrect ? 'happy' : pointsEarned === 1 ? 'thinking' : 'alert';

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
          <CyberByte size={54} animated mood={mood} />
          <div className="modal-top-chips">
            {isCorrect && streak >= 2 && (
              <span className="chip-streak" aria-label={`${streak} answers correct in a row`}>
                <img src={`${import.meta.env.BASE_URL}pixel-fire.png`} className="chip-streak-fire" alt="" />
                {streak}X STREAK!
              </span>
            )}
            {gameOver ? (
              <span className="chip-pink" aria-label="No hearts left">♥ ♡ ♡ 0 LEFT</span>
            ) : (
              <span
                className={pointsEarned === 2 ? 'chip-cyan' : pointsEarned === 1 ? 'chip-yellow' : 'chip-pink'}
                aria-label={`${pointsEarned > 0 ? '+' : ''}${pointsEarned} points earned`}
              >
                {pointsEarned > 0 ? `+${pointsEarned} POINTS` : '0 POINTS'}
              </span>
            )}
          </div>
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
