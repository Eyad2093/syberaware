// ============================================================
//  SyberAware — App State Context (pure client-side)
// ============================================================
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  stage: 0,          // 0=Welcome, 1=PreTest, 2=Quest, 3=PostTest, 4=Dashboard
  playerName: 'PLAYER',

  // Stats (Quest)
  hearts: 3,
  maxHearts: 3,
  xp: 0,
  level: 1,
  totalQuestPoints: 0,

  // Pre-test answers: { scenarioId: choiceId }
  preTestAnswers: {},
  preTestScore: null,   // 0-100 after completion

  // Quest answers: { scenarioId: { choiceId, points } }
  questAnswers: {},
  questScore: null,

  // Post-test answers: { scenarioId: choiceId }
  postTestAnswers: {},
  postTestScore: null,  // 0-100 after completion

  // Per-topic scores for comparison
  topicPreScores:  [0, 0, 0],  // indices match TOPICS
  topicPostScores: [0, 0, 0],
};

function reducer(state, action) {
  switch (action.type) {

    case 'SET_STAGE':
      return { ...state, stage: action.payload };

    case 'SET_NAME':
      return { ...state, playerName: action.payload };

    case 'ANSWER_PRETEST': {
      const { scenarioId, choiceId } = action.payload;
      return {
        ...state,
        preTestAnswers: { ...state.preTestAnswers, [scenarioId]: choiceId },
      };
    }

    case 'FINISH_PRETEST': {
      const { score, topicScores } = action.payload;
      return {
        ...state,
        preTestScore: score,
        topicPreScores: topicScores,
        stage: 2,
      };
    }

    case 'ANSWER_QUEST': {
      const { scenarioId, choiceId, points } = action.payload;
      const newXp = state.xp + points * 10;
      const newLevel = Math.floor(newXp / 100) + 1;
      const newHearts = points === 0 ? Math.max(0, state.hearts - 1) : state.hearts;
      return {
        ...state,
        questAnswers: { ...state.questAnswers, [scenarioId]: { choiceId, points } },
        xp: newXp,
        level: newLevel,
        hearts: newHearts,
        totalQuestPoints: state.totalQuestPoints + points,
      };
    }

    case 'FINISH_QUEST': {
      const { score } = action.payload;
      return { ...state, questScore: score, stage: 3 };
    }

    case 'ANSWER_POSTTEST': {
      const { scenarioId, choiceId } = action.payload;
      return {
        ...state,
        postTestAnswers: { ...state.postTestAnswers, [scenarioId]: choiceId },
      };
    }

    case 'FINISH_POSTTEST': {
      const { score, topicScores } = action.payload;
      return {
        ...state,
        postTestScore: score,
        topicPostScores: topicScores,
        stage: 4,
      };
    }

    case 'RESTART':
      return { ...initialState };

    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
