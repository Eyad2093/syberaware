// ============================================================
//  Stage 4 — SESSION COMPLETE (behavioral change report)
// ============================================================
import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { TOPICS } from '../data/scenarios';

function useCountUp(target) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const end = target ?? 0;
    if (end === 0) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(end / 75));
    const id = setInterval(() => {
      current = Math.min(current + step, end);
      setValue(current);
      if (current >= end) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target]);
  return value;
}

function ScoreCard({ label, score, cyan }) {
  const shown = useCountUp(score);
  return (
    <div className="score-card">
      <span className="score-tag">{label}</span>
      <div>
        <span
          className={`score-big ${cyan ? 'cyan' : ''}`}
          aria-label={`${label} score: ${score ?? 0} out of 100`}
        >
          {shown}
        </span>
        <span className="score-of">/ 100</span>
      </div>
    </div>
  );
}

function TopicBars({ name, pre, post, delay }) {
  const [w, setW] = useState({ pre: 0, post: 0 });
  useEffect(() => {
    const t = setTimeout(() => setW({ pre, post }), delay + 300);
    return () => clearTimeout(t);
  }, [pre, post, delay]);

  return (
    <div className="topic-row" aria-label={`${name}: ${pre} pre-test, ${post} post-test`}>
      <div className="topic-head">
        <span>{name}</span>
        <span>{pre} → {post}</span>
      </div>
      <div className="bar-track" role="progressbar" aria-valuenow={post} aria-valuemax={100}>
        <div className="bar-pre"  style={{ width: `${w.pre}%` }} />
        <div className="bar-post" style={{ width: `${w.post}%` }} />
      </div>
    </div>
  );
}

function getImprovementText(delta) {
  if (delta >= 50) return 'Significant growth observed in cybersecurity response protocols.';
  if (delta >= 20) return 'Notable improvement in cyber threat awareness and response.';
  if (delta >= 0)  return 'Steady progress in cyber safety decision-making.';
  return 'Keep practicing — every quest builds stronger cyber skills!';
}

export default function DashboardScreen() {
  const { state, dispatch } = useGame();
  const { preTestScore, postTestScore, topicPreScores, topicPostScores } = state;

  const pre   = preTestScore  ?? 0;
  const post  = postTestScore ?? 0;
  const delta = post - pre;
  const relGain = pre > 0 ? (((post - pre) / pre) * 100).toFixed(1) : post > 0 ? '∞' : '0';

  return (
    <main id="dashboard-screen" className="stage dash">
      <h1 className="pixel-title">SESSION<br />COMPLETE</h1>
      <p className="dash-sub">BEHAVIORAL CHANGE REPORT</p>

      <div className="score-row" role="region" aria-label="Score comparison">
        <ScoreCard label="PRE-TEST"  score={pre} />
        <ScoreCard label="POST-TEST" score={post} cyan />
      </div>

      <div className="metric-card" role="region" aria-label="Behavioral improvement summary">
        <div className="metric-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 19V5M4 19h16" stroke="#0095b6" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 15l3-4 3 2 4-6" stroke="#0095b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="metric-label">BEHAVIORAL IMPROVEMENT</p>
          <p className="metric-desc">{getImprovementText(delta)}</p>
        </div>
        <div className="metric-value">
          <strong>{delta >= 0 ? '+' : ''}{relGain}%</strong>
          <span>APPROX. RELATIVE GAIN</span>
        </div>
      </div>

      <section className="topic-block" aria-label="Per-topic score comparison">
        <p className="topic-note"><span>ILLUSTRATIVE SAMPLE DATA</span><b>PRE ▬ POST ▬</b></p>
        {TOPICS.map((name, i) => (
          <TopicBars
            key={name}
            name={name}
            pre={topicPreScores[i] ?? 0}
            post={topicPostScores[i] ?? 0}
            delay={i * 200}
          />
        ))}
      </section>

      <div className="dash-actions">
        <button
          id="restart-session-btn"
          className="btn-pink large"
          onClick={() => dispatch({ type: 'RESTART' })}
          aria-label="Restart the SyberAware session from the beginning"
        >
          ‹ RESTART SESSION DEMO
        </button>
      </div>
    </main>
  );
}
