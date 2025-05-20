import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBoardIndex, addBoard, deleteBoard, editBoardName } from '../features/tasks/taskSlice';
import './Sidebar.css';

const Sidebar = () => {
  const boards = useSelector(state => state.tasks.boards);
  const selectedBoardIndex = useSelector(state => state.tasks.selectedBoardIndex);
  const dispatch = useDispatch();

  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (index, currentName) => {
    setEditingIndex(index);
    setEditValue(currentName);
  };

  const saveEdit = (index) => {
    if (editValue.trim()) {
      dispatch(editBoardName({ index, name: editValue }));
      setEditingIndex(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
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
              <>
                <input
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  autoFocus
                />
                <button onClick={e => { e.stopPropagation(); saveEdit(index); }}>💾</button>
                <button onClick={e => { e.stopPropagation(); cancelEdit(); }}>✖️</button>
              </>
            ) : (
              <>
                {board.icon} {board.name}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    startEdit(index, board.name);
                  }}
                  style={{ marginLeft: 8 }}
                >✏️</button>
                {index !== 0 && (
                  <button onClick={e => {
                    e.stopPropagation();
                    dispatch(deleteBoard(index));
                  }}>❌</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(addBoard())}>➕ Add Board</button>
    </div>
  );
};

export default Sidebar;