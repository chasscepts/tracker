import GroupPanel from '../containers/GroupPanel';
import styles from '../assets/css/App.module.css';
import DatePanel from './DatePanel';
import TaskPanel from '../containers/TaskPanel';

function App() {
  return (
    <div className={styles.container}>
      <header>
        <h1>Track.it</h1>
      </header>
      <DatePanel />
      <GroupPanel />
      <TaskPanel />
    </div>
  );
}

export default App;
