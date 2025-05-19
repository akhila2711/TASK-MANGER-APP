import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBoardIndex, addBoard, deleteBoard } from '../features/tasks/taskSlice';
import './Sidebar.css';

const Sidebar = () => {
  const boards = useSelector(state => state.tasks.boards);
  const selectedBoardIndex = useSelector(state => state.tasks.selectedBoardIndex);
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <h3>Boards</h3>
      <ul>
        {boards.map((board, index) => (
          <li
            key={board.id}
            className={index === selectedBoardIndex ? 'active' : ''}
            onClick={() => dispatch(setBoardIndex(index))}
          >
            {board.icon} {board.name}
            {index !== 0 && (
              <button onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteBoard(index));
              }}>❌</button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(addBoard())}>➕ Add Board</button>
    </div>
  );
};

export default Sidebar;