import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./../../slices/taskSlice";
import TaskCard from "./../TaskCard/taskCard";

const TaskBoard = () => {
  const tasks = useSelector((state) => state.boards[state.activeBoard] || []);
  const statuses = ["Backlog", "In Progress", "In Review", "Completed"];
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="flex-1 p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">
        {useSelector((state) => state.activeBoard)} Board
      </h2>
      <div className="flex space-x-4">
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
      <div className="mt-4">
        <input
          className="w-full p-2 text-black"
          placeholder="New task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button
          className="bg-green-500 mt-2 p-2 rounded"
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