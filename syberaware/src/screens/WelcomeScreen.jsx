// ============================================================
//  Stage 0 — Welcome / Landing Screen (same visual language as the design)
// ============================================================
import React, { useState } from 'react';
import CyberByte from '../components/CyberByte';
import { useGame } from '../context/GameContext';

export default function WelcomeScreen() {
  const { dispatch } = useGame();
  const [name, setName] = useState('');

  function handleStart() {
    dispatch({ type: 'SET_NAME', payload: name.trim() || 'PLAYER' });
    dispatch({ type: 'SET_STAGE', payload: 1 });
  }

  return (
    <main id="welcome-screen" className="welcome">
      <div className="welcome-inner">
        <div className="game-card">
          <CyberByte size={84} animated />
          <h1 className="welcome-title">SYBER<br />AWARE</h1>
          <p className="welcome-sub">Cyber Safety Quest for Digital Heroes</p>
          <p className="welcome-copy">
            Embark on a mission to defeat phishing traps, protect your identity,
            and earn the <b>Cyber Guardian</b> badge!
          </p>

          <div style={{ width: '100%', maxWidth: 340 }}>
            <label htmlFor="player-name-input" className="welcome-label">
              Your Codename (optional)
            </label>
            <input
              id="player-name-input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              placeholder="e.g. CyberNinja42"
              maxLength={20}
              className="welcome-input"
              aria-label="Enter your player codename"
            />
          </div>

          <button
            id="start-quest-btn"
            className="btn-pink large"
            onClick={handleStart}
            aria-label="Start the SyberAware cyber safety quest"
          >
            START QUEST →
          </button>

          <div className="welcome-steps" aria-hidden="true">
            <span>DIAGNOSTIC</span>
            <span>CYBER QUEST</span>
            <span>POST-CHECK</span>
            <span>DASHBOARD</span>
          </div>
        </div>
      </div>
    </main>
  );
}
