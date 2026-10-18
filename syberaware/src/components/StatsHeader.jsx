// ============================================================
//  <StatsHeader/> — Top bar from the design:
//  logo | 0X /04 | stage tabs | LV. | hearts | timer
// ============================================================
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

const STAGES = [
  { id: 1, label: 'PRE-TEST' },
  { id: 2, label: 'GAMIFIED QUEST' },
  { id: 3, label: 'POST-TEST' },
  { id: 4, label: 'BEHAVIOR DASHBOARD' },
];

function useTimer(running = true) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function StatsHeader() {
  const { state } = useGame();
  const { stage, hearts, maxHearts, level } = state;
  const timer = useTimer(stage >= 1 && stage <= 3);

  return (
    <header id="stats-header" className="nav-bar">
      <a href="#" className="nav-logo" aria-label="SyberAware home">
        <img src={`${import.meta.env.BASE_URL}eye.png`} alt="" />
        <span className="nav-logo-text">Syber<b>Aware</b></span>
      </a>

      <span className="nav-counter" aria-label={`Stage ${stage} of 4`}>
        {String(stage).padStart(2, '0')} /04
      </span>

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
        <span className="nav-level" aria-label={`Level ${level}`}>
          LV. {String(level).padStart(2, '0')}
        </span>
        <div className="nav-hearts" role="status" aria-label={`${hearts} of ${maxHearts} hearts remaining`}>
          {Array.from({ length: maxHearts }).map((_, i) => (
            <span key={i} className={`nav-heart ${i < hearts ? '' : 'empty'}`} aria-hidden="true">♥</span>
          ))}
        </div>
        <span className="nav-timer" aria-label={`Time elapsed: ${timer}`}>{timer}</span>
      </div>
    </header>
  );
}
