import { Provider } from 'react-redux';
import { store } from './store';
import TaskBoard from './components/TaskBoard/taskBoard';

const App = () => (
  <Provider store={store}>
  <App />
  <TaskBoard />
  </Provider>
);

export default App;
