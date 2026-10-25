// ============================================================
//  Stage 2 — CYBER QUEST
//  Chat bubble, Byte's Tip, +N point choices, feedback modal
// ============================================================
import React, { useEffect, useRef, useState } from 'react';
import CyberByte from '../components/CyberByte';
import BadgeModal from '../components/BadgeModal';
import { useGame } from '../context/GameContext';
import { QUEST_SCENARIOS } from '../data/scenarios';
import { playCorrectSound, playPartialSound, playWrongSound, playStreakSound } from '../utils/audio';

// "GameSupport_X" -> "GX", "CoolKid2009" -> "CK", "ProGamer_99" -> "PG"
function initials(name) {
  const parts = name.split(/_|(?=[A-Z])/).filter(p => /^[A-Za-z]/.test(p));
  if (parts.length < 2) return name.slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function QuestScreen() {
  const { state, dispatch } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected]         = useState(null);
  const [submitted, setSubmitted]       = useState(false);
  const [modalOpen, setModalOpen]       = useState(false);
  const [shakeId, setShakeId]           = useState(null);
  const [gameOver, setGameOver]         = useState(false);
  const advancing = useRef(false);

  const quest  = QUEST_SCENARIOS[currentIndex];
  const isLast = currentIndex === QUEST_SCENARIOS.length - 1;

  // Keep the nav-bar "LV." in sync with the quest the player is on
  useEffect(() => {
    dispatch({ type: 'SET_LEVEL', payload: quest.questNumber });
  }, [quest.questNumber, dispatch]);

  const currentFeedback = submitted
    ? (selected === quest.correctId ? quest.feedbackCorrect : quest.feedbackWrong)
    : null;

  const pointsEarned = submitted
    ? (quest.choices.find(c => c.id === selected)?.points ?? 0)
    : 0;

  // Choosing an answer submits it straight away (no separate submit button in the design)
  function handleChoose(choiceId) {
    if (submitted) return;

    const choice = quest.choices.find(c => c.id === choiceId);
    const pts    = choice?.points ?? 0;

    setSelected(choiceId);
    setSubmitted(true);

    dispatch({
      type: 'ANSWER_QUEST',
      payload: { scenarioId: quest.id, choiceId, points: pts },
    });

    // 8-bit sound feedback for right, partial, or wrong
    if (pts === 2) {
      if (state.streak >= 1) {
        playStreakSound();
      } else {
        playCorrectSound();
      }
    } else if (pts === 1) {
      playPartialSound();
    } else {
      playWrongSound();
    }

    const wrong = choiceId !== quest.correctId;
    if (wrong) {
      setShakeId(choiceId);
      setTimeout(() => setShakeId(null), 600);
    }

    // Losing the last heart ends this attempt
    if (pts === 0 && state.hearts <= 1) setGameOver(true);

    setTimeout(() => setModalOpen(true), wrong ? 700 : 300);
  }

  function handleRetry() {
    setModalOpen(false);
    setTimeout(() => {
      dispatch({ type: 'RESET_QUEST' });
      setCurrentIndex(0);
      setSelected(null);
      setSubmitted(false);
      setGameOver(false);
      advancing.current = false;
    }, 250);
  }

  function handleContinue() {
    if (advancing.current) return;
    advancing.current = true;
    if (gameOver) { handleRetry(); return; }
    setModalOpen(false);

    setTimeout(() => {
      if (isLast) {
        const total  = state.totalQuestPoints;
        const maxPts = QUEST_SCENARIOS.reduce((s, q) => s + q.bestPoints, 0);
        const score  = Math.round((total / maxPts) * 100);
        dispatch({ type: 'FINISH_QUEST', payload: { score } });
      } else {
        setCurrentIndex(i => i + 1);
        setSelected(null);
        setSubmitted(false);
        advancing.current = false;
      }
    }, 250);
  }

  function choiceCls(choice) {
    let cls = '';
    if (shakeId === choice.id) cls += ' animate-shake';
    if (submitted) {
      if (choice.id === quest.correctId) cls += ' correct';
      else if (choice.id === selected)   cls += ' wrong';
    }
    return cls.trim();
  }

  return (
    <>
      <main className="stage" id="quest-screen">
        <h1 className="pixel-title">CYBER QUEST</h1>
        <p className="page-subtitle">LEVEL {quest.questNumber} // {quest.levelTitle}</p>

        <span className="card-tab">QUEST {quest.questNumber} / {quest.totalQuests}</span>

        <article id={`quest-card-${quest.id}`} className="game-card" key={quest.id}>
          {/* Chat bubble */}
          <div className="chat-region">
            <div className="sender-avatar" aria-hidden="true">
              {initials(quest.sticker.sender)}
            </div>
            <div>
              <div>
                <span className="sender-name">{quest.sticker.sender}</span>
                <span className="sender-time"> · {quest.sticker.time}</span>
              </div>
              <p className="sender-message">{quest.message}</p>
            </div>
          </div>

          {/* Byte's Tip */}
          <div className="byte-row">
            <CyberByte size={48} animated mood="thinking" />
            <div className="byte-tip">
              <p className="byte-tip-label">BYTE'S TIP</p>
              <p className="byte-tip-text">{quest.byteTip}</p>
            </div>
          </div>

          {/* Choices */}
          <div className="choices-region" role="group" aria-label="Quest choices">
            {quest.choices.map(choice => (
              <button
                key={choice.id}
                id={`quest-choice-${quest.id}-${choice.id}`}
                className={`choice-btn anim-slideup ${choiceCls(choice)}`}
                onClick={() => handleChoose(choice.id)}
                disabled={submitted}
                aria-label={`Option ${choice.label} ${choice.text} — worth ${choice.points} points`}
              >
                <span className="choice-label">{choice.label}</span>
                <span className="choice-text">{choice.text}</span>
                <span className="choice-points" aria-hidden="true">
                  {choice.points > 0 ? `+${choice.points}` : '0'}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="card-footer">
            <span className="footer-label">{quest.footer}</span>
            <span className="earn-hint">✦ EARN UP TO {quest.bestPoints} POINTS</span>
          </div>
        </article>
      </main>

      <BadgeModal
        isOpen={modalOpen}
        variant={gameOver ? 'gameover' : 'feedback'}
        isCorrect={selected === quest.correctId}
        pointsEarned={pointsEarned}
        streak={state.streak}
        heading={gameOver ? 'OUT OF HEARTS!' : (currentFeedback?.heading ?? '')}
        summary={gameOver
          ? 'You lost all 3 hearts. Every hero needs a few tries, so let\'s go again!'
          : (currentFeedback?.summary ?? '')}
        explanation={currentFeedback?.explanation ?? ''}
        explanationLabel={gameOver ? 'REMEMBER THIS FOR NEXT TIME' : 'FEEDBACK EXPLANATION'}
        buttonLabel={gameOver ? 'TRY AGAIN ↻' : 'CONTINUE QUEST →'}
        onContinue={handleContinue}
      />
    </>
  );
}
