// ============================================================
//  Stage 4 — SESSION COMPLETE (behavioral change report)
//  Written for kids: "x out of 3 right", points gained, time taken,
//  gold badge for a perfect score, and a plain-language skill breakdown.
// ============================================================
import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { TOPICS, TOPIC_TIPS } from '../data/scenarios';
import {
  playSessionCompleteSound,
  playPerfectBadgeSound,
  playGuardianAchievementSound,
} from '../utils/audio';

const TOTAL_QUESTIONS = TOPICS.length;

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

/* Gold "perfect score" sticker (cream die-cut edge like the collage stickers) */
function GoldBadge({ playSound = false }) {
  useEffect(() => {
    if (!playSound) return;
    let stopSound = null;
    // Play Vadim's achievement badge pop sound synced with the 0.9s CSS pop animation
    const t = setTimeout(() => {
      stopSound = playPerfectBadgeSound();
    }, 900);
    return () => {
      clearTimeout(t);
      stopSound?.();
    };
  }, [playSound]);

  return (
    <div className="gold-badge" role="img" aria-label="Gold badge: perfect score, every answer right">
      <svg viewBox="0 0 96 112" width="76" height="88" aria-hidden="true">
        <defs>
          <radialGradient id="gold-fill" cx="35%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#fff6a8" />
            <stop offset="45%" stopColor="#ffd21f" />
            <stop offset="100%" stopColor="#d89a00" />
          </radialGradient>
        </defs>
        {/* ribbon tails */}
        <path d="M26 70 L14 108 L34 98 L44 112 L50 74 Z" fill="#ff4f9a" stroke="#fffdf2" strokeWidth="3" strokeLinejoin="round" />
        <path d="M70 70 L82 108 L62 98 L52 112 L46 74 Z" fill="#d93682" stroke="#fffdf2" strokeWidth="3" strokeLinejoin="round" />
        {/* medal */}
        <circle cx="48" cy="44" r="40" fill="#fffdf2" />
        <circle cx="48" cy="44" r="35" fill="url(#gold-fill)" stroke="#b97f00" strokeWidth="2" />
        <circle cx="48" cy="44" r="27" fill="none" stroke="#fff3a0" strokeWidth="1.5" strokeDasharray="3 3" />
        <path
          d="M48 23l6.2 12.8 14 2-10.1 9.9 2.4 14L48 55.1 35.5 61.7l2.4-14-10.1-9.9 14-2z"
          fill="#fffdf2"
          stroke="#b97f00"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="gold-badge-label">PERFECT!</span>
    </div>
  );
}

function ScoreCard({ label, score, rightCount, cyan, playBadgeSound = false }) {
  const shown = useCountUp(score);
  const perfect = score === 100;
  return (
    <div className="score-card">
      <div className="score-top">
        <span className="score-tag">{label}</span>
      </div>
      <div className="score-main">
        <div>
          <span
            className={`score-big ${cyan ? 'cyan' : ''}`}
            aria-label={`${label} score: ${score ?? 0} out of 100`}
          >
            {shown}
          </span>
          <span className="score-of">/ 100</span>
          <p className="score-right">{rightCount} OUT OF {TOTAL_QUESTIONS} RIGHT</p>
        </div>
        {perfect && <GoldBadge playSound={playBadgeSound} />}
      </div>
    </div>
  );
}

function getSkillStatus(pre, post) {
  if (pre && post)  return { cls: 'pro',   text: 'ALREADY A PRO ★' };
  if (!pre && post) return { cls: 'new',   text: 'NEW SKILL UNLOCKED!' };
  if (pre && !post) return { cls: 'oops',  text: 'REVIEW THIS ONE' };
  return               { cls: 'again', text: 'KEEP PRACTICING' };
}

