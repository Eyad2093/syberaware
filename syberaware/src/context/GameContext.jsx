// ============================================================
//  SyberAware — App State Context (pure client-side)
// ============================================================
import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

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

  // Timing (seconds spent on each level) + how many times the quest was retried
  stageStartedAt: null,
  preTestSeconds: null,
  questSeconds: null,
  postTestSeconds: null,
  questAttempts: 1,
};

function secondsSince(start, now) {
  return start ? Math.max(1, Math.round((now - start) / 1000)) : null;
}

function reducer(state, action) {
  switch (action.type) {

    case 'SET_STAGE':
      return { ...state, stage: action.payload, stageStartedAt: action.at };

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
        preTestSeconds: secondsSince(state.stageStartedAt, action.at),
        stageStartedAt: action.at,
        stage: 2,
      };
    }

    // Level shown in the nav bar = the quest/level the player is currently on
    case 'SET_LEVEL':
      return state.level === action.payload ? state : { ...state, level: action.payload };

    case 'ANSWER_QUEST': {
      const { scenarioId, choiceId, points } = action.payload;
      const newXp = state.xp + points * 10;
      const newHearts = points === 0 ? Math.max(0, state.hearts - 1) : state.hearts;
      return {
        ...state,
        questAnswers: { ...state.questAnswers, [scenarioId]: { choiceId, points } },
        xp: newXp,
        hearts: newHearts,
        totalQuestPoints: state.totalQuestPoints + points,
      };
    }

    // Out of hearts -> start the quest over (keeps pre-test result and timing)
    case 'RESET_QUEST':
      return {
        ...state,
        hearts: state.maxHearts,
        xp: 0,
        level: 1,
        totalQuestPoints: 0,
        questAnswers: {},
        questAttempts: state.questAttempts + 1,
      };

    case 'FINISH_QUEST': {
      const { score } = action.payload;
      return {
        ...state,
        questScore: score,
        questSeconds: secondsSince(state.stageStartedAt, action.at),
        stageStartedAt: action.at,
        stage: 3,
      };
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
        postTestSeconds: secondsSince(state.stageStartedAt, action.at),
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
  const [state, rawDispatch] = useReducer(reducer, initialState);
  // Stamp every action with the time it happened (keeps the reducer pure)
  const dispatch = useCallback(action => rawDispatch({ ...action, at: Date.now() }), []);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
