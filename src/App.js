import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const theme = useSelector(state => state.tasks.theme);

  return (
    <div className={`app-container ${theme}-theme`}>
      <Sidebar />
      <main className="main-content">
        <ThemeToggle />
        <Board />
      </main>
    </div>
  );
}

export default App;