// ============================================================
//  <StreakBurst/> — pixel fire + "xN" pop-up shown beside the card
//  whenever an answer extends the consecutive-correct streak.
//  Re-mounts (key = count) so the animation replays every time.
// ============================================================
import React from 'react';

export default function StreakBurst({ count }) {
  if (!count || count < 1) return null;
  const level = count >= 4 ? 'inferno' : count >= 2 ? 'hot' : 'warm';

  return (
    <div
      key={count}
      className={`streak-burst ${level}`}
      role="status"
      aria-label={`Streak times ${count}`}
    >
      <img
        src={`${import.meta.env.BASE_URL}pixel-fire.png`}
        className="streak-burst-fire"
        alt=""
      />
      <span className="streak-burst-count">x{count}</span>
      <span className="streak-burst-label">{count >= 2 ? 'STREAK!' : 'NICE!'}</span>
    </div>
  );
}
