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

  // Local state for editing board name
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Start editing a board
  const startEditing = (index, currentName) => {
    setEditingIndex(index);
    setEditValue(currentName);
  };

  // Save edited board name
  const saveEditing = (index) => {
    if (editValue.trim() !== '') {
      dispatch(editBoardName({ index, name: editValue }));
    }
    setEditingIndex(null);
    setEditValue('');
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditValue('');
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
              <div>
                <input
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  autoFocus
                />
                <button onClick={e => { e.stopPropagation(); saveEditing(index); }}>Save</button>
                <button onClick={e => { e.stopPropagation(); cancelEditing(); }}>Cancel</button>
              </div>
            ) : (
              <div>
                {board.icon} {board.name}
                <button onClick={e => { e.stopPropagation(); startEditing(index, board.name); }}>
                  ✏️
                </button>
                {index !== 0 && (
                  <button onClick={e => { e.stopPropagation(); dispatch(deleteBoard(index)); }}>
                    ❌
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      <button onClick={() => dispatch(addBoard())}>
        ➕ Add New Board
      </button>
    </div>
  );
};

export default Sidebar;



