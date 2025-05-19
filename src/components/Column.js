import React from 'react';
import TaskCard from './TaskCard';
import { useDispatch } from 'react-redux';
import { moveTask } from '../features/tasks/taskSlice';
import './Column.css';

const columnNames = {
  backlog: 'Backlog',
  inProgress: 'In Progress',
  inReview: 'In Review',
  completed: 'Completed',
};

const Column = ({ name, tasks }) => {
  const dispatch = useDispatch();

  const handleMove = (taskId, sourceColumn, destColumn) => {
    dispatch(moveTask({ sourceColumn, destColumn, taskId }));
  };

  return (
    <div className="column">
      <h4>{columnNames[name]} ({tasks.length})</h4>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            column={name}
            onMove={handleMove}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;