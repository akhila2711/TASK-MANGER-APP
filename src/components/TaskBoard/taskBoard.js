import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./../../slices/taskSlice";
import TaskCard from "./../TaskCard/taskCard";
import "./taskBoard.css";

const TaskBoard = () => {
  const tasks = useSelector((state) => state.boards[state.activeBoard] || []);
  const statuses = ["Backlog", "In Progress", "In Review", "Completed"];
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="task-board">
      <h2>
        {useSelector((state) => state.activeBoard)} Board
      </h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        {statuses.map((status) => (
          <div key={status} className="status-column">
            <h3 className="status-title">{status}</h3>
            {tasks.map((task, i) =>
              task.status === status ? (
                <TaskCard key={i} task={task} index={i} />
              ) : null
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <input
          className="new-task-input"
          placeholder="New task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button
          className="add-task-button"
          onClick={() => {
            if (taskTitle.trim()) {
              dispatch(addTask(taskTitle));
              setTaskTitle("");
            }
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskBoard;