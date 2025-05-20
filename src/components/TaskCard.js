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
  const prevStatus = statusOrder[currentIndex - 1];

  return (
    <div className="task-card">
      {task.cover && <img src={task.cover} alt="cover" />}
      <p>{task.name}</p>
      <div className="tags">
        {task.tags?.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
      <div className="move-btns">
        {column === 'inReview' ? (
          <>
            <button
              className="move-btn"
              onClick={() => onMove(task.id, column, prevStatus)}
            >
              In Progress
            </button>
            <button
              className="move-btn"
              onClick={() => onMove(task.id, column, nextStatus)}
            >
              Completed
            </button>
          </>
        ) : (
          nextStatus && column !== 'completed' && (
            <button
              className="move-btn"
              onClick={() => onMove(task.id, column, nextStatus)}
            >
              {statusLabels[column]}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TaskCard;