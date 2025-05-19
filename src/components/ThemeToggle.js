import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/tasks/taskSlice';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const theme = useSelector(state => state.tasks.theme);
  const dispatch = useDispatch();

  return (
    <button
      className="theme-toggle"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;