// ============================================================
//  <TestCard/> — Shared layout for DIAGNOSTIC (pre) and POST-CHECK (post)
//  Title + subtitle + cream tab + tilted navy card with scenario,
//  cream choice buttons and pink NEXT QUESTION button.
// ============================================================
import React, { useState } from 'react';

export function Scribble() {
  return (
    <svg className="scribble" viewBox="0 0 56 44" fill="none" aria-hidden="true">
      <path
        d="M30 5C18 2 5 10 5 22c0 13 14 19 28 17 13-2 20-12 17-22C47 8 36 3 24 6 14 9 9 16 12 24"
        stroke="#fff200"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TestCard({
  idPrefix,
  title,
  subtitle,
  scenarios,
  onFinish,
  mainId,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]           = useState({});
  const [selected, setSelected]         = useState(null);
  const [submitted, setSubmitted]       = useState(false);

  const scenario = scenarios[currentIndex];
  const isLast   = currentIndex === scenarios.length - 1;

  function handleNext() {
    if (!selected || submitted) return;

    const newAnswers = { ...answers, [scenario.id]: selected };
    setAnswers(newAnswers);
    setSubmitted(true);

    setTimeout(() => {
      if (isLast) {
        const correct = scenarios.filter(s => newAnswers[s.id] === s.correctId).length;
        onFinish({
          score: Math.round((correct / scenarios.length) * 100),
          topicScores: scenarios.map(s => (newAnswers[s.id] === s.correctId ? 100 : 0)),
        });
      } else {
        setCurrentIndex(i => i + 1);
        setSelected(null);
        setSubmitted(false);
      }
    }, 400);
  }

  function choiceCls(id) {
    if (!submitted) return selected === id ? 'selected' : '';
    if (id === scenario.correctId) return 'correct';
    if (id === selected) return 'wrong';
    return '';
  }

  return (
    <main id={mainId} className="stage">
      <h1 className="pixel-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>

      <span className="card-tab">SCENARIO {currentIndex + 1} / {scenarios.length}</span>

      <article
        id={`${idPrefix}-card-${scenario.id}`}
        key={scenario.id}
        className="game-card"
        aria-label={`Scenario ${currentIndex + 1} of ${scenarios.length}`}
      >
        <div className="scenario-region">
          <Scribble />
          <p className="scenario-tag">{scenario.tag}</p>
          <p className="scenario-text">{scenario.prompt}</p>
        </div>

        <div className="choices-region" role="group" aria-label="Answer options">
          {scenario.choices.map(choice => (
            <button
              key={choice.id}
              id={`${idPrefix}-choice-${scenario.id}-${choice.id}`}
              className={`choice-btn anim-slideup ${choiceCls(choice.id)}`}
              onClick={() => !submitted && setSelected(choice.id)}
              disabled={submitted}
              aria-pressed={selected === choice.id}
              aria-label={`Option ${choice.label} ${choice.text}`}
            >
              <span className="choice-label">{choice.label}</span>
              <span className="choice-text">{choice.text}</span>
              <span className="choice-badge" aria-hidden="true">OPTION</span>
            </button>
          ))}
        </div>

        <div className="card-footer">
          <span className="footer-label">{scenario.footer}</span>
          <button
            id={`${idPrefix}-next-${scenario.id}`}
            className="btn-pink"
            onClick={handleNext}
            disabled={!selected || submitted}
          >
            {isLast ? 'SUBMIT →' : 'NEXT QUESTION →'}
          </button>
        </div>
      </article>
    </main>
  );
}
