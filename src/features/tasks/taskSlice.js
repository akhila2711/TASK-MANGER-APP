import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  boards: [
    {
      id: nanoid(),
      name: 'Default board',
      icon: '📋',
      columns: {
        backlog: [
          {
            id: nanoid(),
            name: 'Task Manager Project',
            description: 'The Task Manager Project should be done',
            tags: ['Task', 'Project'],
          },
        ],
        inProgress: [],
        inReview: [],
        completed: [],
      },
    },
  ],
  selectedBoardIndex: 0,
  theme: 'light',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { column, task } = action.payload;
      state.boards[state.selectedBoardIndex].columns[column].push({
        ...task,
        id: nanoid(),
      });
    },
    updateTask: (state, action) => {
      const { column, taskId, updatedTask } = action.payload;
      const columnTasks = state.boards[state.selectedBoardIndex].columns[column];
      const index = columnTasks.findIndex(t => t.id === taskId);
      if (index > -1) columnTasks[index] = { ...columnTasks[index], ...updatedTask };
    },
    moveTask: (state, action) => {
      const { sourceColumn, destColumn, taskId } = action.payload;
      const taskList = state.boards[state.selectedBoardIndex].columns;
      const taskIndex = taskList[sourceColumn].findIndex(t => t.id === taskId);
      if (taskIndex > -1) {
        const [task] = taskList[sourceColumn].splice(taskIndex, 1);
        taskList[destColumn].push(task);
      }
    },
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    addBoard: (state) => {
      state.boards.push({
        id: nanoid(),
        name: 'New Board',
        icon: '🗂️',
        columns: {
          backlog: [],
          inProgress: [],
          inReview: [],
          completed: [],
        },
      });
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter((_, idx) => idx !== action.payload);
      if (state.selectedBoardIndex >= state.boards.length) {
        state.selectedBoardIndex = 0;
      }
    },
    setBoardIndex: (state, action) => {
      state.selectedBoardIndex = action.payload;
    },
    editBoardName: (state, action) => {
  const { index, name } = action.payload;
  if (state.boards[index]) {
    state.boards[index].name = name;
  }
},
  },
});

export const {
  addTask,
  updateTask,
  moveTask,
  toggleTheme,
  addBoard,
  deleteBoard,
  setBoardIndex,
  editBoardName
} = taskSlice.actions;

export default taskSlice.reducer;