function SkillRow({ name, pre, post, questPoints, tip, delay }) {
  const [w, setW] = useState({ pre: 0, post: 0 });
  const preOk = pre >= 100;
  const postOk = post >= 100;
  useEffect(() => {
    const t = setTimeout(() => setW({ pre, post }), delay + 300);
    return () => clearTimeout(t);
  }, [pre, post, delay]);

  const status = getSkillStatus(preOk, postOk);

  return (
    <div className="topic-row" aria-label={`${name}: before ${preOk ? 'right' : 'missed'}, after ${postOk ? 'right' : 'missed'}`}>
      <div className="topic-head">
        <span>{name}</span>
        <span className={`skill-status ${status.cls}`}>{status.text}</span>
      </div>
      <div className="bar-track" role="progressbar" aria-valuenow={post} aria-valuemax={100}>
        <div className="bar-pre"  style={{ width: `${w.pre}%` }} />
        <div className="bar-post" style={{ width: `${w.post}%` }} />
      </div>
      <p className="topic-meta">
        <span>BEFORE: {preOk ? '✓ RIGHT' : '✗ MISSED'}</span>
        <span>QUEST: {questPoints ?? 0}/2 ★</span>
        <span>AFTER: {postOk ? '✓ RIGHT' : '✗ MISSED'}</span>
      </p>
      {!postOk && <p className="topic-tip">TIP: {tip}</p>}
    </div>
  );
}

function getImprovement(delta, pre, post, preRight, postRight) {
  if (delta > 0) {
    return {
      label: 'HOW MUCH YOU IMPROVED',
      desc: `Before the quest you got ${preRight} out of ${TOTAL_QUESTIONS} right. After it you got ${postRight} out of ${TOTAL_QUESTIONS}. The Cyber Quest taught you something!`,
      value: `+${delta}`,
      unit: 'POINTS GAINED',
    };
  }
  if (delta === 0 && post === 100) {
    return {
      label: 'CYBER PRO!',
      desc: `You got all ${TOTAL_QUESTIONS} right before AND after the quest. You already know how to stay safe online. Amazing!`,
      value: '100',
      unit: 'POINTS BOTH TIMES',
    };
  }
  if (delta === 0) {
    return {
      label: 'SAME SCORE',
      desc: `You got ${postRight} out of ${TOTAL_QUESTIONS} right both times. Try the quest again to learn the tricky ones!`,
      value: '0',
      unit: 'POINTS CHANGED',
    };
  }
  return {
    label: 'KEEP PRACTICING',
    desc: `Your score dipped from ${preRight} to ${postRight} right. That's okay. Play the quest again and you'll get stronger!`,
    value: `${delta}`,
    unit: 'POINTS CHANGED',
  };
}

/* Cyber Guardian award: revealed (with the unlock sound) when it scrolls into view */
function CyberGuardianBadge({ playerName }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let stopSound = null;
    let done = false;

    const reveal = () => {
      if (done) return;
      done = true;
      setRevealed(true);
      stopSound = playGuardianAchievementSound();
    };

    if (typeof IntersectionObserver === 'undefined') {
      const t = setTimeout(reveal, 1200);
      return () => { clearTimeout(t); stopSound?.(); };
    }

    const observer = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) { reveal(); observer.disconnect(); } },
      { threshold: 0.55 },
    );
    observer.observe(el);
    return () => { observer.disconnect(); stopSound?.(); };
  }, []);

  return (
    <section
      ref={ref}
      id="cyber-guardian-award"
      className={`guardian ${revealed ? 'revealed' : ''}`}
      aria-label="Cyber Guardian badge awarded"
    >
      <p className="guardian-kicker">ACHIEVEMENT UNLOCKED</p>
      <div className="guardian-stage">
        <span className="guardian-ring" aria-hidden="true" />
        <img
          src={`${import.meta.env.BASE_URL}cyber-guardian-badge.png`}
          className="guardian-badge"
          alt="Cyber Guardian badge: a golden pixel shield"
        />
        <i className="spark s1" aria-hidden="true" />
        <i className="spark s2" aria-hidden="true" />
        <i className="spark s3" aria-hidden="true" />
        <i className="spark s4" aria-hidden="true" />
      </div>
      <h2 className="guardian-title">CYBER GUARDIAN</h2>
      <p className="guardian-copy">
        {String(playerName).toUpperCase()} GOT <b>{TOTAL_QUESTIONS} OUT OF {TOTAL_QUESTIONS}</b> RIGHT IN THE POST-TEST.
        YOU CAN SPOT THE TRAPS AND KEEP YOUR ACCOUNT SAFE!
      </p>
    </section>
  );
}

