// ============================================================
//  Stage 3 — Post-Test (POST-CHECK)
// ============================================================
import React from 'react';
import TestCard from '../components/ScenarioCard';
import { useGame } from '../context/GameContext';
import { POST_TEST_SCENARIOS } from '../data/scenarios';

export default function PostTestScreen() {
  const { dispatch } = useGame();
  return (
    <TestCard
      mainId="posttest-screen"
      idPrefix="posttest"
      title="POST-CHECK"
      subtitle="VERIFY YOUR CYBER SKILLS"
      scenarios={POST_TEST_SCENARIOS}
      onFinish={payload => dispatch({ type: 'FINISH_POSTTEST', payload })}
    />
  );
}
