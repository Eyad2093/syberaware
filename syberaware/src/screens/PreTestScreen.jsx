// ============================================================
//  Stage 1 — Pre-Test (DIAGNOSTIC)
// ============================================================
import React from 'react';
import TestCard from '../components/ScenarioCard';
import { useGame } from '../context/GameContext';
import { PRE_TEST_SCENARIOS } from '../data/scenarios';

export default function PreTestScreen() {
  const { dispatch } = useGame();
  return (
    <TestCard
      mainId="pretest-screen"
      idPrefix="pretest"
      title="DIAGNOSTIC"
      subtitle="VARIANT // BASELINE"
      scenarios={PRE_TEST_SCENARIOS}
      onFinish={payload => dispatch({ type: 'FINISH_PRETEST', payload })}
    />
  );
}
