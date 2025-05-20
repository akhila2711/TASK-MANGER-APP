import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBoardIndex,
  addBoard,
  deleteBoard,
  editBoardName
} from '../features/tasks/taskSlice';
import './Sidebar.css';

const Sidebar = () => {
  const boards = useSelector(state => state.tasks.boards);
  const selectedBoardIndex = useSelector(state => state.tasks.selectedBoardIndex);
  const dispatch = useDispatch();

  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (index, name) => {
    setEditingIndex(index);
    setEditValue(name);
  };

  const saveEdit = (index) => {
    if (!editValue.trim()) return;
    dispatch(editBoardName({ index, name: editValue }));
    setEditingIndex(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const handleClick = (e, action) => {
    e.stopPropagation();
    action();
  };

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
            {editingIndex === index ? (
              <>
                <input
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  autoFocus
                />
                <button onClick={e => handleClick(e, () => saveEdit(index))}>💾</button>
                <button onClick={e => handleClick(e, cancelEdit)}>✖️</button>
              </>
            ) : (
              <>
                {board.icon} {board.name}
                <button onClick={e => handleClick(e, () => startEdit(index, board.name))}>✏️</button>
                {index !== 0 && (
                  <button onClick={e => handleClick(e, () => dispatch(deleteBoard(index)))}>❌</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(addBoard())}>➕ Add New Board</button>
    </div>
  );
};

export default Sidebar;


