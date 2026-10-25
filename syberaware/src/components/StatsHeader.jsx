// ============================================================
//  <StatsHeader/> — Top bar from the design:
//  logo | 0X /04 | stage tabs | streak | LV. | hearts
// ============================================================
import React from 'react';
import { useGame } from '../context/GameContext';

const STAGES = [
  { id: 1, label: 'PRE-TEST' },
  { id: 2, label: 'GAMIFIED QUEST' },
  { id: 3, label: 'POST-TEST' },
  { id: 4, label: 'BEHAVIOR DASHBOARD' },
];

export default function StatsHeader() {
  const { state, dispatch } = useGame();
  const { stage, hearts, maxHearts, level, streak } = state;

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (stage === 0) return;
    if (stage >= 1 && stage <= 3) {
      const confirmLeave = window.confirm('Return to the welcome screen? Your current session progress will be lost.');
      if (!confirmLeave) return;
    }
    dispatch({ type: 'RESTART' });
  };

  return (
    <header id="stats-header" className="nav-bar">
      <div className="nav-left">
        <a href="#" className="nav-logo" onClick={handleLogoClick} aria-label="SyberAware home">
          <img src={`${import.meta.env.BASE_URL}eye.png`} alt="" />
          <span className="nav-logo-text">Syber<b>Aware</b></span>
        </a>

        <span className="nav-counter" aria-label={`Stage ${stage} of 4`}>
          {String(stage).padStart(2, '0')} /04
        </span>
      </div>

      <nav className="nav-tabs" aria-label="Stage navigation">
        {STAGES.map(s => {
          const cls = stage === s.id ? 'active' : '';
          return (
            <button
              key={s.id}
              id={`stage-nav-${s.id}`}
              className={`nav-tab ${cls}`}
              data-stage={s.id}
              aria-current={stage === s.id ? 'step' : undefined}
              disabled
            >
              {s.label}
            </button>
          );
        })}
      </nav>

      <div className="nav-right">
        {streak > 0 && (
          <div
            className={`nav-streak ${streak >= 3 ? 'hot' : ''}`}
            role="status"
            aria-label={`Current answer streak: ${streak} in a row`}
            title={`${streak} correct answers in a row!`}
          >
            <img
              src={`${import.meta.env.BASE_URL}pixel-fire.png`}
              className="nav-streak-fire"
              alt=""
            />
            <span className="streak-val">{streak}</span>
            <span className="streak-tag">{streak >= 3 ? 'SUPER STREAK' : 'STREAK'}</span>
          </div>
        )}

        <span className="nav-level" aria-label={`Level ${level}`}>
          LV. {String(level).padStart(2, '0')}
        </span>
        <div className="nav-hearts" role="status" aria-label={`${hearts} of ${maxHearts} hearts remaining`}>
          {Array.from({ length: maxHearts }).map((_, i) => (
            <img
              key={i}
              src={`${import.meta.env.BASE_URL}pixel-heart.png`}
              className={`nav-pixel-heart ${i < hearts ? '' : 'empty'}`}
              alt=""
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </header>
  );
}
