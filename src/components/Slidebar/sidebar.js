import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, setBoard } from "../../slices/taskSlice";
import "./slidebar.css"

const Sidebar = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => Object.keys(state.boards));
  const activeBoard = useSelector((state) => state.activeBoard);
  const [newBoard, setNewBoard] = useState("");

  return (
    <div className="sidebar">
      <h2>Boards</h2>
      {boards.map((board) => (
        <div
          key={board}
          className={`board-button${activeBoard === board ? " active" : ""}`}
          onClick={() => dispatch(setBoard(board))}
        >
          {board}
        </div>
      ))}
      <input
        className="add-board-input"
        placeholder="New board"
        value={newBoard}
        onChange={(e) => setNewBoard(e.target.value)}
      />
      <button
        className="add-board-button"
        onClick={() => {
          if (newBoard.trim()) {
            dispatch(addBoard(newBoard));
            setNewBoard("");
          }
        }}
      >
        Add Board
      </button>
    </div>
  );
};
export default Sidebar;
