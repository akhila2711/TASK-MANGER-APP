import React from "react";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../features/tasks/tasksSlice";

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-800 text-white p-4 rounded mb-2">
      <p>{task.title}</p>
      <select
        className="mt-2 text-black"
        value={task.status}
        onChange={(e) =>
          dispatch(updateTaskStatus({ index, status: e.target.value }))
        }
      >
        <option>Backlog</option>
        <option>In Progress</option>
        <option>In Review</option>
        <option>Completed</option>
      </select>
    </div>
  );
};

export default TaskCard;