// ============================================================
//  App.jsx — Root router (client-side stage switching)
// ============================================================
import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import StatsHeader   from './components/StatsHeader';
import WelcomeScreen  from './screens/WelcomeScreen';
import PreTestScreen  from './screens/PreTestScreen';
import QuestScreen    from './screens/QuestScreen';
import PostTestScreen from './screens/PostTestScreen';
import DashboardScreen from './screens/DashboardScreen';

function AppRouter() {
  const { state } = useGame();

  const showHeader = state.stage >= 1;

  return (
    <div className="app-shell">
      {showHeader && <StatsHeader />}

      {/* Screen routing by stage */}
      {state.stage === 0 && <WelcomeScreen />}
      {state.stage === 1 && <PreTestScreen />}
      {state.stage === 2 && <QuestScreen />}
      {state.stage === 3 && <PostTestScreen />}
      {state.stage === 4 && <DashboardScreen />}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppRouter />
    </GameProvider>
  );
}
