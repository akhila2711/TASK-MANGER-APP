import React from "react";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";
import { Provider } from "react-redux";
import { store } from "./app/store";

const App = () => (
  <Provider store={store}>
    <div className="flex h-screen">
      <Sidebar />
      <TaskBoard />
    </div>
  </Provider>
);

export default App;