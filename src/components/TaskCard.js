import React from 'react';
import './TaskCard.css';

const statusOrder = ['backlog', 'inProgress', 'inReview', 'completed'];
const statusLabels = {
  backlog: 'In Progress',
  inProgress: 'In Review',
  inReview: 'Completed',
};

const TaskCard = ({ task, column, onMove }) => {
  
  const currentIndex = statusOrder.indexOf(column);
  const nextStatus = statusOrder[currentIndex + 1];

  return (
    <div className="task-card">
      {task.cover && <img src={task.cover} alt="cover" />}
      <p>{task.name}</p>
      <div className="tags">
        {task.tags?.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
      {nextStatus && (
        <button
          className="move-btn"
          onClick={() => onMove(task.id, column, nextStatus)}
        >
          {statusLabels[column]}
        </button>
      )}
    </div>
  );
};

export default TaskCard;