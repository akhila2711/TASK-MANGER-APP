import React from "react";
import Sidebar from "./components/Slidebar/sidebar";
import TaskBoard from "./components/TaskBoard/taskBoard";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css"; // Import your CSS file here

const App = () => (
  <Provider store={store}>
    <div className="app-container">
      <Sidebar />
      <TaskBoard />
    </div>
  </Provider>
);

export default App;