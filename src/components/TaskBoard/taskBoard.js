import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../slices/taskSlice"
import TaskCard from "../TaskCard/taskCard";

const TaskBoard = () => {
  const tasks = useSelector((state) => state.boards[state.activeBoard] || []);
  const statuses = ["Backlog", "In Progress", "In Review", "Completed"];
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="board">
      <h2 className="board-title">
        {useSelector((state) => state.activeBoard)} Board
      </h2>
      <div className="taskcards flex">
        {statuses.map((status) => (
          <div key={status} className="flex-1">
            <h3 className="text-lg mb-2">{status}</h3>
            {tasks.map((task, i) =>
              task.status === status ? (
                <TaskCard key={i} task={task} index={i} />
              ) : null
            )}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          className="input"
          placeholder="New task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button
          className="btn"
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