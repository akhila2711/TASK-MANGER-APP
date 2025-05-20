import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import Column from './Column';
import './Board.css';

const Board = () => {
  const { boards, selectedBoardIndex } = useSelector(state => state.tasks);
  const columns = boards[selectedBoardIndex].columns;
  const dispatch = useDispatch();

  // Add state for all fields
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTags, setTaskTags] = useState('');

  const handleAddTask = () => {
    if (taskName.trim()) {
      dispatch(addTask({
        column: 'backlog',
        task: {
          name: taskName,
          description: taskDescription,
          tags: taskTags.split(',').map(tag => tag.trim()).filter(Boolean)
        }
      }));
      setTaskName('');
      setTaskDescription('');
      setTaskTags('');
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
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          type="text"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          placeholder="Task name"
        />
        <textarea
          value={taskDescription}
          onChange={e => setTaskDescription(e.target.value)}
          placeholder="Task description"
          rows={2}
        />
        <input
          type="text"
          value={taskTags}
          onChange={e => setTaskTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Board;