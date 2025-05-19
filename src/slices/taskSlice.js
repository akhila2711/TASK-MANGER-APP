import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    boards: {
      Design: [],
      Learning: [],
    },
    activeBoard: "Design",
  },
  reducers: {
    addBoard: (state, action) => {
      state.boards[action.payload] = [];
    },
    setBoard: (state, action) => {
      state.activeBoard = action.payload;
    },
    addTask: (state, action) => {
      state.boards[state.activeBoard].push({
        title: action.payload,
        status: "Backlog",
      });
    },
    updateTaskStatus: (state, action) => {
      const { index, status } = action.payload;
      state.boards[state.activeBoard][index].status = status;
    },
  },
});

export const { addBoard, setBoard, addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;