export default function DashboardScreen() {
  const { state, dispatch } = useGame();
  const {
    playerName, preTestScore, postTestScore, topicPreScores, topicPostScores,
    questAnswers,
  } = state;

  const pre   = preTestScore  ?? 0;
  const post  = postTestScore ?? 0;
  const delta = post - pre;
  const preRight  = topicPreScores.filter(s => s >= 100).length;
  const postRight = topicPostScores.filter(s => s >= 100).length;
  const improvement = getImprovement(delta, pre, post, preRight, postRight);
  const earnedGuardian = postRight >= TOTAL_QUESTIONS;

  // "Level complete" jingle when the SESSION COMPLETE page appears
  useEffect(() => {
    const stop = playSessionCompleteSound();
    return () => stop?.();
  }, []);

  return (
    <main id="dashboard-screen" className="stage dash">
      <h1 className="pixel-title">SESSION<br />COMPLETE</h1>
      <p className="dash-sub">BEHAVIORAL CHANGE REPORT</p>
      <p className="dash-hello">GREAT JOB, {String(playerName).toUpperCase()}! HERE&apos;S HOW YOU DID.</p>

      {state.maxStreak >= 2 && (
        <div className="dash-streak-banner">
          <img
            src={`${import.meta.env.BASE_URL}pixel-fire.png`}
            className="dash-streak-img"
            alt=""
          />
          <span>BEST CONSECUTIVE STREAK: <strong>{state.maxStreak} IN A ROW!</strong></span>
        </div>
      )}

      <div className="score-row" role="region" aria-label="Score comparison">
        <ScoreCard
          label="PRE-TEST"
          score={pre}
          rightCount={preRight}
          playBadgeSound={pre === 100 && post !== 100}
        />
        <ScoreCard
          label="POST-TEST"
          score={post}
          rightCount={postRight}
          cyan
          playBadgeSound={post === 100}
        />
      </div>
      <p className="score-note">
        EVERY RIGHT ANSWER IS WORTH {Math.round(100 / TOTAL_QUESTIONS)} POINTS, SO {TOTAL_QUESTIONS} RIGHT = 100!
      </p>

      <div className="metric-card" role="region" aria-label="Behavioral improvement summary">
        <div className="metric-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 19V5M4 19h16" stroke="var(--cyan)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M8 15l3-4 3 2 4-6" stroke="var(--cyan)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="metric-label">{improvement.label}</p>
          <p className="metric-desc">{improvement.desc}</p>
        </div>
        <div className="metric-value">
          <strong>{improvement.value}</strong>
          <span>{improvement.unit}</span>
        </div>
      </div>

      <section className="topic-block" aria-label="Skill by skill breakdown">
        <h2 className="topic-title">SKILL BY SKILL</h2>
        <p className="topic-note">
          EACH SKILL IS ONE QUESTION ABOUT AN ONLINE DANGER. A FULL BAR MEANS YOU GOT IT RIGHT!
        </p>
        <p className="bar-legend">
          <span><i className="swatch white" /> WHITE BAR = BEFORE THE QUEST</span>
          <span><i className="swatch cyan" /> BLUE BAR = AFTER THE QUEST</span>
        </p>
        {TOPICS.map((name, i) => (
          <SkillRow
            key={name}
            name={name}
            pre={topicPreScores[i] ?? 0}
            post={topicPostScores[i] ?? 0}
            questPoints={questAnswers[`quest-${i + 1}`]?.points}
            tip={TOPIC_TIPS[i]}
            delay={i * 200}
          />
        ))}
      </section>

      {earnedGuardian && <CyberGuardianBadge playerName={playerName} />}

      <div className="dash-actions">
        <button
          id="restart-session-btn"
          className="btn-pink large"
          onClick={() => dispatch({ type: 'RESTART' })}
          aria-label="Restart the SyberAware session from the beginning"
        >
          ‹ RESTART SESSION
        </button>
      </div>
    </main>
  );
}
