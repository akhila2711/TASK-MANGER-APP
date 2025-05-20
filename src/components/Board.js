import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import Column from './Column';
import './Board.css';

const Board = () => {
  const { boards, selectedBoardIndex } = useSelector(state => state.tasks);
  const columns = boards[selectedBoardIndex].columns;
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim()) {
      dispatch(addTask({
        column: 'backlog',
        task: {
          name: taskName,
          description: '',
          tags: []
        }
      }));
      setTaskName('');
    }
  };

  return (

  <div className="board">
    <h2>{boards[selectedBoardIndex].name}</h2>
    <div className="board-columns">
      {Object.entries(columns).map(([key, tasks]) => (
        <Column key={key} name={key} tasks={tasks} />
      ))}
    </div>
    <div style={{ marginTop: 16 }}>
      <input
        type="text"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Add new task to Backlog"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  </div>

  );
};

export default Board;